# Contributing

Thanks for your interest in this project. It started as a solo build, but contributions, bug reports, and suggestions are welcome.

## Getting started

1. Fork the repo and clone your fork.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your local backend URL.
4. Start the dev server: `npm run dev`

## Making changes

- Create a feature branch off `main`: `git checkout -b feat/short-description`.
- Keep commits focused — one logical change per commit.
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages, e.g.:
  ```
  feat(profile): wire education section to backend
  fix(auth): skip refresh retry on login endpoint
  ```
- Run lint and confirm a clean type-checked build before opening a PR:
  ```
  npm run lint
  npm run build
  ```

## Pull requests

- Describe what changed and why.
- Link any related issue.
- Keep PRs scoped to a single feature or fix where possible — smaller PRs are easier to review.

## Reporting bugs

Open an issue with:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if it's a UI issue

## Code style

- TypeScript strict mode is enabled — avoid `any` where a real type is available.
- Components follow the existing folder structure (`components/ui`, `components/layout`, `pages/...`).
- Prefer the shared UI components (`Card`, `Badge`, `Modal`, etc.) over ad hoc markup.
- Tailwind utility classes only — no separate CSS files unless unavoidable.
