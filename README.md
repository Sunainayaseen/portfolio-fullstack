# Sunaina Yaseen — Portfolio

React (Vite) frontend + Flask backend, with a fully functional Contact form: server + client validation, spam protection (honeypot + rate limiting), owner notification email, auto-confirmation email to the visitor, and submission storage (MySQL with a local JSON fallback).

## Project layout

```
portfolio/                 # frontend (React + Vite) — the real site
  src/
  portfolio-backend/       # Flask API — the real backend
    app.py
    requirements.txt
    .env.example
```

`portfolio-frontend/` is a leftover scaffold and is not used — ignore it.

## Local development

**Backend**
```
cd portfolio-backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
copy .env.example .env       # then fill in real values, see below
python app.py                # runs on http://127.0.0.1:5000
```

**Frontend** (from the `portfolio` root, in a second terminal)
```
npm install
npm run dev                  # runs on http://localhost:5173, proxies /api to Flask
```

## Environment variables

### Backend (`portfolio-backend/.env`)

| Variable | Required | Notes |
|---|---|---|
| `SMTP_HOST`, `SMTP_PORT` | for email | e.g. `smtp.gmail.com`, `587` |
| `SMTP_USER`, `SMTP_PASSWORD` | for email | Gmail: a 16-char **App Password**, not your login password |
| `OWNER_EMAIL` | for email | where contact-form messages are sent |
| `ALLOWED_ORIGINS` | recommended | comma-separated list of allowed frontend origins (CORS) |
| `CONTACT_RATE_LIMIT` | optional | default `5 per hour` per IP |
| `MYSQL_HOST/USER/PASSWORD/DB` | optional | if unset or unreachable, submissions are saved to `data/contacts.json` instead |

If SMTP isn't configured, the form still works and submissions are still stored — emails are just skipped (a warning is logged).

### Frontend (`.env` at repo root)

| Variable | Notes |
|---|---|
| `VITE_API_URL` | live backend URL, e.g. `https://your-backend.onrender.com`. Leave unset in local dev (Vite proxies `/api` to Flask). |

## Updating your email credentials later

1. Generate a new Gmail App Password: Google Account → Security → 2-Step Verification → App Passwords.
2. Update `SMTP_PASSWORD` (and `SMTP_USER`/`OWNER_EMAIL` if the address changed):
   - **Local:** edit `portfolio-backend/.env`.
   - **Render:** Dashboard → your backend service → Environment → edit the variable → Save (this redeploys automatically).
3. Never commit `.env` — it's gitignored. Rotate the App Password immediately if it's ever exposed.

## Deployment

- **Backend → Render**: connect this repo, root directory `portfolio-backend`, uses `render.yaml`/`Procfile` (`gunicorn app:app`). Set the env vars above in the Render dashboard.
- **Frontend → Vercel**: connect this repo, root directory `portfolio` (repo root), build command `npm run build`, output `dist` (see `vercel.json`). Set `VITE_API_URL` to your live Render backend URL in Vercel's Environment Variables.
- After both are live, update `ALLOWED_ORIGINS` on the backend to include your Vercel domain, and redeploy.
