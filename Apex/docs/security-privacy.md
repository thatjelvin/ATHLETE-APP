# Security & Privacy Specification

## Data Collection Principles

### Collected (Required)
- Email (for account)
- Training goals, experience level
- Session completion logs
- Perceived difficulty ratings

### Collected (Optional, Opt-In)
- Date of birth (for age-appropriate programming)
- Sport
- Injury flags
- Video uploads for technique review
- Device crash diagnostics

### Never Collected
- Precise geolocation
- Biometric data (heart rate, etc.)
- Body weight / body composition
- Calorie data
- Contacts or social data

---

## Data Storage

### Local (Device)
```javascript
const localStoragePolicy = {
  encryption: "SQLCipher", // AES-256
  keyStorage: "Secure Keychain/Keystore",
  sessionLogs: "encrypted",
  mediaCache: "unencrypted", // public content
  credentials: "secure_storage_only"
};
```

### Cloud
```javascript
const cloudStoragePolicy = {
  provider: "AWS/GCP with SOC2",
  encryption: {
    atRest: "AES-256",
    inTransit: "TLS 1.3"
  },
  videoStorage: "S3 with server-side encryption",
  backupRetention: "30 days",
  region: "user-selected or auto (closest)"
};
```

---

## User Rights (GDPR/CCPA)

### Data Export
```
GET /api/users/me/export
Response: ZIP file containing:
  - profile.json
  - session_logs.json
  - progress_history.json
  - uploaded_videos/ (if any)
```

### Data Deletion
```
DELETE /api/users/me
Process:
  1. Immediate: Remove from active DB
  2. 24 hours: Purge from backups
  3. 72 hours: Remove from CDN caches
  4. Confirmation email sent
```

### Consent Management
```javascript
const consentFlags = {
  termsAccepted: true,           // Required
  privacyAccepted: true,         // Required
  videoUploadConsent: false,     // Optional
  analyticsConsent: false,       // Optional
  marketingConsent: false        // Optional
};
```

---

## Video Upload Security

```javascript
const videoUploadPolicy = {
  maxSize: "100MB",
  allowedFormats: ["mp4", "mov"],
  uploadEncryption: "TLS 1.3",
  storageEncryption: "AES-256",
  accessControl: "user-only by default",
  retention: "until deleted by user",
  processingLocation: "same region as user"
};
```

---

## Authentication

```yaml
Methods:
  - Email + Password (bcrypt, 12 rounds)
  - Google OAuth 2.0
  - Apple Sign-In

Session:
  - JWT access token (15 min expiry)
  - Refresh token (30 day expiry)
  - Token rotation on refresh

Security:
  - Rate limiting: 5 failed attempts → 15 min lockout
  - Password requirements: 8+ chars, 1 number
```

---

## Telemetry (Opt-In Only)

```javascript
const telemetryPolicy = {
  defaultEnabled: false,
  collectedIfEnabled: [
    "crash_reports",
    "performance_metrics",
    "feature_usage_counts"
  ],
  neverCollected: [
    "screen_recordings",
    "keystroke_logs",
    "personal_identifiers"
  ],
  anonymization: "device_id_hashed"
};
```
