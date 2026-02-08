# Progression Engine Specification

## Overview
The progression engine adjusts training load based on user feedback, injury status, and completion patterns. It ensures safe, gradual overload while respecting individual constraints.

---

## Core Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `plyoContactsPerWeekBase` | int | Beg: 60, Int: 100, Adv: 140 | Weekly ground contact limit |
| `plyoContactCoefficient` | float | 1.0 | Multiplier based on days/week |
| `meniscusReduction` | float | 0.75 | 25% reduction if meniscus flag |
| `progressStepThreshold` | int | 3 | Sessions before progression |
| `regressionThreshold` | int | 2 | Consecutive "hard" before regression |
| `volumeReductionPercent` | float | 0.15 | Volume cut on regression |
| `sprintDistanceStepM` | int | 10 | Distance increase per step |
| `reactiveGctReductionPercent` | float | 0.05 | 5% GCT reduction per level |
| `reactiveProgressionWeeks` | int | 3 | Weeks before GCT reduction |

---

## Heuristic Rules

### 1. Plyometric Contact Limiter
```
maxContactsPerWeek = plyoContactsPerWeekBase[level] 
                   * (daysPerWeek / 4) 
                   * (hasInjuryFlag("meniscus") ? 0.75 : 1.0)

// Example: Intermediate, 3 days, meniscus
// 100 * 0.75 * 0.75 = 56 contacts/week
```

**Contact counting:**
- Low box jump = 1 contact/rep
- Depth jump = 2 contacts/rep (drop + jump)
- Bounds = 1 contact/bound

### 2. Sprint Volume Rule
```
IF session[day-1].type == "maxV_sprint" THEN
  session[day].type NOT IN ["maxV_sprint", "acceleration"]
  session[day].type SHOULD BE ["technique", "activation", "recovery"]
END
```

**Sprint categories:**
- `maxV_sprint`: 95-100% intensity, >30m
- `acceleration`: 90-100% intensity, <30m
- `technique`: <80% intensity, focus on form

### 3. Progressive Overload Triggers
```
IF countRecentSessions(workoutId, difficulty IN ["easy", "good"]) >= 3 THEN
  applyProgressionStep(workoutId)
END

progressionStep = {
  sprintDistance: +10m OR +1 rep,
  plyoSets: +1 set (if under contact cap),
  exerciseVariant: bilateral → unilateral,
  restReduction: -10s (min 60s)
}
```

### 4. Regression Triggers
```
IF countConsecutiveSessions(difficulty == "hard") >= 2 THEN
  reduceVolume(0.15)
  insertRecoverySession()
  FLAG: notify user "We've adjusted your load"
END
```

### 5. Unilateral Progression Path
Each step requires 3/4 sessions completed with `perceivedDifficulty != "hard"`:

```
Level 1: Bilateral
  └─→ Squat, Box Jump, RDL

Level 2: Split Stance
  └─→ Split Squat, Staggered Box Jump

Level 3: Supported Single-Leg
  └─→ Bulgarian Split Squat, Assisted SL Box Jump

Level 4: Full Single-Leg
  └─→ Pistol Squat, SL RDL, SL Box Jump
```

### 6. Reactive Progression (Ground Contact Time)
```
FOR each reactiveProgressionWeeks:
  targetGCT = previousGCT * (1 - reactiveGctReductionPercent)
  
// Beginner: Start 350ms target → 332ms after 3 weeks
// Intermediate: Start 250ms → 237ms
// Advanced: Start 180ms → 171ms
```

---

## Injury Flag Modifiers

| Flag | Effect |
|------|--------|
| `meniscus` | -25% plyo contacts, no depth jumps, max box height 12" |
| `ankle` | No reactive hops, pogos limited to 2x10 |
| `knee` | Progressive squat depth, no heavy loaded jumps |
| `hip` | Limit hip flexion exercises, no deep lunges |
| `lower_back` | No axial loading >bodyweight, focus on glute activation |
| `shoulder` | No overhead movements, arm swing cues only |

---

## Session Quality Scoring

```javascript
function calculateSessionQuality(sessionLog) {
  let score = 0;
  
  // Completion rate (0-40 points)
  const completionRate = sessionLog.completedExercises
    .filter(e => !e.skipped).length / sessionLog.exercises.length;
  score += completionRate * 40;
  
  // Difficulty alignment (0-30 points)
  if (sessionLog.perceivedDifficulty === "good") score += 30;
  else if (sessionLog.perceivedDifficulty === "easy") score += 20;
  else score += 10; // hard
  
  // Consistency bonus (0-30 points)
  const streak = getConsistencyStreak(userId);
  score += Math.min(streak * 3, 30);
  
  return score; // 0-100
}
```

---

## Weekly Load Distribution

| Day Type | Load % | Example |
|----------|--------|---------|
| High | 100% | Sprint/Plyo day |
| Medium | 70% | Strength day |
| Low | 40% | Technique/Recovery |
| Rest | 0% | No scheduled session |

**Weekly pattern (3 days/week):**
```
Mon: High (Speed)
Wed: Medium (Strength) 
Fri: High (Power)
```

**Weekly pattern (4 days/week):**
```
Mon: High (Speed)
Tue: Low (Technique)
Thu: Medium (Strength)
Sat: High (Power)
```
