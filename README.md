# Employee Directory

A live, full-stack employee directory web app with search and pagination.

**🌐 Live demo:** https://employee-directory-lovat.vercel.app

> Built as a learning project. Uses fake seed data (no database) — a practice simplification, not company production.

## Features

- 📋 Employee table — Name, Department, Monthly Rate, Contact Number
- 💰 Monthly Rate formatted with `fmtMoney` (e.g. `₱85,000.00`)
- ✅ Contact Number validated with `validateMobile` (shown as a valid/invalid badge)
- 🔍 Search by name (case-insensitive)
- 📄 Pagination (`page` / `page_size`)
- ⚠️ Friendly error message if the API call fails

## Tech stack

- **Next.js** (App Router) + **TypeScript** — frontend and API in one app
- **Vitest** — tests
- **Vercel** — hosting + CI/CD

## Project structure

```
app/
  page.tsx                  # the table UI (search, paging, formatting, validation)
  api/employees/route.ts    # GET /api/employees — the API endpoint
lib/
  employees.ts              # seed data + getEmployees() (testable logic)
  employees.test.ts         # tests for getEmployees()
  format.ts                 # fmtMoney / fmtNumber / fmtCurrency (reused utilities)
  validate.ts               # validateMobile / validateTIN (reused utilities)
```

The API lives *inside* the Next.js app, so the frontend calls it at a relative path (`/api/employees`) — no separate backend or API-URL config needed.

## Getting started

```bash
npm install       # install dependencies (one-time)
npm run dev       # start the dev server → http://localhost:3000
```

## Tests

```bash
npm test          # run the Vitest suite
```

## Build

```bash
npm run build     # production build (the same build Vercel runs)
```

## Deployment

Hosted on **Vercel** and connected to this GitHub repo:

- Every push to `main` **auto-deploys** to the live URL.
- Each pull request gets its own **preview deployment** (a temporary URL).

To make a change: create a branch → edit → `npm test` → open a PR → merge. It deploys automatically.

## API

`GET /api/employees`

| Query param | Default | Description |
|-------------|---------|-------------|
| `page`      | `1`     | which page to return |
| `page_size` | `5`     | items per page |
| `search`    | `""`    | filter by name (case-insensitive) |

Returns `{ items, total, page, page_size, total_pages }`.
