# UI Component Library

## Design Tokens

### Colors
```scss
$background-primary: #0D0D0F;      // Near black
$background-secondary: #1A1A1E;    // Card backgrounds
$background-tertiary: #252528;     // Elevated surfaces
$text-primary: #FFFFFF;
$text-secondary: #A0A0A5;
$text-disabled: #5C5C60;
$accent-primary: #FF6B35;          // Neon orange
$success: #4ADE80;
$warning: #FBBF24;
$error: #F87171;

// Intent colors
$intent-speed: #3B82F6;
$intent-reactive: #8B5CF6;
$intent-power: #EF4444;
$intent-control: #10B981;
$intent-mobility: #F59E0B;
```

### Typography
```scss
$font-family: 'Inter', sans-serif;
$text-2xl: 22sp;    // Minimum heading
$text-3xl: 28sp;
$text-4xl: 36sp;
```

### Sizing
```scss
$touch-min: 44dp;     // Minimum touch target
$cta-height: 56dp;    // Primary CTA min height
```

---

## Components

### 1. LargeCTA
Primary action button (56dp min height, full width).

| State | Style |
|-------|-------|
| Enabled | `$accent-primary` bg, white text, shadow |
| Pressed | Darkened 10%, scale 0.98, haptic |
| Disabled | `$background-tertiary` bg, `$text-disabled` |
| Loading | Spinner centered, interaction blocked |

**A11y:** `accessibilityRole="button"`, min 56dp height

### 2. ExerciseCard
Exercise display with animated demo.

| State | Description |
|-------|-------------|
| Collapsed | Thumbnail + title + sets badge |
| Expanded | Full demo + cues + progress |
| Active | Accent border, pulsing glow |
| Completed | Checkmark overlay, 0.7 opacity |

**A11y:** Labels include name, state, sets progress

### 3. ProgressRing
Circular progress (sm: 48dp, md: 80dp, lg: 120dp).

- Animates fill over 800ms ease-out
- Haptic + pulse at 100%
- `accessibilityRole="progressbar"`

### 4. SessionCalendarTile
Day tile in weekly scroller.

| State | Style |
|-------|-------|
| Locked | Dashed border, 🔒 icon |
| Available | Solid border, ○ icon |
| Today | Accent bg, elevated shadow |
| Completed | ✓ icon, `$success` color |
| Rest | 🌙 icon, "REST" label |

### 5. PerceivedDifficultyPicker
Three-button selector: Easy 😌 / Good 💪 / Hard 😤

- Selected: accent border, emoji scales 1.1x
- Haptic on selection
- `accessibilityRole="radiogroup"`

### 6. WeeklyPlanScroller
Horizontal scroll with snap, auto-centers on today.

### 7. RestTimer
Full-screen countdown with skip button.
- Vibration at 3s remaining
- Time announced every 30s

### 8. IntentBadge
Pill tag showing Speed/Reactive/Power/Control/Mobility.
Background: intent color @ 20%, text: intent color @ 100%.

### 9. QuickNoteChip
Selectable tags: "Felt fast", "Legs heavy", "Great form", etc.

### 10. MetricInput
Optional number input for jump height (cm) or sprint time (sec).
