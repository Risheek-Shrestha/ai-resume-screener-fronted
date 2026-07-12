# Changelog

All notable changes to this project are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- SPA fallback rewrite (`vercel.json`) so direct navigation to client-side routes works on Vercel.
- Course/semester eligibility picker on admin Create/Edit Job forms, and an eligibility notice on the job details page.

### Fixed
- Sidebar nav item typing (`exclusive` field) causing a TypeScript build failure.
- `MyApplications` page field mismatches against the `ApplicationResponse` type (`id` → `applicationId`, `applicationTime` → `appliedAt`).
- Auth interceptor no longer attempts a token refresh on failed `/auth/login`, `/auth/refresh`, or `/auth/register` calls — real error messages now surface correctly.

## [0.2.0] — Full frontend build

### Added
- Complete page set: auth (login/register/forgot/reset password), job browsing and details, application flow, profile, admin job/application management.
- Reusable component library: `Card`, `Badge`, `EmptyState`, `Pagination`, `ConfirmDialog`, `Dropzone`, `Modal`, `ScoreGauge`, `Table`, `Sidebar`, `AdminLayout`.
- Dark slate/cyan Tailwind v4 design system with Space Grotesk + Inter typography.
- Auth infrastructure: `AuthContext`/`AuthProvider`, axios interceptor with refresh-token rotation, protected and role-gated routes.

## [0.1.0] — Initial scaffold

### Added
- Vite + React + TypeScript project scaffold.
- Tailwind CSS v4 setup.
- Base routing and layout structure.