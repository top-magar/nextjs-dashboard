# Navigation Architecture - Multi-Tenant SaaS E-commerce Platform

## Executive Summary

This document outlines the complete navigation architecture for a multi-tenant SaaS e-commerce platform targeting SMBs. The system supports three distinct user contexts: Platform Admin, Merchant/Vendor Dashboard, and Customer-Facing Store.

**Project Context:**
- **Current State**: Next.js tutorial-based dashboard with invoices/customers
- **Target State**: Full multi-vendor digital marketplace (Nepal-focused, global expansion)
- **Timeline**: 60-day MVP
- **Tech Stack**: Next.js 15 (App Router), shadcn/ui, Tailwind CSS, NextAuth.js, Vercel Postgres

---

## 1. Information Architecture

### 1.1 User Roles & Contexts

| Role | Context | Primary Goals | Navigation Needs |
|------|---------|---------------|------------------|
| **Platform Admin** | Super-admin console | Manage vendors, oversee marketplace, configure platform | Dense dashboard, data tables, system settings |
| **Merchant/Vendor** | Vendor dashboard | Manage products, fulfill orders, view analytics | Task-oriented, quick actions, mobile-friendly |
| **Store Owner** | Store editor | Customize store appearance, manage pages | Visual tools, drag-drop, preview/publish |
| **Customer/Buyer** | Public storefront | Browse products, make purchases, track orders | Clean, minimal, conversion-focused |

### 1.2 Navigation Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    PLATFORM LEVEL                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Admin Portal │  │ Vendor Portal│  │ Public Store │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
         │                   │                   │
         ▼                   ▼                   ▼
    ┌────────┐         ┌────────┐         ┌────────┐
    │ System │         │Products│         │ Browse │
    │Vendors │         │ Orders │         │  Cart  │
    │Reports │         │Analytics│        │Checkout│
    │Settings│         │ Store  │         │Account │
    └────────┘         └────────┘         └────────┘
```

---

## 2. Navigation Patterns by Context

### 2.1 Vendor Dashboard Navigation

**Pattern**: Sidebar + Top Header (Desktop) | Bottom Tab Bar (Mobile)

**Primary Navigation Items** (6-8 max):
1. **Dashboard** - Overview, KPIs, recent activity
2. **Products** - Manage digital products, inventory
3. **Orders** - Order management, fulfillment
4. **Customers** - Customer list, segments
5. **Analytics** - Sales reports, traffic, insights
6. **Store** - Store customization, branding
7. **Settings** - Account, billing, integrations

**Secondary Navigation** (Top Header):
- Search/Command Palette (⌘K)
- Notifications (bell icon with badge)
- Store Switcher (multi-store support)
- Theme Toggle (dark/light mode)
- User Menu (account, billing, logout)

**Information Hierarchy**:
```
Primary (Sidebar)
├── Dashboard (always visible)
├── Products
│   ├── All Products
│   ├── Add New
│   ├── Categories
│   └── Collections
├── Orders
│   ├── All Orders
│   ├── Pending
│   └── Fulfilled
├── Customers
├── Analytics
│   ├── Overview
│   ├── Sales
│   └── Traffic
├── Store
│   ├── Appearance
│   ├── Pages
│   └── Navigation
└── Settings
    ├── General
    ├── Billing
    ├── Integrations
    └── Team
```

### 2.2 Store Editor Navigation

**Pattern**: Dual Sidebar (Left: Pages, Right: Properties) + Top Toolbar

**Top Toolbar**:
- Undo/Redo
- Device Preview (Desktop/Tablet/Mobile)
- Save Draft
- Preview
- Publish
- Exit Editor (back to dashboard)

**Left Sidebar**:
- Pages list (Homepage, Products, Collections, Custom)
- Add Page
- Page settings

**Right Sidebar** (Context-sensitive):
- Element properties (when element selected)
- Design settings (theme, colors, fonts)
- SEO settings

**Canvas Area**:
- Visual editor with drag-drop
- Element library (blocks, components)
- Context menu (right-click actions)

### 2.3 Customer-Facing Store Navigation

**Pattern**: Horizontal Header + Footer

**Header Navigation**:
- Logo/Brand
- Main Menu (Products, Collections, About, Contact)
- Search Bar
- Account Icon (Login/My Account)
- Cart Icon (with item count badge)

**Footer Navigation**:
- About Us, Contact, Returns, Shipping
- Social media links
- Newsletter signup
- Payment methods
- Legal (Terms, Privacy)

**Breadcrumb Navigation**:
- Home > Collection > Product
- Clear path back to parent pages

### 2.4 Admin Portal Navigation

**Pattern**: Sidebar + Top Header (similar to vendor, different theme)

**Primary Navigation**:
1. **Dashboard** - Platform overview, metrics
2. **Vendors** - Vendor management, approvals
3. **Users** - User management, roles
4. **Transactions** - Payment oversight, refunds
5. **Content** - CMS, banners, announcements
6. **Reports** - Platform-wide analytics
7. **Settings** - Platform configuration

---

## 3. Component Specifications

### 3.1 Sidebar Component

**Visual Design**:
- Width: 280px (expanded), 64px (collapsed)
- Background: `hsl(var(--sidebar-background))`
- Border: 1px solid `hsl(var(--sidebar-border))`
- Collapsible via trigger button
- Smooth transition (200ms ease)

**Sections**:
1. **Header** (72px height)
   - Store/Org Switcher
   - Logo (when expanded)
   - Icon only (when collapsed)

2. **Content** (flex-grow)
   - Navigation menu items
   - Nested sub-menus (collapsible)
   - Active state highlighting
   - Badge indicators (counts, alerts)

3. **Footer** (auto height)
   - User profile
   - Quick settings
   - Collapse trigger

**Interactive States**:
- **Default**: `text-muted-foreground`
- **Hover**: `bg-sidebar-accent text-sidebar-accent-foreground`
- **Active**: `bg-sidebar-accent text-foreground font-semibold`
- **Focus**: `ring-2 ring-sidebar-ring`

**Accessibility**:
- Keyboard navigation (Tab, Arrow keys, Enter)
- ARIA labels for collapsed state
- Skip navigation link
- Focus trap when mobile menu open

### 3.2 Top Header Component

**Visual Design**:
- Height: 64px
- Background: `bg-sidebar` with shadow
- Sticky positioning
- Responsive padding

**Layout** (flex justify-between):
- **Left**: Sidebar trigger + Breadcrumb (optional)
- **Right**: Search + Notifications + Theme + User Menu

**Components**:
1. **Search/Command Palette**
   - Trigger: Search icon or ⌘K
   - Modal overlay with fuzzy search
   - Quick actions (Create Product, New Order)
   - Recent pages
   - Keyboard shortcuts

2. **Notifications Popover**
   - Bell icon with badge count
   - Dropdown list (max 5 recent)
   - "View All" link
   - Mark as read action

3. **User Menu**
   - Avatar with dropdown
   - User info (name, email)
   - Account settings
   - Billing
   - Logout

### 3.3 Mobile Navigation

**Pattern**: Bottom Tab Bar (iOS/Android style)

**Visual Design**:
- Height: 64px (with safe-area-inset-bottom)
- Fixed position bottom
- Background: `bg-background` with top border
- 4-5 primary tabs

**Tab Items**:
1. Dashboard (Home icon)
2. Products (Package icon)
3. Orders (ShoppingBag icon)
4. Search (Search icon)
5. Account (User icon with dropdown)

**Interaction**:
- Active tab: `text-primary` with indicator
- Inactive: `text-muted-foreground`
- Tap target: 48px minimum
- Haptic feedback on tap (iOS)

**Account Tab** (Special):
- Opens bottom sheet (drawer)
- User info + menu items
- Upgrade CTA
- Logout

### 3.4 Breadcrumb Component

**Usage**: Dashboard pages, Store pages

**Visual Design**:
- Text: `text-sm text-muted-foreground`
- Separator: `/` or `>` icon
- Current page: `text-foreground font-medium`

**Example**:
```
Dashboard / Products / Edit Product
```

**Accessibility**:
- `<nav aria-label="Breadcrumb">`
- `aria-current="page"` on last item

---

## 4. User Flows

### 4.1 New Merchant Onboarding

```
1. Sign Up → 2. Email Verification → 3. Store Setup Wizard
   ↓
4. Dashboard (Simplified Navigation)
   - Add Your First Product (CTA)
   - Customize Your Store (CTA)
   - Invite Team Members (CTA)
   ↓
5. Progressive Disclosure
   - Show basic nav items initially
   - Unlock advanced features as they progress
```

**Navigation State**: Simplified sidebar with tooltips/guides

### 4.2 Experienced Merchant Workflow

```
Dashboard → Quick Actions (⌘K)
   ├── Create Product (⌘N)
   ├── View Orders (⌘O)
   ├── Analytics (⌘A)
   └── Store Settings (⌘,)
```

**Navigation State**: Full sidebar, keyboard shortcuts enabled

### 4.3 Context Switching (Dashboard ↔ Editor)

```
Dashboard → Store Settings → "Edit Store" Button
   ↓
Store Editor (Full Screen)
   - Top toolbar with "Exit" button
   - Unsaved changes warning
   ↓
Preview Mode (Overlay)
   - "Back to Editor" button
   - "Publish" button
   ↓
Back to Dashboard (with success toast)
```

**Navigation State**: Editor has isolated navigation, clear exit path

### 4.4 Customer Purchase Flow

```
Store Homepage → Browse Products → Product Detail
   ↓
Add to Cart → Cart Page → Checkout
   ↓
Payment (Khalti/eSewa/FonePay) → Order Confirmation
   ↓
Download Page (with secure link)
```

**Navigation State**: Minimal header, cart icon always visible, breadcrumbs for context

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Navigation Pattern |
|------------|-------|-------------------|
| Mobile | < 768px | Bottom tab bar + Hamburger menu |
| Tablet | 768px - 1024px | Collapsible sidebar + Top header |
| Desktop | > 1024px | Expanded sidebar + Top header |
| Large Desktop | > 1440px | Expanded sidebar + Top header (wider content) |

**Responsive Behaviors**:
- **Mobile**: Sidebar hidden, bottom tabs visible, hamburger for secondary nav
- **Tablet**: Sidebar collapsed by default, expandable on tap
- **Desktop**: Sidebar expanded by default, user can collapse

---

## 6. Accessibility Checklist

### WCAG 2.1 AA Compliance

- [ ] **Keyboard Navigation**
  - [ ] All interactive elements focusable
  - [ ] Logical tab order
  - [ ] Visible focus indicators
  - [ ] Keyboard shortcuts documented

- [ ] **Screen Reader Support**
  - [ ] Semantic HTML (`<nav>`, `<button>`, `<a>`)
  - [ ] ARIA labels for icons
  - [ ] ARIA live regions for notifications
  - [ ] Skip navigation link

- [ ] **Color Contrast**
  - [ ] Text: 4.5:1 minimum
  - [ ] Interactive elements: 3:1 minimum
  - [ ] Focus indicators: 3:1 minimum

- [ ] **Touch Targets**
  - [ ] Minimum 44x44px (iOS), 48x48px (Android)
  - [ ] Adequate spacing between targets

- [ ] **Motion & Animation**
  - [ ] Respect `prefers-reduced-motion`
  - [ ] No auto-playing animations
  - [ ] Smooth transitions (200-300ms)

- [ ] **Responsive Design**
  - [ ] Zoom up to 200% without horizontal scroll
  - [ ] Text reflow at different sizes
  - [ ] No loss of functionality on mobile

---

## 7. Performance Optimization

### Navigation Performance Targets

- **Initial Load**: < 1s (navigation visible)
- **Route Transition**: < 200ms (instant feel)
- **Search/Command Palette**: < 100ms (keystroke to result)
- **Mobile Menu Open**: < 150ms (smooth animation)

### Optimization Strategies

1. **Code Splitting**
   - Lazy load secondary nav items
   - Dynamic imports for heavy components (charts, tables)

2. **Prefetching**
   - Prefetch likely next pages on hover
   - Preload critical routes on mount

3. **Caching**
   - Cache navigation state in localStorage
   - Cache user preferences (collapsed state, theme)

4. **Bundle Size**
   - Tree-shake unused icons
   - Use dynamic imports for large dependencies

---

## 8. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Define TypeScript types for navigation
- [ ] Create base layout components
- [ ] Implement role-based routing middleware
- [ ] Set up navigation context/state management

### Phase 2: Vendor Dashboard (Week 3-4)
- [ ] Build sidebar navigation component
- [ ] Implement top header with search/notifications
- [ ] Create mobile bottom tab bar
- [ ] Add keyboard shortcuts (⌘K command palette)

### Phase 3: Store Editor (Week 5-6)
- [ ] Design editor layout (dual sidebar + toolbar)
- [ ] Implement preview mode navigation
- [ ] Add unsaved changes warning
- [ ] Create exit flow back to dashboard

### Phase 4: Customer Store (Week 7)
- [ ] Build public store header/footer
- [ ] Implement breadcrumb navigation
- [ ] Add mobile hamburger menu
- [ ] Create cart/checkout navigation flow

### Phase 5: Admin Portal (Week 8)
- [ ] Adapt vendor dashboard for admin context
- [ ] Apply admin theme (different colors)
- [ ] Add admin-specific nav items
- [ ] Implement vendor impersonation feature

### Phase 6: Polish & Testing (Week 9-10)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] User testing with merchants

---

## 9. Design Tokens (Tailwind CSS)

### Navigation-Specific Variables

```css
:root {
  /* Sidebar */
  --sidebar-background: 0 0% 98.5%;
  --sidebar-foreground: 0 0% 14.5%;
  --sidebar-primary: 0 0% 20.5%;
  --sidebar-primary-foreground: 0 0% 98.5%;
  --sidebar-accent: 0 0% 97%;
  --sidebar-accent-foreground: 0 0% 20.5%;
  --sidebar-border: 0 0% 92.2%;
  --sidebar-ring: 0 0% 70.8%;
  
  /* Navigation */
  --nav-height: 64px;
  --sidebar-width: 280px;
  --sidebar-width-collapsed: 64px;
  --mobile-nav-height: 64px;
}

.dark {
  --sidebar-background: 0 0% 20.5%;
  --sidebar-foreground: 0 0% 98.5%;
  --sidebar-primary: 220 70% 50%;
  --sidebar-primary-foreground: 0 0% 98.5%;
  --sidebar-accent: 0 0% 26.9%;
  --sidebar-accent-foreground: 0 0% 98.5%;
  --sidebar-border: 0 0% 26.9%;
  --sidebar-ring: 0 0% 55.6%;
}

/* Admin Theme Override */
.admin-portal {
  --sidebar-primary: 220 70% 50%; /* Blue */
  --primary: 220 70% 50%;
}

/* Vendor Theme */
.vendor-portal {
  --sidebar-primary: 142 76% 36%; /* Green */
  --primary: 142 76% 36%;
}
```

---

## 10. Next Steps

### Immediate Actions (This Week)

1. **Review & Approve Architecture**
   - Stakeholder review of this document
   - Gather feedback from development team
   - Finalize navigation structure

2. **Set Up Development Environment**
   - Create feature branch: `feature/navigation-system`
   - Set up Storybook for component development
   - Configure testing environment

3. **Begin Implementation**
   - Start with Phase 1 (Foundation)
   - Create TypeScript types
   - Build base layout components

### Success Metrics

- **Developer Experience**: Components reusable across contexts
- **User Experience**: < 2 clicks to reach any feature
- **Performance**: < 200ms route transitions
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile**: 100% feature parity with desktop

---

## Appendix A: Keyboard Shortcuts

| Shortcut | Action | Context |
|----------|--------|---------|
| ⌘K / Ctrl+K | Open command palette | Global |
| ⌘N / Ctrl+N | Create new product | Dashboard |
| ⌘O / Ctrl+O | View orders | Dashboard |
| ⌘A / Ctrl+A | View analytics | Dashboard |
| ⌘, / Ctrl+, | Open settings | Global |
| ⌘S / Ctrl+S | Save changes | Editor |
| ⌘P / Ctrl+P | Preview store | Editor |
| ⌘Shift+P | Publish store | Editor |
| Esc | Close modal/menu | Global |
| / | Focus search | Global |

---

## Appendix B: Component Dependencies

```
Navigation System
├── @radix-ui/react-navigation-menu
├── @radix-ui/react-dropdown-menu
├── @radix-ui/react-dialog (for command palette)
├── @radix-ui/react-popover (for notifications)
├── cmdk (command palette)
├── lucide-react (icons)
├── framer-motion (animations)
└── next-themes (theme switching)
```

All dependencies already installed in current project.

---

**Document Version**: 1.0  
**Last Updated**: December 5, 2025  
**Author**: AI Technical Architect  
**Status**: Ready for Implementation
