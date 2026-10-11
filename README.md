# R.P. Hall of Residence website

Website for Rajendra Prasad Hall of Residence, IIT Kharagpur. Built with React 19, Vite and React Router.

Requirements and progress are tracked in [docs/CHANGES.md](docs/CHANGES.md).

## Run

```bash
npm install
npm run dev      # http://localhost:5173, test accounts enabled
npm run build    # production build in dist/, test accounts excluded
npm run lint
```

## Test accounts

Login is local for now: there is no backend yet. The four test accounts live in
`src/auth/testAccounts.js` and are only bundled when `VITE_ENABLE_TEST_ACCOUNTS=true`.

- `npm run dev` reads `.env.development`, which turns the flag on.
- `npm run build` runs in production mode, so the accounts are replaced by an empty list
  (`src/auth/noAccounts.js`) and the passwords never reach `dist/`.
- To build a staging copy with the accounts: `VITE_ENABLE_TEST_ACCOUNTS=true npm run build`.
  Do not deploy that build publicly.

| Role         | Email                  | Password | Lands on       |
|--------------|------------------------|----------|----------------|
| student      | test.student@test.com  | 12345678 | Home           |
| alumni       | test.alumini@test.com  | 12345678 | Funding        |
| hall_council | test.hc@test.com       | 12345678 | Complaints     |
| warden       | test.warden@test.com   | 12345678 | Complaints     |

## Roles and access

Everything about roles is in `src/auth/roles.js`: the role values, the permissions map, the
navbar items and each role's landing page. Components and route guards call `can(user, permission)`;
nothing else checks a role directly. `RequireAccess` sends logged-out visitors to the login page and
shows a "No access" page to logged-in users without permission.

| Feature                                   | student | hall_council | alumni | warden |
|-------------------------------------------|:-------:|:------------:|:------:|:------:|
| Home, Hall Council, Our Legacy, Gallery, Innovation | yes | yes | yes | yes |
| Notice Board and Hall Events on Home      | yes     |              |        |        |
| New Complaint                             | yes     | yes          |        |        |
| Post a project (Innovation)               | yes     | yes          |        |        |
| Complaints dashboard                      |         | yes          |        | yes    |
| Funding (donate, offer support, leaderboard) |      |              | yes    |        |
| Recruitment (post openings)               |         |              | yes    |        |
| Funding Requests                          |         | yes          |        | yes    |

## Data

- `src/data/*.js`: page content. Entries marked `TODO` are waiting on content from the hall;
  entries with `sample: true` are copied from the PDF mockups and show a "Sample" tag.
- `src/lib/store.js`: complaints, posted projects, recruitment posts and alumni pledges are kept
  in the browser's localStorage. Replace these functions with API calls when a backend exists.

## Images

`public/images/` holds sample photos from Wikimedia Commons, used under their licences.
Authors, licences and source links are in `public/images/credits.json`. Only `rp-hall.jpg`
shows R.P. Hall; replace the rest with the hall's own photos. The logo in
`src/components/Logo.jsx` is traced from the PDF and should be replaced with the official vector.
