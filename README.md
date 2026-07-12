# AI Resume Screener — Frontend

[![CI](https://github.com/Risheek-Shrestha/ai-resume-screener-fronted/actions/workflows/ci.yml/badge.svg)](https://github.com/Risheek-Shrestha/ai-resume-screener-fronted/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

React + TypeScript frontend for the AI Resume Screener platform. Connects to the [Spring Boot backend](https://github.com/Risheek-Shrestha/ai-resume-screener) to let users manage profiles, apply for jobs, and get AI-driven resume scoring, and lets admins manage jobs, courses, and applications.

**Live app:** [ai-resume-screener-fronted-three.vercel.app](https://ai-resume-screener-fronted-three.vercel.app)
**Backend:** [github.com/Risheek-Shrestha/ai-resume-screener](https://github.com/Risheek-Shrestha/ai-resume-screener)

> The backend API runs on Render's free tier and spins down after inactivity — the first request after idle can take up to 50 seconds to respond.

**Demo login** — no need to sign up, use this read-only-friendly account:
`risheek@12.com` / `risheek12`

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for dev/build tooling
- **React Router v7** for routing
- **Tailwind CSS v4** for styling
- **Axios** for API calls, with automatic access-token refresh on 401 responses
- **Sonner** for toast notifications
- **Lucide React** / **React Icons** for icons

## Features

- **Auth** — login, registration, forgot/reset password flows, with JWT access + refresh token handling
- **Role-based routing** — separate route trees for `USER` and `ADMIN` roles via `RoleRoute`
- **Job board** — browse jobs, view details, apply
- **Resume management** — upload resumes, view AI-generated resume scores and improvement suggestions
- **Profile** — edit profile, manage education history
- **Applications** — track submitted applications (user side); review, shortlist, hire, or reject applicants (admin side)
- **Admin panel** — create/edit jobs and courses, manage applications end to end
- **Job eligibility** — admins can restrict a job to specific courses/semesters when creating or editing it; the job details page shows the restriction to candidates

## Project Structure

```
src/
├── components/
│   ├── common/         # Shared/reusable components (Button, Loader, Input, ...)
│   ├── forms/           # Form components
│   ├── layout/          # MainLayout, AdminLayout, Sidebar, Navbar
│   └── ui/               # Base UI primitives (Card, Badge, Table, Modal, ...)
├── constants/            # App-wide constants
├── context/               # React context providers (AuthContext, ...)
├── hooks/                  # Custom hooks
├── lib/                      # Utility libraries
├── pages/
│   ├── admin/            # Admin dashboard, jobs, courses, applications
│   ├── auth/              # Login, register, forgot/reset password
│   ├── dashboard/      # User dashboard
│   ├── jobs/               # Job listing, details, apply
│   ├── profile/          # Profile, education, applications
│   └── resume/         # Resume upload, list, scoring
├── routes/                 # AppRoutes, RoleRoute (role-based route guards)
├── services/              # API service modules (one per domain)
├── types/                   # TypeScript types/interfaces
└── utils/                   # Helper functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- The [backend API](https://github.com/Risheek-Shrestha/ai-resume-screener) running locally, or point at the live deployment above

### Installation

```bash
git clone https://github.com/Risheek-Shrestha/ai-resume-screener-fronted.git
cd ai-resume-screener-fronted
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and set the backend API base URL:

```bash
cp .env.example .env
```

```dotenv
VITE_API_BASE_URL=http://localhost:8081/api/v1
```

Vite bakes `VITE_*` variables in at build time, so this must be set before running `npm run dev` or `npm run build`.

### Available Scripts

```bash
npm run dev       # Start the Vite dev server with HMR
npm run build     # Type-check and build for production
npm run preview   # Preview the production build locally
npm run lint       # Run ESLint
```

## Deployment

The live app is deployed on Vercel. Key points if you're deploying your own fork:

- Set `VITE_API_BASE_URL` as an environment variable in the Vercel project settings (not just in a local `.env`, since that file isn't committed).
- `vercel.json` includes a SPA fallback rewrite so client-side routes (e.g. `/login`, `/jobs/123`) resolve correctly on direct navigation and page refresh instead of 404ing.
- The backend's CORS configuration must allow your deployed frontend's origin (`APP_FRONTEND_URL` on the backend).

## License

MIT — see [LICENSE](LICENSE).