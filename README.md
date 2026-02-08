# ATHLETE-APP

A comprehensive athletic performance training platform designed to help athletes improve speed, explosiveness, and vertical jump through scientifically-backed training programs.

## 🏃‍♂️ Overview

This repository contains production-ready specifications and documentation for **Apex Athletic Training App** - a cross-platform mobile application focused on athletic performance training. The app provides structured training programs with progressive overload, workout tracking, and performance analytics.

## ✨ Features

- **3 Structured Programs**:
  - **Speed Foundations** (6 weeks) - Master acceleration mechanics and sprint fundamentals
  - **Vertical Jump Builder** (8 weeks) - Build explosive power and maximize vertical leap
  - **Explosive Athlete** (4 weeks) - Develop total-body explosiveness

- **Smart Training Engine**:
  - Automated progression algorithms based on training load and performance
  - Weekly planner with adaptive scheduling
  - Real-time workout execution and tracking

- **Performance Tracking**:
  - Progress analytics and visualization
  - Session history and perceived difficulty ratings
  - Goal setting and achievement monitoring

- **Offline-First Design**:
  - Local SQLite database for workout data
  - Automatic sync when connected
  - Train anywhere, anytime

## 📁 Repository Structure

```
ATHLETE-APP/
├── Apex/                          # Main application specifications
│   ├── docs/                      # Comprehensive documentation
│   │   ├── architecture.md        # Tech stack and system design
│   │   ├── data-models.md         # JSON schemas
│   │   ├── progression-engine.md  # Training load algorithms
│   │   ├── workout-engine.md      # Session execution logic
│   │   ├── screen-flows.md        # UI wireframes
│   │   └── ...                    # Additional documentation
│   ├── programs/                  # Training program details
│   │   ├── speed-foundations.md
│   │   ├── vertical-jump-builder.md
│   │   └── explosive-athlete.md
│   ├── seed-data/                 # Sample data for development
│   │   ├── exercises.json         # 12 core exercises
│   │   ├── workouts.json          # 5 sample workouts
│   │   └── programs.json          # 3 complete programs
│   └── README.md                  # Detailed development guide
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL 14+

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/thatjelvin/ATHLETE-APP.git
cd ATHLETE-APP/Apex

# Frontend Setup
cd app
npm install
npm run dev

# Backend Setup (in another terminal)
cd server
npm install
createdb apex_dev
npm run migrate
npm run seed
npm run dev
```

For detailed setup instructions, see the [Apex README](./Apex/README.md).

## 🏋️ Training Programs

### Speed Foundations
- **Duration**: 6 weeks
- **Frequency**: 3 sessions/week
- **Level**: Beginner
- **Focus**: Acceleration mechanics, sprint technique
- [View Full Program →](./Apex/programs/speed-foundations.md)

### Vertical Jump Builder
- **Duration**: 8 weeks
- **Frequency**: 3-4 sessions/week
- **Level**: Intermediate
- **Focus**: Explosive power, jump mechanics
- [View Full Program →](./Apex/programs/vertical-jump-builder.md)

### Explosive Athlete
- **Duration**: 4 weeks
- **Frequency**: 4 sessions/week
- **Level**: Advanced
- **Focus**: Total-body explosiveness, athletic power
- [View Full Program →](./Apex/programs/explosive-athlete.md)

## 🛠️ Tech Stack

- **Frontend**: React Native + Expo
- **State Management**: Zustand + React Query
- **Local Storage**: SQLite (expo-sqlite)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication**: JWT + OAuth 2.0 (Google/Apple)
- **Media**: Cloudflare CDN for video delivery

## 📖 Documentation

Complete documentation is available in the [Apex/docs](./Apex/docs) directory:

- [Architecture](./Apex/docs/architecture.md) - System design and tech stack
- [Screen Flows](./Apex/docs/screen-flows.md) - UI/UX wireframes
- [Data Models](./Apex/docs/data-models.md) - Database schemas
- [Progression Engine](./Apex/docs/progression-engine.md) - Training algorithms
- [Weekly Planner](./Apex/docs/weekly-planner.md) - Schedule generation
- [Workout Engine](./Apex/docs/workout-engine.md) - Session execution
- [Offline/Sync](./Apex/docs/offline-sync.md) - Local database strategy
- [Security](./Apex/docs/security-privacy.md) - Privacy and data handling
- [QA Checklist](./Apex/docs/qa-checklist.md) - Testing requirements

## 🤝 Contributing

1. Create a feature branch from `main`
2. Follow existing code patterns and conventions
3. Add tests for new features
4. Update documentation as needed
5. Submit a pull request for review

## 📄 License

This project is currently private. All rights reserved.

## 👤 Author

**thatjelvin**

---

**Note**: This repository contains specifications and documentation for the Apex Athletic Training App. For implementation details and development setup, refer to the [Apex README](./Apex/README.md).
