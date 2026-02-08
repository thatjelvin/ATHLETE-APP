# MVP Acceptance Criteria & Backlog

## MVP Acceptance Criteria

### Must Have (MVP)
- [x] Onboarding collects profile and generates personalized week
- [x] User can start session with step-by-step single-exercise flow
- [x] Sessions work offline and sync when online
- [x] Progression engine adjusts load based on perceived difficulty
- [x] Media demos play with graceful fallback
- [x] No calories or weight metrics shown anywhere
- [x] Privacy opt-in for media uploads
- [x] Bottom nav: Train, Programs, Progress, Profile
- [x] 3+ programs available at launch

### MVP Definition of Done
1. All QA checklist items pass
2. Accessibility checklist complete
3. Performance: <2s cold start, <16ms frame time
4. Crash rate <0.1%
5. Offline mode tested on airplane mode
6. iOS 15+ and Android 10+ supported

---

## Prioritized Backlog

### Phase 1: Post-MVP (Est: 4-6 weeks)
| Feature | Priority | Estimate | Notes |
|---------|----------|----------|-------|
| Push notifications for workouts | P1 | 1 week | Reminder scheduling |
| Apple Health / Google Fit sync | P1 | 2 weeks | Read/write workout data |
| Dark/light theme toggle | P2 | 3 days | Already dark-first |
| Program search & filters | P2 | 1 week | By goal, level, duration |
| Session calendar view | P2 | 1 week | Month view with sessions |

### Phase 2: Premium Features (Est: 6-8 weeks)
| Feature | Priority | Estimate | Notes |
|---------|----------|----------|-------|
| Video upload for technique | P1 | 3 weeks | S3, encryption, playback |
| Advanced analytics dashboard | P1 | 2 weeks | Trends, volume tracking |
| Cloud backup & restore | P2 | 1 week | Full profile export |
| Session log export (CSV/PDF) | P2 | 1 week | Date range selection |
| Subscription paywall | P1 | 2 weeks | IAP integration |

### Phase 3: Growth Features (Est: 8+ weeks)
| Feature | Priority | Estimate | Notes |
|---------|----------|----------|-------|
| Coach program marketplace | P1 | 6 weeks | Upload, moderation, purchase |
| Jump height estimation (video) | P2 | 4 weeks | ML model integration |
| Wearable integration | P3 | 4 weeks | HR zones, recovery |
| Social sharing (optional) | P3 | 2 weeks | Milestone badges |
| Calendar sync (iCal) | P3 | 1 week | Export scheduled sessions |
| Localization (5 languages) | P2 | 3 weeks | i18n infrastructure |

### Phase 4: Advanced (Future)
| Feature | Priority | Estimate | Notes |
|---------|----------|----------|-------|
| AI form feedback | P3 | 8 weeks | Pose estimation |
| Custom program builder | P2 | 4 weeks | Drag-drop exercises |
| Team/coach accounts | P3 | 6 weeks | Multi-athlete management |
| Periodization templates | P3 | 3 weeks | Mesocycle planning |

---

## Technical Debt & Improvements
| Item | Priority | Estimate |
|------|----------|----------|
| E2E test suite (Detox) | P1 | 2 weeks |
| Performance profiling | P2 | 1 week |
| Error boundary improvements | P2 | 3 days |
| Analytics instrumentation | P2 | 1 week |
| CI/CD pipeline optimization | P3 | 1 week |

---

## Release Milestones

| Version | Target | Key Features |
|---------|--------|--------------|
| 1.0 | MVP | Core training, 3 programs, offline |
| 1.1 | +4 weeks | Notifications, health kit |
| 1.2 | +8 weeks | Premium tier, video upload |
| 2.0 | +16 weeks | Marketplace, AI features |
