# Offline & Sync Strategy

## Local Database Schema (SQLite)

```sql
-- User profile (single row)
CREATE TABLE user_profile (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL, -- JSON blob
  updated_at INTEGER NOT NULL
);

-- Cached programs
CREATE TABLE programs (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  downloaded_at INTEGER NOT NULL
);

-- Cached workouts
CREATE TABLE workouts (
  id TEXT PRIMARY KEY,
  program_id TEXT,
  data TEXT NOT NULL
);

-- Cached exercises
CREATE TABLE exercises (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  demo_cached INTEGER DEFAULT 0
);

-- Session logs (offline-first)
CREATE TABLE session_logs (
  id TEXT PRIMARY KEY,
  workout_id TEXT NOT NULL,
  data TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  synced_at INTEGER -- NULL if pending sync
);

-- Sync queue
CREATE TABLE sync_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- 'SESSION_LOG', 'PROFILE_UPDATE'
  payload TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  attempts INTEGER DEFAULT 0,
  last_error TEXT
);

-- Progress snapshots
CREATE TABLE progress_snapshots (
  user_id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Media cache metadata
CREATE TABLE media_cache (
  exercise_id TEXT PRIMARY KEY,
  resolution TEXT,
  file_path TEXT,
  size_bytes INTEGER,
  cached_at INTEGER
);
```

---

## Sync Behavior

### Default Sync Conditions
```javascript
const syncConditions = {
  autoSync: true,
  requireWifi: true,
  requireCharging: false,
  syncIntervalMinutes: 30,
  maxRetries: 3,
  retryBackoffMs: [1000, 5000, 30000]
};
```

### Sync Priority
1. Session logs (highest)
2. Profile updates
3. Progress snapshots
4. Program progress
5. Media pre-fetch (lowest)

### Sync Flow
```javascript
async function performSync() {
  if (!isOnline()) return;
  
  // 1. Push local changes
  const pending = await db.syncQueue.getAll();
  for (const item of pending) {
    try {
      await api.sync(item.type, item.payload);
      await db.syncQueue.delete(item.id);
    } catch (error) {
      await db.syncQueue.incrementAttempts(item.id, error);
    }
  }
  
  // 2. Pull remote updates
  const lastSync = await getLastSyncTimestamp();
  const updates = await api.getUpdates(lastSync);
  await applyUpdates(updates);
}
```

---

## Conflict Resolution

**Strategy: Last-Write Wins with Local Preservation**

```javascript
function resolveConflict(local, remote) {
  if (remote.updatedAt > local.updatedAt) {
    // Archive local version
    await db.conflicts.insert({
      type: local.type,
      localData: local.data,
      remoteData: remote.data,
      resolvedAt: Date.now()
    });
    return remote;
  }
  return local;
}
```

---

## Offline Capabilities

| Feature | Offline Support |
|---------|-----------------|
| View weekly plan | ✅ Full (cached) |
| Start workout | ✅ Full |
| Complete workout | ✅ Full (queued) |
| View progress | ✅ Cached snapshot |
| Change program | ❌ Requires sync |
| Export data | ❌ Requires sync |
