# Screen Flows & Wireframes

## Navigation Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Status Bar                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   Screen Content                        │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [Train]    [Programs]    [Progress]    [Profile]       │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Onboarding Flow (Home Workout Style)

Single question per screen, large CTAs, progress indicator at top.

### Screen 1.1: Welcome
```
┌─────────────────────────────────────────┐
│           ○ ○ ○ ○ ○ ○ ○                │
│                                         │
│         [App Logo/Icon]                 │
│                                         │
│      "Train Like an Athlete"            │
│                                         │
│   Your pocket coach for speed,          │
│   power, and explosive performance      │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │        GET STARTED              │   │
│   └─────────────────────────────────┘   │
│                                         │
│         Already have account?           │
└─────────────────────────────────────────┘
```

### Screen 1.2: Primary Goals (Multi-Select)
```
┌─────────────────────────────────────────┐
│           ● ○ ○ ○ ○ ○ ○                │
│                                         │
│      What do you want to train?         │
│      Select all that apply              │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  ⚡ Speed                   [ ]  │   │
│   └─────────────────────────────────┘   │
│   ┌─────────────────────────────────┐   │
│   │  🚀 Vertical Jump           [✓]  │   │
│   └─────────────────────────────────┘   │
│   ┌─────────────────────────────────┐   │
│   │  💥 Explosiveness           [✓]  │   │
│   └─────────────────────────────────┘   │
│   ┌─────────────────────────────────┐   │
│   │  🔄 Agility                 [ ]  │   │
│   └─────────────────────────────────┘   │
│   ┌─────────────────────────────────┐   │
│   │  🏋️ Athletic Base           [ ]  │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │           CONTINUE              │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Screen 1.3: Sport (Optional)
```
┌─────────────────────────────────────────┐
│           ● ● ○ ○ ○ ○ ○                │
│                                         │
│      What's your sport?                 │
│      (Optional)                         │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  Basketball                  ▼  │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ○ Not listed (enter below)            │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │           CONTINUE              │   │
│   └─────────────────────────────────┘   │
│                                         │
│             Skip for now                │
└─────────────────────────────────────────┘
```

### Screen 1.4: Experience Level
```
┌─────────────────────────────────────────┐
│           ● ● ● ○ ○ ○ ○                │
│                                         │
│      Your training experience?          │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  🌱 BEGINNER                    │   │
│   │  New to structured training     │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  💪 INTERMEDIATE                │   │
│   │  1-2 years of consistent work   │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  🔥 ADVANCED                    │   │
│   │  3+ years, sport-specific       │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Screen 1.5: Equipment Access
```
┌─────────────────────────────────────────┐
│           ● ● ● ● ○ ○ ○                │
│                                         │
│      What equipment do you have?        │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  🏠 BODYWEIGHT ONLY             │   │
│   │  No equipment needed            │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  📦 MINIMAL                     │   │
│   │  Bands, jump rope, light DBs    │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  🏋️ FULL GYM                    │   │
│   │  Barbells, racks, boxes         │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Screen 1.6: Days Available
```
┌─────────────────────────────────────────┐
│           ● ● ● ● ● ○ ○                │
│                                         │
│      Days you can train per week?       │
│                                         │
│                                         │
│        2    3    4    5    6            │
│       [ ]  [●]  [ ]  [ ]  [ ]           │
│                                         │
│      We recommend 3-4 days for          │
│      optimal athletic development       │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │           CONTINUE              │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Screen 1.7: Injury History
```
┌─────────────────────────────────────────┐
│           ● ● ● ● ● ● ○                │
│                                         │
│      Any recent injuries?               │
│      Help us keep you safe              │
│                                         │
│   [ ] Ankle/foot                        │
│   [ ] Knee                              │
│   [✓] Meniscus (knee cartilage)         │
│       ⚠️ We'll use conservative         │
│          loading for plyometrics        │
│   [ ] Hip/groin                         │
│   [ ] Lower back                        │
│   [ ] Shoulder                          │
│   [ ] None                              │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │           CONTINUE              │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Screen 1.8: Consent
```
┌─────────────────────────────────────────┐
│           ● ● ● ● ● ● ●                │
│                                         │
│      Almost there!                      │
│                                         │
│   [✓] I agree to the Terms of Service   │
│       and Privacy Policy                │
│                                         │
│   [ ] I consent to optional video       │
│       uploads for technique review      │
│       (you can change this later)       │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │       CREATE MY PROFILE         │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Screen 1.9: Athletic Profile Summary
```
┌─────────────────────────────────────────┐
│                                         │
│      Your Athletic Profile              │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  GOALS                          │   │
│   │  Vertical Jump • Explosiveness  │   │
│   ├─────────────────────────────────┤   │
│   │  SPORT        Basketball        │   │
│   ├─────────────────────────────────┤   │
│   │  LEVEL        Intermediate      │   │
│   ├─────────────────────────────────┤   │
│   │  EQUIPMENT    Minimal           │   │
│   ├─────────────────────────────────┤   │
│   │  FREQUENCY    3 days/week       │   │
│   ├─────────────────────────────────┤   │
│   │  ⚠️ Meniscus flag active        │   │
│   │  Conservative plyos enabled     │   │
│   └─────────────────────────────────┘   │
│                                         │
│   Recommended: Vertical Jump Builder    │
│   Start: Monday, Jan 6                  │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │        START WEEK 1             │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## 2. Train Tab

### Screen 2.1: Weekly Plan (Today View)
```
┌─────────────────────────────────────────┐
│  Week 2 of 8            Vertical Jump   │
│                                         │
│  ← Mon  Tue  [WED]  Thu  Fri  Sat  →    │
│     ✓    ✓    ●      ○    ○   REST      │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  TODAY'S SESSION                │   │
│   │                                 │   │
│   │  Power Day                      │   │
│   │  Reactive Strength Focus        │   │
│   │                                 │   │
│   │  ⏱️ ~35 min  |  7 exercises     │   │
│   │                                 │   │
│   │  ┌───────────────────────────┐  │   │
│   │  │     START WORKOUT         │  │   │
│   │  └───────────────────────────┘  │   │
│   └─────────────────────────────────┘   │
│                                         │
│   Preview:                              │
│   ┌──────┐ ┌──────┐ ┌──────┐           │
│   │[demo]│ │[demo]│ │[demo]│           │
│   │Pogos │ │Drops │ │Bounds│           │
│   └──────┘ └──────┘ └──────┘           │
│                                         │
├─────────────────────────────────────────┤
│ [Train]  [Programs]  [Progress] [Prof]  │
└─────────────────────────────────────────┘
```

### Screen 2.2: Session Execution - Exercise View
```
┌─────────────────────────────────────────┐
│  ←  Power Day           3 of 7          │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   │         [ANIMATED DEMO]         │   │
│   │         Looping video/lottie    │   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│   BOX JUMPS                             │
│   Power • Reactive                      │
│                                         │
│   "Drive arms up explosively.           │
│    Land soft with bent knees."          │
│                                         │
│            3 × 5 reps                   │
│                                         │
│   Set 2 of 3                            │
│   ┌─────────────────────────────────┐   │
│   │  Rep: [1] [2] [3] [●] [5]       │   │
│   └─────────────────────────────────┘   │
│                                         │
│  [PAUSE]              [SKIP]  [NEXT →]  │
│                                         │
└─────────────────────────────────────────┘
```

### Screen 2.3: Rest Timer
```
┌─────────────────────────────────────────┐
│  ←  Power Day           3 of 7          │
│                                         │
│                                         │
│                                         │
│              REST                       │
│                                         │
│            ┌───────┐                    │
│            │ 1:45  │                    │
│            └───────┘                    │
│                                         │
│   💡 Tip: Shake out your legs           │
│      to stay loose                      │
│                                         │
│                                         │
│   Next up: Box Jumps - Set 3            │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │         SKIP REST               │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Screen 2.4: Session Complete
```
┌─────────────────────────────────────────┐
│                                         │
│              ✓                          │
│         SESSION DONE                    │
│                                         │
│         Power Day                       │
│         35 min • 7 exercises            │
│                                         │
│                                         │
│      How did that feel?                 │
│                                         │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│   │  😌     │ │  💪     │ │  😤     │   │
│   │  Easy   │ │  Good   │ │  Hard   │   │
│   └─────────┘ └─────────┘ └─────────┘   │
│                                         │
│   Quick notes (optional):               │
│   [Felt fast] [Legs heavy] [Great form] │
│                                         │
│   Record a metric? (optional)           │
│   Jump height: [___] cm                 │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │           FINISH                │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## 3. Programs Tab

### Screen 3.1: Program List
```
┌─────────────────────────────────────────┐
│  Programs                               │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ [Banner Image]                  │    │
│  │ VERTICAL JUMP BUILDER           │    │
│  │ 8 weeks • 3x/week              │    │
│  │ ████████░░ 65% complete        │    │
│  │ [CONTINUE]                      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Explore More                           │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ SPEED FOUNDATIONS               │    │
│  │ 6 weeks • Build acceleration   │    │
│  │ Level: Beginner                │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ EXPLOSIVE ATHLETE               │    │
│  │ 4 weeks • Total body power     │    │
│  │ Level: Intermediate            │    │
│  └─────────────────────────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│ [Train]  [Programs]  [Progress] [Prof]  │
└─────────────────────────────────────────┘
```

### Screen 3.2: Program Detail
```
┌─────────────────────────────────────────┐
│  ←                                      │
│  ┌─────────────────────────────────┐    │
│  │      [Hero Image/Video]         │    │
│  └─────────────────────────────────┘    │
│                                         │
│  SPEED FOUNDATIONS                      │
│  Master the mechanics of acceleration   │
│                                         │
│  🗓️ 6 weeks  |  ⏱️ 35-45 min sessions   │
│  📊 Beginner  |  🏠 Bodyweight          │
│                                         │
│  This program builds your sprint        │
│  mechanics from the ground up.          │
│  Focus: acceleration, drive phase,      │
│  reactive ground contact.               │
│                                         │
│  Week Overview:                         │
│  ┌─────────────────────────────────┐    │
│  │ Week 1: Base mechanics          │    │
│  │ Week 2: Arm drive & posture     │    │
│  │ Week 3: Ground contact          │    │
│  │ Week 4: Acceleration builds     │    │
│  │ Week 5: Speed endurance         │    │
│  │ Week 6: Testing & consolidation │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │        START PROGRAM            │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

---

## 4. Progress Tab

### Screen 4.1: Progress Dashboard
```
┌─────────────────────────────────────────┐
│  Progress                               │
│                                         │
│         ┌─────────┐                     │
│         │   3/4   │  This Week          │
│         │  ╭───╮  │                     │
│         │  │75%│  │                     │
│         │  ╰───╯  │                     │
│         └─────────┘                     │
│                                         │
│   🔥 12 day streak                      │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Program Progress                       │
│  Vertical Jump Builder                  │
│  ████████████░░░░░░░░░ Week 5 of 8      │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Recent Sessions                        │
│  ┌─────────────────────────────────┐    │
│  │ Wed, Jan 8    Power Day    💪   │    │
│  │ Mon, Jan 6    Strength     💪   │    │
│  │ Sat, Jan 4    Speed        😌   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Badges                                 │
│  [🏆 Week 1] [🏆 Week 4] [🔒 Week 8]     │
│                                         │
├─────────────────────────────────────────┤
│ [Train]  [Programs]  [Progress] [Prof]  │
└─────────────────────────────────────────┘
```

---

## 5. Profile Tab

### Screen 5.1: Profile Home
```
┌─────────────────────────────────────────┐
│  Profile                                │
│                                         │
│         ┌───────┐                       │
│         │ Avatar│                       │
│         └───────┘                       │
│         Alex Johnson                    │
│         Joined Dec 2025                 │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Athletic Profile                    →  │
│  Goals, equipment, schedule             │
│                                         │
│  Settings                            →  │
│  Notifications, sync, theme             │
│                                         │
│  Privacy & Data                      →  │
│  Export, delete, permissions            │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [🔓 Upgrade to Premium]                │
│                                         │
│  Help & Support                      →  │
│  About                               →  │
│  Sign Out                               │
│                                         │
├─────────────────────────────────────────┤
│ [Train]  [Programs]  [Progress] [Prof]  │
└─────────────────────────────────────────┘
```

---

## 6. Premium Paywall

### Screen 6.1: Paywall (Non-Intrusive)
```
┌─────────────────────────────────────────┐
│                              ✕          │
│                                         │
│         ⚡ APEX PREMIUM                 │
│                                         │
│   Unlock your full potential            │
│                                         │
│   ✓ Coach-designed programs             │
│   ✓ Video technique review              │
│   ✓ Advanced progress analytics         │
│   ✓ Cloud backup & sync                 │
│   ✓ Export session logs                 │
│   ✓ Program marketplace access          │
│                                         │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  YEARLY        $49.99/year      │   │
│   │  Best value - 7 day free trial  │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  MONTHLY       $7.99/month      │   │
│   │  Cancel anytime                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│           Maybe later                   │
│                                         │
│   Terms • Privacy • Restore purchase   │
└─────────────────────────────────────────┘
```
