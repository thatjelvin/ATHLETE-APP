# Weekly Plan Generator Algorithm

## Overview
Generates a 7-day training schedule based on user profile, program focus, and recovery rules.

---

## Inputs

| Input | Type | Source |
|-------|------|--------|
| `userDaysPerWeek` | int (2-6) | UserProfile |
| `primaryGoal` | string | UserProfile.goals[0] |
| `programFocus` | string | Active Program |
| `equipment` | string | UserProfile |
| `injuryFlags` | string[] | UserProfile |
| `lastSessionDate` | Date | ProgressSnapshot |
| `recentDifficulty` | string[] | Last 3 SessionLogs |

---

## Output

```typescript
interface WeeklyPlan {
  weekStartDate: Date;
  days: DayPlan[];
  todayIndex: number;
}

interface DayPlan {
  date: Date;
  dayOfWeek: string;
  sessionType: "high" | "medium" | "low" | "rest";
  workoutId: string | null;
  workoutTitle: string;
  isToday: boolean;
  status: "locked" | "available" | "completed" | "skipped";
}
```

---

## Algorithm

```javascript
function generateWeeklyPlan(inputs) {
  const { userDaysPerWeek, primaryGoal, programFocus } = inputs;
  
  // 1. Get session templates based on days available
  const sessionMix = getSessionMix(userDaysPerWeek, primaryGoal);
  
  // 2. Distribute across week (avoid consecutive high-intensity)
  const distribution = distributeAcrossWeek(sessionMix, userDaysPerWeek);
  
  // 3. Apply recovery constraints
  const adjusted = applyRecoveryRules(distribution, inputs.injuryFlags);
  
  // 4. Assign specific workouts from program
  const withWorkouts = assignWorkouts(adjusted, programFocus);
  
  // 5. Mark statuses based on current date and completion
  return markStatuses(withWorkouts, inputs.lastSessionDate);
}
```

### Session Mix by Days/Week

| Days | High | Medium | Low | Rest |
|------|------|--------|-----|------|
| 2 | 2 | 0 | 0 | 5 |
| 3 | 2 | 1 | 0 | 4 |
| 4 | 2 | 1 | 1 | 3 |
| 5 | 2 | 2 | 1 | 2 |
| 6 | 3 | 2 | 1 | 1 |

### Distribution Rules

```javascript
const distributionRules = {
  // Never schedule high-intensity on consecutive days
  noConsecutiveHigh: true,
  
  // Preferred high-intensity days
  preferredHighDays: ["monday", "wednesday", "friday", "saturday"],
  
  // Rest day preferences
  preferredRestDays: ["sunday"],
  
  // Minimum gap between high days
  minHighGapDays: 1,
  
  // Place medium after high for recovery
  mediumAfterHigh: true
};
```

### Goal-Based Session Types

| Goal | High Session | Medium Session | Low Session |
|------|--------------|----------------|-------------|
| Speed | Sprint/Accel | Strength | Technique |
| Vertical Jump | Plyo Power | Strength | Mobility |
| Explosiveness | Power Complex | Strength | Activation |
| Agility | Reactive | Strength | Footwork |
| Athletic Base | Mixed Power | Strength | Movement |

---

## Edge Cases

### 1. User Reduces Availability
```javascript
if (newDaysPerWeek < currentProgramDays) {
  // Compress program, maintain progression triggers
  const compressionRatio = newDaysPerWeek / currentProgramDays;
  
  // Merge low-priority sessions
  // Keep all high-intensity sessions
  // Show modal: "Your program has been adjusted..."
}
```

### 2. Missed Sessions
```javascript
if (missedSessionsThisWeek >= 2) {
  // Offer catch-up option
  // If declined, shift remaining to next week
  // Don't penalize streak if < 2 missed
}
```

### 3. Injury Flag Active
```javascript
if (injuryFlags.includes("meniscus")) {
  // Replace depth jumps with low box alternatives
  // Cap high-intensity sessions at 2/week
  // Add mandatory mobility day
}
```

### 4. Program Week Transition
```javascript
if (isLastDayOfProgramWeek && allSessionsComplete) {
  // Generate next week preview
  // Show milestone badge if earned
  // Apply progression step if threshold met
}
```
