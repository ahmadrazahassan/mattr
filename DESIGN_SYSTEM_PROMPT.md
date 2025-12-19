# Universal Website Design System Prompt
## For AI-Assisted Development (Cursor, Claude, GPT, etc.)

> **Created by:** Senior Full-Stack Developer & Design Systems Architect  
> **Purpose:** A comprehensive, reusable prompt template for building modern, production-ready websites with AI assistance  
> **Applicable to:** Any web project - SaaS, E-commerce, Portfolio, Marketing, Dashboard, etc.

---

## 🎯 How to Use This Prompt

Copy the relevant sections below and customize the bracketed `[VARIABLES]` for your specific project. This prompt is designed to guide AI assistants in creating consistent, modern, and maintainable web applications.

---

## 📋 Master Prompt Template

```
You are a senior full-stack developer and design systems architect working at a top-tier tech company. Build a modern, production-ready [PROJECT_TYPE] website with the following specifications:

## PROJECT OVERVIEW
- **Project Name:** [PROJECT_NAME]
- **Project Type:** [SaaS Platform / E-commerce / Portfolio / Marketing Site / Dashboard / Blog / etc.]
- **Target Audience:** [Developers / Designers / General Public / Enterprise / etc.]
- **Primary Goal:** [Generate leads / Sell products / Showcase work / Provide information / etc.]
- **Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, [Additional libraries]

## DESIGN PHILOSOPHY

### Core Principles
1. **Minimal & Clean** - Remove all unnecessary elements. Every component must serve a purpose.
2. **Modern & Timeless** - Inspired by [Stripe / Linear / Vercel / Apple / Airbnb] - clean, professional, not trendy.
3. **Performance First** - Optimize for speed. Lazy load images, code split, minimize bundle size.
4. **Accessibility** - WCAG AA compliant. Semantic HTML, proper ARIA labels, keyboard navigation.
5. **Responsive** - Mobile-first approach. Perfect on all devices from 320px to 4K displays.
6. **Consistent** - Maintain strict design system. No random spacing, colors, or font sizes.

### Design Restrictions
- ❌ **NO gradients** - Use flat colors only
- ❌ **NO sparkles, zap, or magic icons** - Use simple, meaningful icons
- ❌ **NO excessive animations** - Only purposeful, smooth transitions
- ❌ **NO stock photos** - Use illustrations, abstract shapes, or real product screenshots
- ❌ **NO cluttered layouts** - Generous whitespace, clear hierarchy

## COLOR SYSTEM

### Primary Palette
```css
--background: [#FAF8F5 / #FFFFFF / #F9FAFB]  /* Main background */
--foreground: [#1A1A1A / #000000 / #111827]  /* Primary text */
--accent: [#b45309 / #3B82F6 / #10B981]      /* Brand color - buttons, links, highlights */
--muted: [#6B6B6B / #9CA3AF / #64748B]       /* Secondary text, borders */
--card: [#FFFFFF / #F9FAFB / #FEFEFE]        /* Card backgrounds */
```

### Usage Rules
- **Background:** Page backgrounds, large sections
- **Foreground:** Body text, headings, icons
- **Accent:** CTAs, active states, important highlights (use sparingly - 5-10% of UI)
- **Muted:** Secondary text, subtle borders, disabled states
- **Card:** Elevated surfaces, cards, modals

### Opacity Scale
- `/5` = 5% opacity (subtle backgrounds)
- `/10` = 10% opacity (hover states)
- `/20` = 20% opacity (borders)
- `/40` = 40% opacity (secondary text)
- `/60` = 60% opacity (muted text)

## TYPOGRAPHY SYSTEM

### Font Families
```css
--font-sans: [DM Sans / Inter / Geist / SF Pro]     /* Primary - UI, body text */
--font-mono: [Geist Mono / JetBrains Mono / Fira Code]  /* Code, labels, technical */
--font-serif: [Source Serif 4 / Merriweather / Lora]    /* Editorial, quotes */
```

### Type Scale (Tailwind classes)
```
text-xs      → 12px  → Labels, captions, metadata
text-sm      → 14px  → Secondary text, form inputs
text-base    → 16px  → Body text (default)
text-lg      → 18px  → Emphasized body text
text-xl      → 20px  → Small headings, card titles
text-2xl     → 24px  → Section subheadings
text-3xl     → 30px  → Page subheadings
text-4xl     → 36px  → Page headings
text-5xl     → 48px  → Hero headings
text-6xl     → 60px  → Large hero headings
text-7xl     → 72px  → Extra large hero headings
text-8xl     → 96px  → Massive display text
```

### Font Weights
- `font-normal` (400) → Body text
- `font-medium` (500) → Emphasized text, labels
- `font-semibold` (600) → Subheadings, buttons
- `font-bold` (700) → Headings, important CTAs
- `font-black` (900) → Display text, hero headings

### Line Heights
- `leading-none` (1) → Large display text
- `leading-tight` (1.25) → Headings
- `leading-snug` (1.375) → Subheadings
- `leading-normal` (1.5) → Body text
- `leading-relaxed` (1.625) → Long-form content

### Letter Spacing
- `tracking-tighter` (-0.05em) → Large headings
- `tracking-tight` (-0.025em) → Headings
- `tracking-normal` (0) → Body text
- `tracking-wide` (0.025em) → Buttons, labels
- `tracking-wider` (0.05em) → Uppercase labels
- `tracking-widest` (0.1em) → Small caps, badges

## SPACING SYSTEM

### Base Unit: 8px (Tailwind's default)
```
0.5 → 2px   → Hairline borders
1   → 4px   → Tight spacing
2   → 8px   → Base unit
3   → 12px  → Small gaps
4   → 16px  → Standard gaps
5   → 20px  → Medium gaps
6   → 24px  → Large gaps
8   → 32px  → Section spacing
10  → 40px  → Large section spacing
12  → 48px  → Extra large spacing
16  → 64px  → Hero spacing
20  → 80px  → Massive spacing
24  → 96px  → Section dividers
32  → 128px → Page sections
```

### Component Spacing Rules
- **Buttons:** `h-10` (40px) or `h-12` (48px) or `h-14` (56px)
- **Input fields:** `h-10` (40px) or `h-12` (48px)
- **Cards:** `p-6` (24px) or `p-8` (32px) padding
- **Sections:** `py-16` (64px) or `py-24` (96px) or `py-32` (128px)
- **Container max-width:** `max-w-7xl` (1280px) or `max-w-[1600px]`

## COMPONENT PATTERNS

### Buttons
```tsx
// Primary CTA
<button className="h-12 px-6 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition-colors">
  Primary Action
</button>

// Secondary
<button className="h-12 px-6 bg-foreground/5 rounded-xl font-medium hover:bg-foreground/10 transition-colors">
  Secondary Action
</button>

// Outline
<button className="h-12 px-6 border border-foreground/10 rounded-xl font-medium hover:bg-foreground/5 transition-colors">
  Outline Action
</button>
```

### Cards
```tsx
<div className="bg-card rounded-2xl border border-foreground/10 p-6 shadow-sm hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

### Input Fields
```tsx
<input 
  className="w-full h-12 px-4 bg-foreground/5 border border-foreground/10 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
  placeholder="Enter text..."
/>
```

### Navigation
```tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
    {/* Logo and nav items */}
  </div>
</nav>
```

## LAYOUT PATTERNS

### Hero Section
```tsx
<section className="min-h-screen flex items-center pt-32 pb-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h1 className="text-6xl font-bold tracking-tight leading-tight mb-6">
          [Main Headline]
          <br />
          <span className="text-muted-foreground/30">[Secondary Text]</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          [Supporting description]
        </p>
        {/* CTAs */}
      </div>
      <div>{/* Visual/Image */}</div>
    </div>
  </div>
</section>
```

### Feature Grid
```tsx
<section className="py-32">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div key={feature.id} className="p-6 rounded-2xl bg-card border border-foreground/10">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Two-Column Content
```tsx
<section className="py-32">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>{/* Content */}</div>
      <div>{/* Visual */}</div>
    </div>
  </div>
</section>
```

## ANIMATION GUIDELINES

### Transitions
```css
/* Standard transition */
transition-all duration-300

/* Smooth transition */
transition-all duration-500

/* Color transitions */
transition-colors duration-300

/* Transform transitions */
transition-transform duration-500
```

### Hover Effects
```tsx
// Scale up
hover:scale-105 transition-transform

// Lift with shadow
hover:-translate-y-1 hover:shadow-xl transition-all

// Color change
hover:bg-accent/90 transition-colors

// Opacity
hover:opacity-80 transition-opacity
```

### Scroll Animations
```tsx
// Fade up
<div className="opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
  {/* Content */}
</div>
```

## RESPONSIVE DESIGN

### Breakpoints
```
sm:  640px  → Small tablets
md:  768px  → Tablets
lg:  1024px → Laptops
xl:  1280px → Desktops
2xl: 1536px → Large desktops
```

### Mobile-First Approach
```tsx
// Base styles for mobile, then override for larger screens
<div className="text-2xl lg:text-4xl">  {/* 24px on mobile, 36px on desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">  {/* Responsive grid */}
<div className="px-4 lg:px-8">  {/* Responsive padding */}
```

## ICON USAGE

### Recommended Icon Library
- **Lucide React** (preferred) - Clean, consistent, modern
- Size: `w-4 h-4` (16px) for inline, `w-5 h-5` (20px) for buttons, `w-6 h-6` (24px) for features

### Icon Guidelines
- Use simple, recognizable icons
- Avoid: sparkles, zap, magic wand (unless specifically needed)
- Prefer: arrows, check marks, x, menu, search, user, settings
- Always include proper aria-labels for accessibility

## ACCESSIBILITY REQUIREMENTS

### Semantic HTML
```tsx
<header>  // Site header
<nav>     // Navigation
<main>    // Main content
<section> // Content sections
<article> // Independent content
<aside>   // Sidebar content
<footer>  // Site footer
```

### ARIA Labels
```tsx
<button aria-label="Close menu">
  <X className="w-5 h-5" />
</button>

<input aria-label="Search" placeholder="Search..." />
```

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus states: `focus:outline-none focus:ring-2 focus:ring-accent`
- Logical tab order

### Color Contrast
- Text on background: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Use tools like WebAIM Contrast Checker

## PERFORMANCE OPTIMIZATION

### Image Optimization
```tsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="object-cover"
  loading="lazy"  // Lazy load below fold
  priority  // Priority load above fold
/>
```

### Code Splitting
```tsx
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />
})
```

### Font Loading
```tsx
// In layout.tsx
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  display: 'swap',  // Prevent FOIT
  variable: '--font-sans'
})
```

## FILE STRUCTURE

```
project/
├── app/
│   ├── (marketing)/        # Marketing pages group
│   │   ├── page.tsx        # Home
│   │   ├── about/
│   │   ├── pricing/
│   │   └── contact/
│   ├── (app)/              # Application pages group
│   │   ├── dashboard/
│   │   └── settings/
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── sections/           # Page sections
│   └── layout/             # Layout components
├── lib/
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Constants
└── public/                 # Static assets
```

## COMPONENT NAMING CONVENTIONS

### Files
- PascalCase for components: `Button.tsx`, `HeroSection.tsx`
- kebab-case for utilities: `format-date.ts`, `api-client.ts`

### CSS Classes
- Use Tailwind utility classes
- Custom classes in kebab-case: `custom-scrollbar`, `gradient-text`

### Variables
- camelCase for variables: `isLoading`, `userData`
- UPPER_SNAKE_CASE for constants: `API_URL`, `MAX_FILE_SIZE`

## TESTING CHECKLIST

Before considering the project complete, verify:

- [ ] All pages load without errors
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1440px)
- [ ] All links and buttons work
- [ ] Forms validate properly
- [ ] Images load and are optimized
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] No console errors or warnings
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Fast page transitions
- [ ] Proper meta tags and SEO

## DEPLOYMENT CHECKLIST

- [ ] Environment variables configured
- [ ] Build succeeds without errors (`npm run build`)
- [ ] All images optimized
- [ ] Analytics integrated
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Favicon and app icons added
- [ ] Social media preview images (OG tags)
- [ ] SSL certificate active
- [ ] CDN configured
- [ ] Performance monitoring active

---

## 🎨 CUSTOMIZATION GUIDE

### For Different Project Types

#### SaaS Platform
- Focus on: Dashboard, feature pages, pricing, documentation
- Key sections: Hero with product demo, feature comparison, testimonials, pricing table
- Style: Clean, professional, trust-building

#### E-commerce
- Focus on: Product listings, product details, cart, checkout
- Key sections: Hero with featured products, category grid, product cards, reviews
- Style: Visual, product-focused, conversion-optimized

#### Portfolio
- Focus on: Work showcase, about, contact
- Key sections: Hero with introduction, project grid, case studies, contact form
- Style: Creative, personality-driven, visual storytelling

#### Marketing Site
- Focus on: Landing pages, lead generation, content
- Key sections: Hero with value prop, features, social proof, CTA sections
- Style: Persuasive, benefit-focused, conversion-optimized

#### Dashboard/App
- Focus on: Data visualization, forms, tables, navigation
- Key sections: Sidebar nav, data cards, charts, tables, modals
- Style: Functional, data-dense, efficient

---

## 💡 BEST PRACTICES

1. **Start with Content** - Design around actual content, not lorem ipsum
2. **Mobile First** - Design for mobile, enhance for desktop
3. **Consistency** - Use design system strictly, no one-off styles
4. **Performance** - Every component should be optimized
5. **Accessibility** - Build for everyone from the start
6. **Simplicity** - When in doubt, remove elements
7. **User Testing** - Test with real users early and often
8. **Iterate** - Ship fast, improve continuously

---

## 🚀 IMPLEMENTATION INSTRUCTIONS

When using this prompt with AI assistants:

1. **Copy relevant sections** - Don't send the entire prompt, select what you need
2. **Customize variables** - Replace all [BRACKETED_VALUES] with your specifics
3. **Be specific** - Add project-specific requirements
4. **Iterate** - Start with structure, then refine details
5. **Review output** - AI is a tool, you're the architect
6. **Maintain consistency** - Reference this document for all pages

---

**Remember:** Great design is invisible. The best websites don't call attention to their design—they make the content and functionality shine. Build with purpose, ship with confidence.
```

---

## Example Usage

```
You are a senior full-stack developer and design systems architect working at a top-tier tech company. Build a modern, production-ready SaaS Platform website with the following specifications:

## PROJECT OVERVIEW
- **Project Name:** TaskFlow
- **Project Type:** SaaS Platform (Project Management Tool)
- **Target Audience:** Small to medium-sized teams, startups, agencies
- **Primary Goal:** Convert visitors to trial users, showcase features
- **Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion

[Continue with relevant sections from the template above...]
```

This prompt template ensures consistent, high-quality output across any web project while maintaining flexibility for specific requirements.
