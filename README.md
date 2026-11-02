# Bilel Hedhli Barber

A booking website for customers and an admin page for Bilel.

## Run it on your computer

```
npm install
npm start
```

- Booking page: http://localhost:3000
- Admin page: http://localhost:3000/admin (password: `bilel123`)

## Settings (environment variables)

| Variable         | What it does                                  | Default      |
|------------------|-----------------------------------------------|--------------|
| `ADMIN_PASSWORD` | Bilel's admin password. **Change this.**      | `bilel123`   |
| `PORT`           | Port the site runs on                         | `3000`       |
| `DATA_DIR`       | Folder where bookings and settings are saved  | `./data`     |
| `DATABASE_URL`   | Postgres connection string. When set, bookings are saved there instead of `DATA_DIR` | not set |

## Languages

The site and the admin page are in French (default), English and Arabic (right-to-left), with a switch in the header
and footer. The choice is remembered on each device. Add `?lang=en` or `?lang=ar` to a link to open it in that language.
All texts are in `public/i18n.js`.

## What Bilel can do on the admin page

- **Schedule**: see each day's appointments and mark them Done or Delayed (+10/15/30/45 min), set them back to on time, or delete them.
- **Calendar**: see the whole month with the number of bookings per day. Tap a day to close it completely or open it again.
- **Booking hours**: set the time customers can start booking and the time the last appointment must end (for example 3:00 PM to 1:00 AM; times past midnight work), the appointment length, and the days he is closed every week.

## Putting it online (Render, free)

The site runs on Render's free plan. Render's free servers lose their files on every restart,
so bookings are kept in a free Postgres database from Neon.

1. **Database:** sign up at https://neon.tech, create a project (region: Frankfurt), and copy its
   connection string (it starts with `postgresql://`).
2. **GitHub:** push this folder to a GitHub repository.
3. **Render:** sign up at https://render.com with GitHub, choose **New → Blueprint**, and pick the repository.
   Render reads `render.yaml` and asks for two values:
   - `ADMIN_PASSWORD`: Bilel's admin password
   - `DATABASE_URL`: the Neon connection string
4. Press **Apply**. After a few minutes the site is live at `https://bilel-hedhli-barber.onrender.com`
   (or similar; Render shows the address).

The free plan sleeps after 15 minutes without visitors; the first visit after that takes about a minute to load.
The $7/month Starter plan stays awake.

## CI/CD

- **CI** (`.github/workflows/ci.yml`): every push and pull request runs a syntax check and the API tests in
  `test/`, twice: once saving to a file and once saving to a real Postgres database.
- **CD** (`render.yaml`, `autoDeployTrigger: checksPass`): when a push to `main` passes CI, Render deploys it.
  If CI fails, nothing is deployed. Render also checks `/api/health` and keeps the old version running
  if the new one doesn't start.

Run the tests yourself with `npm test`. Set `DATABASE_URL` first to test against Postgres.

## Photos

The booking page uses free Unsplash photos as placeholders (search `images.unsplash.com` in `public/index.html`).
To use Bilel's own photos, put them in `public/img/` (for example `public/img/hero.jpg`) and change each
`src="..."` to `/img/hero.jpg`. If a photo can't load, a red panel with a white label shows in its place.
