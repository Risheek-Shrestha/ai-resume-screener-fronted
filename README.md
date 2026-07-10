# AI Resume Screener — Frontend

React + TypeScript frontend for the AI Resume Screener platform. Connects to the [Spring Boot backend](https://github.com/Risheek-Shrestha/ai-resume-screener) to let users manage profiles, apply for jobs, and get AI-driven resume scoring, and lets admins manage jobs, courses, and applications.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for dev/build tooling
- **React Router v7** for routing
- **Tailwind CSS v4** for styling
- **Axios** for API calls
- **Sonner** for toast notifications
- **Lucide React** / **React Icons** for icons

## Project Structure

```
src/
├── components/
│   ├── common/       # Shared/reusable components
│   ├── forms/         # Form components
│   ├── layout/        # MainLayout, AdminLayout, etc.
│   └── ui/             # Base UI primitives
├── constants/          # App-wide constants
├── context/             # React context providers
├── hooks/                # Custom hooks
├── lib/                    # Utility libraries
├── pages/
│   ├── admin/          # Admin dashboard, jobs, courses, applications
│   ├── auth/            # Login, register, forgot/reset password
│   ├── dashboard/    # User dashboard
│   ├── jobs/             # Job listing, details, apply
│   ├── profile/        # Profile, education, applications
│   └── resume/       # Resume upload, list, scoring
├── routes/               # AppRoutes, RoleRoute (role-based route guards)
├── services/            # API service modules (one per domain)
├── types/                 # TypeScript types/interfaces
└── utils/                 # Helper functions
```

## Features

- **Auth** — login, registration, forgot/reset password flows
- **Role-based routing** — separate route trees for `USER` and `ADMIN` roles via `RoleRoute`
- **Job board** — browse jobs, view details, apply
- **Resume management** — upload resumes, view AI-generated resume scores
- **Profile** — edit profile, manage education history
- **Applications** — track submitted applications (user side); review/accept applications (admin side)
- **Admin panel** — create/edit jobs and courses, manage applications

## Getting Started

### Prerequisites

- Node.js 18+
- The [backend API](https://github.com/Risheek-Shrestha/ai-resume-screener) running (see that repo for setup)

### Installation

```bash
git clone https://github.com/Risheek-Shrestha/ai-resume-screener-fronted.git
cd ai-resume-screener-fronted
npm install
```

### Environment Setup

Configure the backend API base URL used by `src/services/api.ts` (e.g. via a `.env` file with a `VITE_API_BASE_URL` variable, depending on your setup).

### Available Scripts

```bash
npm run dev       # Start the Vite dev server with HMR
npm run build      # Type-check and build for production
npm run preview   # Preview the production build locally
npm run lint         # Run ESLint
```

## License

This project currently has no license specified.