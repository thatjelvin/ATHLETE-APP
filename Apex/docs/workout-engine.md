# Workout Execution Engine

## Overview
Manages single-exercise step flow, timers, rest periods, and feedback capture during active sessions.

---

## State Machine

```
IDLE → WARMUP → EXERCISE → REST → EXERCISE → ... → COOLDOWN → FEEDBACK → COMPLETE
         ↓         ↓        ↓
       PAUSED    PAUSED   SKIPPED
```

### States

| State | Description |
|-------|-------------|
| `IDLE` | No active session |
| `WARMUP` | Warmup exercises in progress |
| `EXERCISE` | Active exercise, counting reps/timer |
| `REST` | Rest countdown between sets |
| `PAUSED` | Session paused by user |
| `SKIPPED` | Exercise skipped, moving to next |
| `COOLDOWN` | Cooldown exercises |
| `FEEDBACK` | Post-workout feedback collection |
| `COMPLETE` | Session finished, logged |

---

## Exercise View Logic

```typescript
interface ExerciseState {
  exerciseId: string;
  currentSet: number;
  totalSets: number;
  currentRep: number;
  totalReps: number;
  targetType: "reps" | "seconds" | "distance";
  timeRemaining?: number; // for timed exercises
  restTimeRemaining?: number;
  isResting: boolean;
}
```

### Rep Counting
```javascript
function handleRepComplete() {
  hapticFeedback("light");
  
  if (currentRep >= totalReps) {
    if (currentSet >= totalSets) {
      transitionToNextExercise();
    } else {
      startRest();
    }
  } else {
    currentRep++;
    updateUI();
  }
}
```

### Timed Exercises
```javascript
function startTimedExercise(durationSeconds) {
  timer = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 3) {
      hapticFeedback("warning"); // Alert before end
    }
    if (timeRemaining <= 0) {
      handleSetComplete();
    }
  }, 1000);
}
```

---

## Rest Timer Logic

```javascript
function startRest() {
  state = "REST";
  restTimeRemaining = exercise.restSeconds;
  
  // Pre-alert vibration
  scheduleVibration(restTimeRemaining - 3, "prepare");
  scheduleVibration(restTimeRemaining - 0.5, "go");
  
  restTimer = setInterval(() => {
    restTimeRemaining--;
    if (restTimeRemaining <= 0) {
      transitionToNextSet();
    }
  }, 1000);
}

function skipRest() {
  clearInterval(restTimer);
  transitionToNextSet();
}
```

### Passive Tips During Rest
```javascript
const restTips = [
  "Shake out your legs to stay loose",
  "Focus on your breathing",
  "Visualize the next set",
  "Stay light on your feet",
  "Think: explosive, controlled"
];

function getRandomTip() {
  return restTips[Math.floor(Math.random() * restTips.length)];
}
```

---

## Haptic Feedback Patterns

| Event | Pattern |
|-------|---------|
| Rep complete | Light tap |
| Set complete | Medium tap |
| Exercise complete | Double tap |
| Rest ending (3s) | Warning pulse |
| Session complete | Celebration (3 taps) |
| Skip action | Soft tap |

---

## Control Actions

| Action | Effect |
|--------|--------|
| **Start** | Begin first exercise |
| **Pause** | Stop all timers, save state |
| **Resume** | Continue from paused state |
| **Skip Exercise** | Mark skipped, move to next |
| **Skip Rest** | End rest early, start next set |
| **Next** | Confirm set complete, advance |
| **Stop & Save** | Save partial progress, exit |

---

## Feedback Capture

### Post-Workout Screen
```javascript
const feedbackData = {
  perceivedDifficulty: null, // easy | good | hard (required)
  quickNotes: [],            // predefined tags
  metrics: {
    jumpCm: null,            // optional
    sprintMs: null           // optional
  }
};

const quickNoteOptions = [
  "Felt fast",
  "Legs heavy", 
  "Great form",
  "Low energy",
  "Strong finish",
  "Rushed"
];
```

### Validation
```javascript
function canFinishSession() {
  return feedbackData.perceivedDifficulty !== null;
}
```

---

## Offline Support

```javascript
function saveSessionLocally(sessionLog) {
  // Save to SQLite immediately
  db.sessionLogs.insert({
    ...sessionLog,
    syncedAt: null // Mark as pending sync
  });
  
  // Queue for sync
  syncQueue.add({
    type: "SESSION_LOG",
    data: sessionLog,
    timestamp: Date.now()
  });
}
```

---

## Error Recovery

| Scenario | Response |
|----------|----------|
| App backgrounded | Pause timers, save state |
| App killed | Recover from last saved state on reopen |
| Timer drift | Re-sync with system time every 30s |
| Demo fails to load | Show static fallback image |
