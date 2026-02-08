# Animation & Media Requirements

## Supported Demo Types

| Type | Format | Max Size | Use Case |
|------|--------|----------|----------|
| Lottie | `.json` | 500KB | Preferred for vectors |
| MP4 | `.mp4` (H.264) | 2MB | Realistic movements |
| GIF | `.gif` | 1MB | Simple loops |
| SVG Sequence | `.svg` | 300KB | Step-by-step |
| Static Fallback | `.webp` | 100KB | Offline/error state |

---

## Video Specifications

```yaml
format: MP4 (H.264)
duration: 3-5 seconds (loop)
resolution:
  - 1080p (1920x1080) - primary
  - 720p (1280x720) - mobile default
  - 480p (854x480) - low bandwidth
framerate: 30fps
aspect_ratio: 16:9 or 1:1 (square)
audio: none
loop: seamless (first/last frames match)
```

---

## Folder & Naming Convention

```
/media/exercises/{exerciseId}/
├── demo@1080.mp4
├── demo@720.mp4
├── demo@480.mp4
├── demo.json           # Lottie
├── fallback@1x.webp
├── fallback@2x.webp
├── fallback@3x.webp
└── metadata.json
```

### Metadata Schema
```json
{
  "exerciseId": "box_jump_001",
  "recommendedCameraAngle": "side_45",
  "dominantSide": "neutral",
  "focalLengthHint": 50,
  "duration": 4.2,
  "loopPoint": 4.0,
  "keyframes": [0.5, 1.2, 2.8],
  "altText": "Athlete performing box jump with arm drive"
}
```

---

## Camera Angles

| Angle | Code | Use For |
|-------|------|---------|
| Front | `front` | Arm movements, posture |
| Side (45°) | `side_45` | Jumps, sprints, most movements |
| Rear | `rear` | Back mechanics |
| Overhead | `overhead` | Footwork patterns |

---

## Resolution Selection

```javascript
function selectDemoResolution(networkType, deviceDpi) {
  if (networkType === "wifi" && deviceDpi >= 3) {
    return "demo@1080.mp4";
  } else if (networkType === "wifi" || deviceDpi >= 2) {
    return "demo@720.mp4";
  } else {
    return "demo@480.mp4";
  }
}
```

---

## Fallback Strategy

```javascript
async function loadExerciseDemo(exerciseId) {
  try {
    // 1. Try video
    const video = await loadVideo(exerciseId);
    return { type: "video", source: video };
  } catch {
    try {
      // 2. Try Lottie
      const lottie = await loadLottie(exerciseId);
      return { type: "lottie", source: lottie };
    } catch {
      // 3. Static fallback
      const image = await loadFallbackImage(exerciseId);
      return { type: "image", source: image };
    }
  }
}
```

---

## Caching Strategy

- Cache demos for current program week locally
- Pre-fetch next week's demos on Wi-Fi
- Max local cache: 500MB (configurable)
- LRU eviction for least-used demos
