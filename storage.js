// Where bookings and settings are kept.
// DATABASE_URL set  -> one row in Postgres (works on free hosting that wipes files).
// Otherwise         -> DATA_DIR/db.json on disk.
const fs = require("fs");
const path = require("path");

function fileStore(dataDir) {
  const file = path.join(dataDir, "db.json");
  return {
    name: `file (${file})`,
    async load() {
      try {
        return JSON.parse(fs.readFileSync(file, "utf8"));
      } catch {
        return null;
      }
    },
    async save(data) {
      fs.mkdirSync(dataDir, { recursive: true });
      const tmp = file + ".tmp";
      fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
      fs.renameSync(tmp, file);
    },
  };
}

function postgresStore(url) {
  const { Pool } = require("pg");
  const local = /localhost|127\.0\.0\.1/.test(url);
  const pool = new Pool({ connectionString: url, ssl: local ? false : { rejectUnauthorized: false }, max: 3 });
  let ready;
  const init = () =>
    (ready ??= pool.query("CREATE TABLE IF NOT EXISTS app_state (id INT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT now())"));
  return {
    name: "postgres",
    async load() {
      await init();
      const r = await pool.query("SELECT data FROM app_state WHERE id = 1");
      return r.rows[0]?.data ?? null;
    },
    async save(data) {
      await init();
      await pool.query(
        "INSERT INTO app_state (id, data) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()",
        [JSON.stringify(data)]
      );
    },
  };
}

function createStore({ databaseUrl, dataDir }) {
  const store = databaseUrl ? postgresStore(databaseUrl) : fileStore(dataDir);
  // Run saves one after another so an older write never lands after a newer one.
  let queue = Promise.resolve();
  const save = (data) => {
    const snapshot = JSON.parse(JSON.stringify(data));
    queue = queue.catch(() => {}).then(() => store.save(snapshot));
    return queue;
  };
  return { name: store.name, load: () => store.load(), save };
}

module.exports = { createStore };
