# scenario-lab-demo

React SPA front-end for Scenario Lab. Lets users configure, run, and visualize hiring simulations.

## Tech Stack

- **React 19** · TypeScript · Vite
- **Ant Design 6** (UI components) · **React Router 7**
- **i18next** (internationalization)
- **Biome** (lint & format) · **Vitest** (unit + integration tests)

## Quick Start

```bash
npm install

# Dev server (proxies /api → localhost:8000)
npm run dev

# Production build
npm run build
npm run preview
```

## Scripts

| Script                       | Description                     |
| ---------------------------- | ------------------------------- |
| `npm run dev`                | Vite dev server with HMR        |
| `npm run build`              | TypeScript compile + Vite build |
| `npm run lint`               | Biome lint                      |
| `npm run format`             | Biome format (write)            |
| `npm run test`               | Run unit + integration tests    |
| `npm run test:unit`          | Unit tests only                 |
| `npm run test:integration`   | Integration tests only          |
| `npm run generate:api:types` | Generate TS types from OpenAPI  |

## Pages

| Route          | Page             |
| -------------- | ---------------- |
| `/`            | Landing page     |
| `/customize/*` | Simulation setup |
| `/simulate`    | Loading / run    |
| `/results`     | Results view     |

## CI/CD (GitHub Actions)

The [CI workflow](.github/workflows/ci.yml) runs on every push / PR to `main`:

1. **check** – format check → lint → unit tests → integration tests
2. **build-deploy** (main only) – builds, packages `dist/` as a tarball, creates a GitHub Release, then triggers deployment via `scenario-lab-infra`

### Required Secrets

| Secret                 | Purpose                                                         |
| ---------------------- | --------------------------------------------------------------- |
| `GITHUB_TOKEN`         | Auto-provided – used to create releases                         |
| `INFRA_DISPATCH_TOKEN` | PAT with `repo` scope on `scenario-lab-infra` to trigger deploy |
