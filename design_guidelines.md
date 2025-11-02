# Design Guidelines: Water Intake Tracker PWA

## Design Approach

**Selected Approach**: Design System-Based (Material Design) with inspiration from Apple Health and Google Fit

**Justification**: This is a utility-focused health tracking application where efficiency, clarity, and ease of daily use are paramount. The app requires clean data visualization, large touch targets for mobile interaction, and minimal friction for frequent logging actions.

**Key Design Principles**:
1. Mobile-first design with thumb-friendly touch targets
2. Immediate visual feedback for all actions
3. Data clarity over decoration
4. Quick access to primary action (logging water)
5. Progressive disclosure of advanced features

---

## Core Design Elements

### A. Typography

**Font Family**: Inter (Google Fonts) for excellent readability at all sizes

**Hierarchy**:
- **Display Numbers**: 3xl to 6xl, font-weight-bold for current progress display (e.g., "1,850 ml")
- **Headings**: text-xl to 2xl, font-weight-semibold for section headers
- **Body Text**: text-base, font-weight-normal for labels and descriptions  
- **Small Text**: text-sm, font-weight-medium for secondary info (dates, percentages)
- **Button Text**: text-base to text-lg, font-weight-semibold for clear actions

---

### B. Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16**
- Tight spacing: p-2, gap-2 (within components)
- Standard spacing: p-4, gap-4, m-4 (between related elements)
- Section spacing: p-6, p-8 (component padding)
- Large spacing: p-12, p-16 (major section breaks)

**Container Strategy**:
- Main container: max-w-md mx-auto (optimized for mobile/tablet single-column)
- Full viewport sections for primary actions
- Consistent padding-x: px-4 on mobile, px-6 on larger screens

**Grid System**:
- Quick input buttons: grid-cols-2 gap-4 (two-column for large touch targets)
- History cards: Single column stack with full-width cards
- Stats overview: grid-cols-3 gap-2 for compact metric display

---

### C. Component Library

#### 1. **Primary Action Area** (Daily Progress Display)
- Circular progress indicator showing daily goal completion
- Large, centered display of current water intake vs goal (e.g., "1,850 / 3,000 ml")
- Percentage completion prominently displayed
- Positioned at top of screen for immediate visibility
- Use ring element with dynamic stroke based on completion percentage

#### 2. **Quick Input Buttons**
- Large, rounded touch-friendly buttons (min-height: h-16)
- Display preset volumes (150ml, 200ml, 450ml, 850ml, 1000ml)
- Grid layout: 2 columns on mobile for easy thumb reach
- Include both volume and visual water glass icon
- Active state with scale animation for tactile feedback

#### 3. **Manual Input Field**
- Numeric input with large, clear text
- Positioned near quick buttons for alternative entry
- Include "Add" CTA button directly adjacent
- Use number input type for mobile numeric keyboard

#### 4. **Today's Log**
- Timeline-style list showing each water entry with timestamp
- Entry cards displaying: time, amount, delete/edit option
- Collapse/expand for space efficiency
- Running total displayed at bottom

#### 5. **Graph Visualization**
- Clean bar chart or line graph for 7-day or 30-day history
- X-axis: Date labels (Mon, Tue, Wed or specific dates)
- Y-axis: Volume in ml with clear gridlines
- Goal line as horizontal reference
- Interactive tooltips on hover/tap showing exact values
- Use SVG for crisp rendering on all screens

#### 6. **Settings Panel**
- Daily goal input (numeric, editable)
- Preset volume customization (add/remove/edit preset amounts)
- Future: Height/weight inputs with automatic calculation toggle
- Save button with clear confirmation feedback

#### 7. **Navigation**
- Bottom navigation bar (sticky) with 3-4 main sections:
  - Home/Today (primary)
  - History/Stats
  - Settings
- Active state clearly indicated
- Icon + label for clarity

#### 8. **PWA Install Prompt** (if not installed)
- Subtle banner or card suggesting installation
- Dismissible but reappears periodically
- Clear benefit messaging ("Access instantly from your home screen")

---

### D. Animations & Interactions

**Minimal, purposeful animations only**:
- Progress ring fills smoothly when water is added (300ms transition)
- Button press: subtle scale transform (0.95) on active state
- Success feedback: brief checkmark animation after logging
- Graph bars animate in on first load (stagger effect, 200ms per bar)
- Page transitions: simple fade (150ms) between navigation sections

**No hover effects on mobile** - focus on touch states (active, pressed)

---

## Images

**Image Usage**: Minimal decorative imagery

**Icon Library**: Heroicons (via CDN) for:
- Water droplet icons for branding and empty states
- Plus/minus icons for input controls
- Chart/graph icons for navigation
- Settings gear icon
- Checkmark for success states

**Illustrations**: Optional small illustration for empty state ("No water logged today - start tracking!")

**No hero images** - this is a utility app focused on function over marketing appeal

---

## Accessibility & Performance

- Minimum touch target size: 44x44px (iOS guideline)
- High contrast ratios for all text (WCAG AA minimum)
- Clear focus states for keyboard navigation
- Screen reader labels for all interactive elements
- Offline functionality: Display cached data when offline with clear indicator
- Progressive enhancement: Core logging works even if JavaScript fails initially

---

## Mobile-First Considerations

- Large numerical input for easy tapping
- Swipe gestures for deleting history entries
- Pull-to-refresh for updating stats
- Native-feeling transitions and animations
- Bottom navigation for thumb reachability
- Avoid top-heavy layouts - keep actions within easy reach