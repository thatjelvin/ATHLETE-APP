# QA & Accessibility Checklist

## QA Checklist

### Onboarding Flow
- [ ] All 7 onboarding steps navigate correctly
- [ ] Back button preserves previous selections
- [ ] Multi-select goals persist across navigation
- [ ] Sport dropdown populates correctly
- [ ] "Not listed" free text input works
- [ ] Days selector (2-6) constrains correctly
- [ ] Injury checkboxes save to profile
- [ ] Meniscus flag triggers warning message
- [ ] Consent checkboxes required before proceed
- [ ] Athletic Profile summary displays all inputs
- [ ] "Start Week 1" creates first week plan

### Training Session
- [ ] Start Workout loads correct exercises
- [ ] Demo videos/animations play and loop
- [ ] Demo fallback displays if video fails
- [ ] Rep counter increments on tap
- [ ] Timer counts down accurately
- [ ] Rest timer starts after set complete
- [ ] Haptic feedback fires on rep complete
- [ ] Pre-rest vibration at 3 seconds
- [ ] Skip Rest advances to next set
- [ ] Skip Exercise marks as skipped
- [ ] Pause stops all timers
- [ ] Resume continues from paused state
- [ ] Stop & Save preserves partial progress
- [ ] Session completes after all exercises

### Feedback Capture
- [ ] Difficulty selector required to finish
- [ ] Quick notes are optional
- [ ] Metric input accepts numbers only
- [ ] Session log saves to local DB
- [ ] Sync queue entry created

### Progress & Programs
- [ ] Weekly ring shows correct %
- [ ] Streak calculates correctly
- [ ] Program progress bar accurate
- [ ] Completed sessions show in history
- [ ] Badges display when earned
- [ ] Program list shows all programs
- [ ] Current program highlighted
- [ ] Program detail displays weeks

### Offline/Sync
- [ ] App launches offline
- [ ] Cached workouts available offline
- [ ] Session completes offline
- [ ] Sync triggers when online
- [ ] Conflict resolution works
- [ ] Sync status indicator accurate

### Edge Cases
- [ ] App backgrounded during session recovers
- [ ] App killed during session recovers
- [ ] Network timeout handled gracefully
- [ ] Empty states display correctly
- [ ] Error messages are helpful

---

## Accessibility Checklist

### Touch Targets
- [ ] All buttons ≥ 44dp × 44dp
- [ ] CTA buttons ≥ 56dp height
- [ ] Adequate spacing between targets

### Visual
- [ ] Text contrast ratio ≥ 4.5:1
- [ ] Headings ≥ 22sp
- [ ] No information conveyed by color alone
- [ ] Icons have text labels or tooltips

### Screen Reader
- [ ] All images have alt text
- [ ] Buttons have accessibilityLabel
- [ ] Progress has accessibilityValue
- [ ] Form inputs have accessibilityLabel
- [ ] Error states announced
- [ ] Timer announces periodically

### Motor
- [ ] No time-sensitive actions without pause
- [ ] Skip options available for timed content
- [ ] Large tap targets for primary actions

### Cognitive
- [ ] Clear, simple language
- [ ] One action per screen during onboarding
- [ ] Progress indicators visible
- [ ] Confirmation before destructive actions

### Testing
- [ ] Tested with VoiceOver (iOS)
- [ ] Tested with TalkBack (Android)
- [ ] Tested with increased text size
- [ ] Tested with reduced motion
- [ ] Tested with high contrast mode
