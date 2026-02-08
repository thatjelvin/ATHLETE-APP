# Data Models (JSON Schemas)

## UserProfile
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "name": { "type": "string", "maxLength": 100 },
    "email": { "type": "string", "format": "email" },
    "dob": { "type": "string", "format": "date" },
    "locale": { "type": "string", "default": "en-US" },
    "goals": {
      "type": "array",
      "items": { "enum": ["speed", "vertical_jump", "explosiveness", "agility", "athletic_base"] },
      "minItems": 1
    },
    "sport": { "type": ["string", "null"] },
    "experience": { "enum": ["beginner", "intermediate", "advanced"] },
    "equipment": { "enum": ["bodyweight", "minimal", "full_gym"] },
    "daysPerWeek": { "type": "integer", "minimum": 2, "maximum": 6 },
    "injuryFlags": {
      "type": "array",
      "items": { "enum": ["ankle", "knee", "meniscus", "hip", "lower_back", "shoulder"] }
    },
    "videoUploadConsent": { "type": "boolean", "default": false },
    "createdAt": { "type": "string", "format": "date-time" },
    "updatedAt": { "type": "string", "format": "date-time" }
  },
  "required": ["id", "goals", "experience", "equipment", "daysPerWeek"]
}
```

## Exercise
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "intents": {
      "type": "array",
      "items": { "enum": ["Speed", "Reactive", "Control", "Power", "Mobility"] }
    },
    "demoType": { "enum": ["gif", "mp4", "lottie", "svg"] },
    "demoUrl": { "type": "string", "format": "uri" },
    "difficulty": { "type": "integer", "minimum": 1, "maximum": 10 },
    "primaryMuscles": { "type": "array", "items": { "type": "string" } },
    "unilateral": { "type": "boolean" },
    "cues": { "type": "array", "items": { "type": "string" }, "maxItems": 3 },
    "recommendedRestSeconds": { "type": "integer", "minimum": 30, "maximum": 300 },
    "contactLoad": { "type": "integer", "description": "Ground contacts per set" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "equipmentRequired": { "type": "array", "items": { "type": "string" } },
    "contraindications": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["id", "name", "intents", "difficulty", "cues"]
}
```

## Workout
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "title": { "type": "string" },
    "goal": { "type": "string" },
    "durationEstimateMinutes": { "type": "integer" },
    "exercises": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "exerciseId": { "type": "string" },
          "sets": { "type": "integer" },
          "reps": { "type": ["integer", "null"] },
          "duration": { "type": ["integer", "null"], "description": "Seconds for timed exercises" },
          "distance": { "type": ["string", "null"], "description": "e.g., '20m'" },
          "restSeconds": { "type": "integer" },
          "targetType": { "enum": ["reps", "seconds", "distance"] }
        },
        "required": ["exerciseId", "sets", "targetType"]
      }
    },
    "intensityScore": { "type": "integer", "minimum": 1, "maximum": 10 },
    "sessionType": { "enum": ["technique", "power", "speed", "strength", "endurance", "recovery"] },
    "totalContacts": { "type": "integer", "description": "Plyometric ground contacts" }
  },
  "required": ["id", "title", "exercises", "sessionType"]
}
```

## Program
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "title": { "type": "string" },
    "description": { "type": "string" },
    "weeks": { "type": "integer" },
    "sessionsPerWeek": { "type": "integer" },
    "level": { "enum": ["beginner", "intermediate", "advanced"] },
    "equipmentRequired": { "enum": ["bodyweight", "minimal", "full_gym"] },
    "primaryGoal": { "type": "string" },
    "weekStructure": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "weekNumber": { "type": "integer" },
          "theme": { "type": "string" },
          "sessions": { "type": "array", "items": { "type": "string" } }
        }
      }
    },
    "progressionRulesRef": { "type": "string" }
  },
  "required": ["id", "title", "weeks", "sessionsPerWeek", "weekStructure"]
}
```

## SessionLog
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "userId": { "type": "string", "format": "uuid" },
    "workoutId": { "type": "string" },
    "programId": { "type": ["string", "null"] },
    "date": { "type": "string", "format": "date-time" },
    "durationMinutes": { "type": "integer" },
    "perceivedDifficulty": { "enum": ["easy", "good", "hard"] },
    "notes": { "type": "array", "items": { "type": "string" } },
    "completedExercises": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "exerciseId": { "type": "string" },
          "completedSets": { "type": "integer" },
          "skipped": { "type": "boolean" },
          "comments": { "type": "string" }
        }
      }
    },
    "metricsOptional": {
      "type": "object",
      "properties": {
        "jumpCm": { "type": ["integer", "null"] },
        "sprintMs": { "type": ["number", "null"] }
      }
    },
    "syncedAt": { "type": ["string", "null"], "format": "date-time" }
  },
  "required": ["id", "userId", "workoutId", "date", "perceivedDifficulty"]
}
```

## ProgressSnapshot
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "userId": { "type": "string", "format": "uuid" },
    "date": { "type": "string", "format": "date" },
    "consistencyStreak": { "type": "integer", "minimum": 0 },
    "sessionsThisWeek": { "type": "integer" },
    "targetSessionsPerWeek": { "type": "integer" },
    "lastActiveDate": { "type": "string", "format": "date" },
    "currentProgramId": { "type": ["string", "null"] },
    "programWeek": { "type": ["integer", "null"] },
    "badgesEarned": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["userId", "date", "consistencyStreak", "sessionsThisWeek"]
}
```
