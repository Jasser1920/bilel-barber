// Bilel Hedhli Barber — booking server (Node 18+)
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { createStore } = require("./storage");

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bilel123";
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const PUBLIC_DIR = path.join(__dirname, "public");

const SERVICES = {
  haircut: { name: "Haircut", price: 15 },
  beard: { name: "Beard trim", price: 10 },
  combo: { name: "Haircut + Beard", price: 22 },
};

// ---------- storage ----------
const DEFAULT_DB = {
  settings: {
    openTime: "15:00", // first bookable slot
    closeTime: "01:00", // last slot must end by this time (past midnight allowed)
    slotMinutes: 30,
    weeklyOff: [0], // 0 = Sunday ... 6 = Saturday
    closedDates: [], // "YYYY-MM-DD"
  },
  bookings: [],
};

const store = createStore({ databaseUrl: process.env.DATABASE_URL, dataDir: DATA_DIR });
let db = structuredClone(DEFAULT_DB);
async function loadDb() {
  const saved = await store.load();
  if (saved) db = { ...DEFAULT_DB, ...saved, settings: { ...DEFAULT_DB.settings, ...saved.settings } };
}
const saveDb = () => store.save(db);

// ---------- time helpers ----------
const toMin = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
const isTime = (s) => typeof s === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(s);
const weekday = (date) => new Date(date + "T12:00:00Z").getUTCDay();

// Slots for a work day. Minutes are counted from that day's midnight,
// so a closing time past midnight gives values above 1440.
function slotStarts(settings) {
  const open = toMin(settings.openTime);
  let close = toMin(settings.closeTime);
  if (close <= open) close += 1440;
  const out = [];
  for (let t = open; t + settings.slotMinutes <= close; t += settings.slotMinutes) out.push(t);
  return out;
}
function isClosed(date) {
  const s = db.settings;
  return s.closedDates.includes(date) || s.weeklyOff.includes(weekday(date));
}
const activeBookings = (date) => db.bookings.filter((b) => b.date === date);

// ---------- auth ----------
const tokens = new Set();
function isAdmin(req) {
  const h = req.headers.authorization || "";
  return tokens.has(h.replace(/^Bearer /, ""));
}

// ---------- http helpers ----------
function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}
function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 1e5) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(data || "{}"));
      } catch {
        resolve({});
      }
    });
  });
}
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
function serveStatic(req, res, pathname) {
  if (pathname === "/") pathname = "/index.html";
  if (pathname === "/admin") pathname = "/admin.html";
  const file = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (!file.startsWith(PUBLIC_DIR)) return send(res, 403, { error: "Forbidden" });
  fs.readFile(file, (err, buf) => {
    if (err) return send(res, 404, { error: "Not found" });
    res.writeHead(200, { "Content-Type": (MIME[path.extname(file)] || "application/octet-stream") + "; charset=utf-8" });
    res.end(buf);
  });
}

// ---------- routes ----------
async function api(req, res, url) {
  const p = url.pathname;
  const m = req.method;

  if (m === "GET" && p === "/api/health") return send(res, 200, { ok: true });

  // Public
  if (m === "GET" && p === "/api/settings") {
    return send(res, 200, { ...db.settings, services: SERVICES });
  }

  if (m === "GET" && p === "/api/availability") {
    const date = url.searchParams.get("date");
    if (!isDate(date)) return send(res, 400, { error: "Pick a valid date." });
    if (isClosed(date)) return send(res, 200, { date, closed: true, slots: [] });
    const taken = new Set(activeBookings(date).map((b) => b.start));
    const slots = slotStarts(db.settings).map((start) => ({ start, taken: taken.has(start) }));
    return send(res, 200, { date, closed: false, slots });
  }

  if (m === "POST" && p === "/api/bookings") {
    const b = await readBody(req);
    const name = String(b.name || "").trim().slice(0, 60);
    const phone = String(b.phone || "").trim().slice(0, 30);
    const start = Number(b.start);
    if (!isDate(b.date)) return send(res, 400, { error: "Pick a valid date." });
    if (!name || !phone) return send(res, 400, { error: "Please enter your name and phone number." });
    if (!SERVICES[b.service]) return send(res, 400, { error: "Choose a service." });
    if (isClosed(b.date)) return send(res, 409, { error: "The shop is closed that day. Pick another date." });
    if (!slotStarts(db.settings).includes(start)) return send(res, 409, { error: "That time is outside opening hours." });
    if (activeBookings(b.date).some((x) => x.start === start))
      return send(res, 409, { error: "Someone just took that time. Pick another one." });
    const booking = {
      id: crypto.randomUUID(),
      date: b.date,
      start,
      duration: db.settings.slotMinutes,
      name,
      phone,
      service: b.service,
      status: "booked",
      delayMinutes: 0,
      createdAt: new Date().toISOString(),
    };
    db.bookings.push(booking);
    await saveDb();
    return send(res, 201, booking);
  }

  if (m === "POST" && p === "/api/login") {
    const b = await readBody(req);
    const ok =
      typeof b.password === "string" &&
      b.password.length === ADMIN_PASSWORD.length &&
      crypto.timingSafeEqual(Buffer.from(b.password), Buffer.from(ADMIN_PASSWORD));
    if (!ok) return send(res, 401, { error: "Wrong password." });
    const token = crypto.randomBytes(24).toString("hex");
    tokens.add(token);
    return send(res, 200, { token });
  }

  // Admin only below
  if (!p.startsWith("/api/admin/")) return send(res, 404, { error: "Not found" });
  if (!isAdmin(req)) return send(res, 401, { error: "Please log in again." });

  if (m === "GET" && p === "/api/admin/bookings") {
    const from = url.searchParams.get("from") || "0000-00-00";
    const to = url.searchParams.get("to") || "9999-99-99";
    const list = db.bookings
      .filter((b) => b.date >= from && b.date <= to)
      .sort((a, b) => (a.date === b.date ? a.start - b.start : a.date < b.date ? -1 : 1));
    return send(res, 200, list);
  }

  const bm = p.match(/^\/api\/admin\/bookings\/([\w-]+)$/);
  if (bm) {
    const booking = db.bookings.find((b) => b.id === bm[1]);
    if (!booking) return send(res, 404, { error: "Booking not found." });
    if (m === "DELETE") {
      db.bookings = db.bookings.filter((b) => b.id !== booking.id);
      await saveDb();
      return send(res, 200, { ok: true });
    }
    if (m === "PATCH") {
      const b = await readBody(req);
      if (b.status && ["booked", "done", "delayed"].includes(b.status)) booking.status = b.status;
      if (b.delayMinutes !== undefined) booking.delayMinutes = Math.max(0, Math.min(240, Number(b.delayMinutes) || 0));
      if (booking.status !== "delayed") booking.delayMinutes = 0;
      await saveDb();
      return send(res, 200, booking);
    }
  }

  if (m === "PUT" && p === "/api/admin/settings") {
    const b = await readBody(req);
    if (!isTime(b.openTime) || !isTime(b.closeTime)) return send(res, 400, { error: "Times must look like 15:00." });
    const slot = Number(b.slotMinutes);
    if (![15, 20, 30, 45, 60].includes(slot)) return send(res, 400, { error: "Slot length must be 15, 20, 30, 45 or 60 minutes." });
    const weeklyOff = Array.isArray(b.weeklyOff) ? [...new Set(b.weeklyOff.map(Number).filter((d) => d >= 0 && d <= 6))] : [];
    const next = { ...db.settings, openTime: b.openTime, closeTime: b.closeTime, slotMinutes: slot, weeklyOff };
    if (slotStarts(next).length === 0) return send(res, 400, { error: "Those hours leave no time for a single appointment." });
    db.settings = next;
    await saveDb();
    return send(res, 200, db.settings);
  }

  if (m === "POST" && p === "/api/admin/closed") {
    const b = await readBody(req);
    if (!isDate(b.date)) return send(res, 400, { error: "Invalid date." });
    const set = new Set(db.settings.closedDates);
    b.closed ? set.add(b.date) : set.delete(b.date);
    db.settings.closedDates = [...set].sort();
    await saveDb();
    return send(res, 200, db.settings);
  }

  return send(res, 404, { error: "Not found" });
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname.startsWith("/api/")) {
      api(req, res, url).catch((e) => {
        console.error(e);
        send(res, 500, { error: "Something went wrong on the server." });
      });
    } else serveStatic(req, res, url.pathname);
  });

async function start() {
  if (process.env.NODE_ENV === "production" && !process.env.ADMIN_PASSWORD) {
    console.error("ADMIN_PASSWORD must be set in production. Refusing to start with the default password.");
    process.exit(1);
  }
  await loadDb();
  server.listen(PORT, () => {
    console.log(`Bilel Hedhli Barber running on http://localhost:${PORT} (storage: ${store.name})`);
    console.log(`Admin page: http://localhost:${PORT}/admin`);
    if (!process.env.ADMIN_PASSWORD) console.log('Admin password is the default "bilel123" — set ADMIN_PASSWORD to change it.');
  });
}

start().catch((e) => {
  console.error("Could not start:", e.message);
  process.exit(1);
});
