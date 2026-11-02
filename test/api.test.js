// End-to-end API tests: start the real server and talk to it over HTTP.
// Uses Postgres when DATABASE_URL is set, otherwise a temporary data folder.
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const PORT = 4000 + Math.floor(Math.random() * 2000);
const BASE = `http://127.0.0.1:${PORT}`;
const PASSWORD = "test-password";
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "bilel-test-"));
let server;

async function startServer() {
  server = spawn(process.execPath, [path.join(__dirname, "..", "server.js")], {
    env: { ...process.env, PORT: String(PORT), DATA_DIR: dataDir, ADMIN_PASSWORD: PASSWORD, NODE_ENV: "test" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let log = "";
  server.stdout.on("data", (d) => (log += d));
  server.stderr.on("data", (d) => (log += d));
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(BASE + "/api/health")).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("Server did not start:\n" + log);
}
async function stopServer() {
  if (!server) return;
  const exited = new Promise((r) => server.once("exit", r));
  server.kill();
  await exited;
  server = null;
}

const json = async (method, url, body, token) => {
  const res = await fetch(BASE + url, {
    method,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json().catch(() => null) };
};
const login = async () => (await json("POST", "/api/login", { password: PASSWORD })).body.token;

// A date that is open by default (not Sunday), far enough ahead to never be "today".
function futureDate(weekday, weeksAhead = 3) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + weeksAhead * 7 + ((weekday - d.getUTCDay() + 7) % 7));
  return d.toISOString().slice(0, 10);
}
const MONDAY = futureDate(1);
const TUESDAY = futureDate(2);
const SUNDAY = futureDate(0);

before(async () => {
  await startServer();
  // Start each run from the default settings and no bookings.
  const token = await login();
  const all = await json("GET", "/api/admin/bookings", null, token);
  for (const b of all.body) await json("DELETE", `/api/admin/bookings/${b.id}`, null, token);
  await json("PUT", "/api/admin/settings", { openTime: "15:00", closeTime: "01:00", slotMinutes: 30, weeklyOff: [0] }, token);
  for (const d of (await json("GET", "/api/settings")).body.closedDates)
    await json("POST", "/api/admin/closed", { date: d, closed: false }, token);
});
after(async () => {
  await stopServer();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("serves the booking page and the admin page", async () => {
  const home = await fetch(BASE + "/");
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Bilel/);
  assert.equal((await fetch(BASE + "/admin")).status, 200);
  assert.equal((await fetch(BASE + "/../server.js")).status, 404);
});

test("opening hours past midnight give 20 half-hour slots", async () => {
  const r = await json("GET", `/api/availability?date=${MONDAY}`);
  assert.equal(r.status, 200);
  assert.equal(r.body.closed, false);
  assert.equal(r.body.slots.length, 20);
  assert.equal(r.body.slots[0].start, 15 * 60);
  assert.equal(r.body.slots.at(-1).start, 24 * 60 + 30); // 12:30 AM
});

test("weekly day off is closed", async () => {
  const r = await json("GET", `/api/availability?date=${SUNDAY}`);
  assert.equal(r.body.closed, true);
  const b = await json("POST", "/api/bookings", { date: SUNDAY, start: 900, name: "A", phone: "1", service: "haircut" });
  assert.equal(b.status, 409);
});

test("a customer can book, and the same time cannot be booked twice", async () => {
  const ok = await json("POST", "/api/bookings", { date: MONDAY, start: 960, name: "Omar", phone: "55 000 000", service: "combo" });
  assert.equal(ok.status, 201);
  assert.equal(ok.body.status, "booked");
  const again = await json("POST", "/api/bookings", { date: MONDAY, start: 960, name: "Yusuf", phone: "1", service: "haircut" });
  assert.equal(again.status, 409);
  const slot = (await json("GET", `/api/availability?date=${MONDAY}`)).body.slots.find((s) => s.start === 960);
  assert.equal(slot.taken, true);
});

test("a customer can book without choosing a service", async () => {
  const r = await json("POST", "/api/bookings", { date: MONDAY, start: 1140, name: "Sami", phone: "3" });
  assert.equal(r.status, 201);
  assert.equal(r.body.service, null);
});

test("errors carry a code for translation", async () => {
  const r = await json("POST", "/api/bookings", { date: MONDAY, start: 960, name: "X", phone: "1" });
  assert.equal(r.body.code, "taken");
  assert.equal((await json("POST", "/api/login", { password: "nope" })).body.code, "wrong_password");
});

test("bad bookings are rejected", async () => {
  assert.equal((await json("POST", "/api/bookings", { date: MONDAY, start: 1020, name: "", phone: "1", service: "haircut" })).status, 400);
  assert.equal((await json("POST", "/api/bookings", { date: MONDAY, start: 1020, name: "A", phone: "1", service: "nope" })).status, 400);
  assert.equal((await json("POST", "/api/bookings", { date: MONDAY, start: 905, name: "A", phone: "1", service: "haircut" })).status, 409);
  assert.equal((await json("POST", "/api/bookings", { date: "tomorrow", start: 900, name: "A", phone: "1", service: "haircut" })).status, 400);
});

test("admin pages need the right password", async () => {
  assert.equal((await json("GET", "/api/admin/bookings")).status, 401);
  assert.equal((await json("GET", "/api/admin/bookings", null, "made-up-token")).status, 401);
  assert.equal((await json("POST", "/api/login", { password: "wrong" })).status, 401);
  assert.ok(await login());
});

test("admin marks done, delayed, back on time, and deletes", async () => {
  const token = await login();
  const b = (await json("POST", "/api/bookings", { date: TUESDAY, start: 1080, name: "Karim", phone: "2", service: "beard" })).body;
  let r = await json("PATCH", `/api/admin/bookings/${b.id}`, { status: "delayed", delayMinutes: 15 }, token);
  assert.equal(r.body.status, "delayed");
  assert.equal(r.body.delayMinutes, 15);
  r = await json("PATCH", `/api/admin/bookings/${b.id}`, { status: "booked" }, token);
  assert.equal(r.body.delayMinutes, 0);
  r = await json("PATCH", `/api/admin/bookings/${b.id}`, { status: "done" }, token);
  assert.equal(r.body.status, "done");
  assert.equal((await json("DELETE", `/api/admin/bookings/${b.id}`, null, token)).status, 200);
  const list = await json("GET", `/api/admin/bookings?from=${TUESDAY}&to=${TUESDAY}`, null, token);
  assert.equal(list.body.length, 0);
});

test("admin closes and reopens a whole day", async () => {
  const token = await login();
  await json("POST", "/api/admin/closed", { date: TUESDAY, closed: true }, token);
  assert.equal((await json("GET", `/api/availability?date=${TUESDAY}`)).body.closed, true);
  await json("POST", "/api/admin/closed", { date: TUESDAY, closed: false }, token);
  assert.equal((await json("GET", `/api/availability?date=${TUESDAY}`)).body.closed, false);
});

test("admin changes booking hours; impossible hours are refused and change nothing", async () => {
  const token = await login();
  let r = await json("PUT", "/api/admin/settings", { openTime: "10:00", closeTime: "12:00", slotMinutes: 60, weeklyOff: [0, 1] }, token);
  assert.equal(r.status, 200);
  assert.equal((await json("GET", `/api/availability?date=${TUESDAY}`)).body.slots.length, 2);
  r = await json("PUT", "/api/admin/settings", { openTime: "10:00", closeTime: "10:30", slotMinutes: 60, weeklyOff: [] }, token);
  assert.equal(r.status, 400);
  const s = (await json("GET", "/api/settings")).body;
  assert.equal(s.openTime, "10:00");
  assert.equal(s.closeTime, "12:00");
  await json("PUT", "/api/admin/settings", { openTime: "15:00", closeTime: "01:00", slotMinutes: 30, weeklyOff: [0] }, token);
});

test("bookings survive a server restart", async () => {
  await stopServer();
  await startServer();
  const token = await login();
  const list = await json("GET", `/api/admin/bookings?from=${MONDAY}&to=${MONDAY}`, null, token);
  assert.ok(list.body.some((b) => b.name === "Omar" && b.start === 960));
});
