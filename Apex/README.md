# Apex Athletic Training App

Production-ready specifications for a cross-platform mobile app focused on athletic performance training.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL 14+

### Local Development

```bash
# Clone and install
cd app
npm install

# Start Expo dev server
npm run dev

# Run on iOS/Android
npm run ios
npm run android
```

### Backend Setup

```bash
cd server
npm install

# Setup database
createdb apex_dev
npm run migrate
npm run seed

# Start server
npm run dev
```

### Seed Sample Programs

```bash
cd server
npm run seed:programs
# Imports exercises.json, workouts.json, programs.json from seed-data/
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/architecture.md) | Tech stack, folder layout, API surface |
| [Screen Flows](docs/screen-flows.md) | Wireframes for all screens |
| [UI Components](docs/ui-components.md) | Component library spec |
| [Data Models](docs/data-models.md) | JSON schemas |
| [Progression Engine](docs/progression-engine.md) | Training load algorithms |
| [Weekly Planner](docs/weekly-planner.md) | Schedule generation |
| [Workout Engine](docs/workout-engine.md) | Session execution logic |
| [Media Spec](docs/media-spec.md) | Animation requirements |
| [Offline/Sync](docs/offline-sync.md) | Local DB & sync strategy |
| [Security](docs/security-privacy.md) | Privacy & data handling |
| [UI Copy](docs/ui-copy.md) | Microcopy stubs |
| [QA Checklist](docs/qa-checklist.md) | Testing & accessibility |
| [Backlog](docs/backlog.md) | MVP criteria & roadmap |

## Programs

- [Speed Foundations](programs/speed-foundations.md) - 6 weeks
- [Vertical Jump Builder](programs/vertical-jump-builder.md) - 8 weeks
- [Explosive Athlete](programs/explosive-athlete.md) - 4 weeks

## Seed Data

- `seed-data/exercises.json` - 12 exercises
- `seed-data/workouts.json` - 5 sample workouts
- `seed-data/programs.json` - 3 programs

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run test suite |
| `npm run lint` | Lint code |
| `npm run migrate` | Run DB migrations |
| `npm run seed` | Seed sample data |

---

## Tech Stack

- **Mobile**: React Native + Expo
- **State**: Zustand + React Query
- **Local DB**: SQLite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Auth**: JWT + OAuth 2.0

---

## Contributing

1. Create feature branch from `main`
2. Follow existing code patterns
3. Add tests for new features
4. Update documentation
5. Submit PR for review
