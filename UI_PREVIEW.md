# 🎨 Dashboard UI Preview

## Visual Design Overview

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│  ╔═══════════════════════════════════════════════════════════════════╗  │
│  ║  🏦  Merchant Dashboard          Last Updated: 14:30:25    ⟳     ║  │
│  ║  Good Afternoon, Monitor your merchant performance                ║  │
│  ╚═══════════════════════════════════════════════════════════════════╝  │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  📊 Selected Merchants                                           │    │
│  │                                                                  │    │
│  │  🔵 0000-0000-0001  ×    🟣 0000-0000-0002  ×                   │    │
│  │  🟢 0000-0000-0003  ×    ➕ Add Merchant     Clear All           │    │
│  │                                                                  │    │
│  │  [ Load Summary ]                                                │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                           │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌────────────────┐  │
│  │ 💰 Today's Trans    │  │ 📅 This Week        │  │ 📈 This Month  │  │
│  │                     │  │                     │  │                │  │
│  │  Rp 77,803,622     │  │  Rp 584,236,342    │  │  Rp 2.5 Billion│  │
│  │                     │  │                     │  │                │  │
│  │  📊 ▲ 12.5%        │  │  📊 ▲ 8.3%         │  │  📊 ▲ 15.7%   │  │
│  └─────────────────────┘  └─────────────────────┘  └────────────────┘  │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  📊 Transaction Overview                                         │    │
│  │                                                                  │    │
│  │     2.5B ┤                                              ███     │    │
│  │          │                                              ███     │    │
│  │     2.0B ┤                                              ███     │    │
│  │          │                            ███               ███     │    │
│  │     1.5B ┤                            ███               ███     │    │
│  │          │                            ███               ███     │    │
│  │     1.0B ┤           ███              ███               ███     │    │
│  │          │           ███              ███               ███     │    │
│  │     0.5B ┤           ███              ███               ███     │    │
│  │          │           ███              ███               ███     │    │
│  │       0  └───────────███──────────────███───────────────███────│    │
│  │                     Today            Weekly            Monthly   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  ℹ️  Summary Information                                          │    │
│  │  Data for 3 merchants                                            │    │
│  │  Current Date: 17 December 2025                                  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                           │
│              Merchant Summary Dashboard © 2025 - Powered by Couchbase    │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Primary Colors
```
🔵 Blue (#3B82F6)      - Primary actions, links
🟣 Indigo (#6366F1)    - Secondary elements
🟢 Emerald (#10B981)   - Success, positive metrics
🔴 Red (#EF4444)       - Errors, negative metrics
🟡 Amber (#F59E0B)     - Warnings
```

### Gradients
```
Header:      Blue → Indigo
Stat Card 1: Blue → Cyan
Stat Card 2: Indigo → Purple  
Stat Card 3: Purple → Pink
Background:  Slate → Blue → Indigo (subtle)
```

### Effects
```
✨ Glass-morphism: backdrop-blur + transparency
💫 Smooth animations: Framer Motion
🎨 Gradient text: Blue → Indigo → Purple
🌟 Hover effects: Scale + Shadow
💎 Border shine: Gradient borders on hover
```

## Component Breakdown

### 1. Header
```
┌────────────────────────────────────────────────────┐
│ 🏦 Merchant Dashboard        [🕐 14:30]  [⟳]     │
│ Good Afternoon, Monitor your merchant performance  │
└────────────────────────────────────────────────────┘
```
- Glass-morphism panel
- Gradient icon background
- Live timestamp
- Animated refresh button

### 2. Merchant Selector
```
┌──────────────────────────────────────────────────┐
│ 📊 Selected Merchants                            │
│                                                  │
│ [🔵 0000-0000-0001 ×] [🟣 0000-0000-0002 ×]    │
│ [➕ Add Merchant]  [Clear All]                   │
│                                                  │
│ [Load Summary]                                   │
└──────────────────────────────────────────────────┘
```
- Animated merchant chips
- Color-coded by merchant
- Modal selector on click
- Scale animation on hover

### 3. Stat Cards
```
┌─────────────────────────┐
│ 💰 Icon                 │
│ Today's Transactions    │
│                         │
│ Rp 77,803,622          │ ← Animated counter
│                         │
│ 📊 ▲ 12.5%             │ ← Trend indicator
└─────────────────────────┘
```
- Gradient background
- Large icon watermark
- Number counting animation
- Trend with color indicator
- Hover: scale + shadow

### 4. Chart
```
┌────────────────────────────────────┐
│ 📊 Transaction Overview            │
│                                    │
│  [Interactive Bar Chart]           │
│  - Blue bar: Today                 │
│  - Indigo bar: Weekly              │
│  - Purple bar: Monthly             │
│                                    │
│  Hover: Tooltip with details       │
└────────────────────────────────────┘
```
- Recharts library
- Smooth animation
- Custom tooltip
- Responsive sizing

### 5. Info Panel
```
┌────────────────────────────────────┐
│ ℹ️  Summary Information             │
│ Data for 3 merchants               │
│ Current Date: 17 December 2025     │
└────────────────────────────────────┘
```
- Simple info display
- Date formatting
- Merchant count

## Responsive Design

### Desktop (≥1024px)
```
[Header                                    ]
[Merchant Selector                         ]
[Card 1]  [Card 2]  [Card 3]              ← 3 columns
[Chart                                     ]
[Info Panel                                ]
```

### Tablet (768px - 1023px)
```
[Header                        ]
[Merchant Selector             ]
[Card 1]  [Card 2]             ← 2 columns
[Card 3]                       
[Chart                         ]
[Info Panel                    ]
```

### Mobile (<768px)
```
[Header           ]
[Merchant Selector]
[Card 1]          ← 1 column
[Card 2]
[Card 3]
[Chart            ]
[Info Panel       ]
```

## Animations

### Page Load
```
1. Header: Fade in from top (0s)
2. Selector: Slide up (0.2s delay)
3. Card 1: Slide up (0.3s delay)
4. Card 2: Slide up (0.4s delay)
5. Card 3: Slide up (0.5s delay)
6. Chart: Scale in (0.6s delay)
7. Info: Fade in (0.7s delay)
```

### Interactions
```
Button Hover: Scale 1.05 + Shadow
Card Hover: Lift + Glow
Number Count: 0 → Final (1s duration)
Refresh: Rotate 360° (0.5s)
Chip Remove: Scale out (0.3s)
```

## State Variations

### Loading State
```
┌────────────────────────────┐
│  ⟳ Loading merchant data   │
│                            │
│  [Shimmer Card 1]          │
│  [Shimmer Card 2]          │
│  [Shimmer Card 3]          │
└────────────────────────────┘
```

### Error State
```
┌────────────────────────────┐
│  ⚠️  Oops! Something wrong  │
│  Unable to fetch data      │
│                            │
│  [Try Again]               │
└────────────────────────────┘
```

### Empty State
```
┌────────────────────────────┐
│  📊 No Merchants Selected   │
│  Please add merchants      │
│                            │
│  [➕ Add Merchant]          │
└────────────────────────────┘
```

## Typography

```
Heading 1: 3xl, Bold (36px)     → Dashboard Title
Heading 2: 2xl, Bold (24px)     → Section Titles
Heading 3: xl, Bold (20px)      → Card Titles
Body Large: lg, Medium (18px)   → Important text
Body: base, Regular (16px)      → Normal text
Small: sm, Regular (14px)       → Labels
Tiny: xs, Regular (12px)        → Timestamps
```

## Spacing System

```
xs:  8px    → Icon padding
sm:  16px   → Card padding
md:  24px   → Section spacing
lg:  32px   → Block spacing
xl:  48px   → Page margins
2xl: 64px   → Hero spacing
```

## Shadow Levels

```
sm:  Subtle hover        → 0 1px 2px rgba(0,0,0,0.05)
md:  Card default        → 0 4px 6px rgba(0,0,0,0.07)
lg:  Card hover          → 0 10px 15px rgba(0,0,0,0.1)
xl:  Modal/Dropdown      → 0 20px 25px rgba(0,0,0,0.15)
2xl: Feature highlight   → 0 25px 50px rgba(0,0,0,0.25)
```

## Border Radius

```
sm:  6px    → Small buttons
md:  8px    → Inputs
lg:  12px   → Cards
xl:  16px   → Stat cards
2xl: 24px   → Panels
full: 9999px → Chips, Pills
```

---

**The final UI is modern, professional, and distinctly banking-styled with:**
- ✨ Sophisticated glass effects
- 🎨 Beautiful gradient combinations  
- 💫 Smooth, professional animations
- 📱 Perfect responsive behavior
- 🎯 Clear information hierarchy
- 💎 Premium feel throughout
