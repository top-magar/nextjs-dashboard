# Quick Start Guide
## Multi-Tenant SaaS E-commerce Platform - Navigation Implementation

**For**: Development Team  
**Timeline**: Week 1-2 (Navigation System)  
**Prerequisites**: Node.js 18+, pnpm, Git

---

## 📋 Overview

This guide will walk you through implementing the navigation system for the multi-tenant SaaS e-commerce platform. This is Phase 1 of the MVP roadmap and should take 1-2 weeks to complete.

---

## 🎯 Goals

By the end of this phase, you will have:
- ✅ Unified navigation system (sidebar, header, mobile nav)
- ✅ Role-based access control
- ✅ Command palette (⌘K)
- ✅ Multi-tenant database foundation
- ✅ Clean, maintainable codebase

---

## 📁 Project Structure

```
src/
├── types/
│   └── navigation.ts           # TypeScript types
├── config/
│   └── navigation.ts           # Navigation configs
├── contexts/
│   └── navigation-context.tsx  # State management
├── components/
│   └── navigation/
│       ├── sidebar.tsx         # Main sidebar
│       ├── header.tsx          # Top header
│       ├── mobile-nav.tsx      # Bottom tabs
│       └── command-palette.tsx # ⌘K search
├── app/
│   ├── dashboard/
│   │   └── layout.tsx          # Updated layout
│   └── admin/
│       └── layout.tsx          # Admin layout
└── middleware.ts               # Role-based routing
```

---

## 🚀 Step-by-Step Implementation

### Day 1: Setup & Types

#### 1. Clean Up Existing Code

Remove old navigation components:

```bash
# Delete old navigation files
rm src/components/dashboard/sidenav.tsx
rm src/components/dashboard/nav-links.tsx

# Keep these (we'll update them):
# - src/components/dashboard/mobile-nav.tsx
# - src/components/sidebar/app-sidebar.tsx
```

#### 2. Create Type Definitions

Create `src/types/navigation.ts`:

```typescript
export type UserRole = 'admin' | 'vendor' | 'customer';

export type NavItem = {
  id: string;
  title: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
  external?: boolean;
  roles?: UserRole[];
};

export type NavGroup = {
  id: string;
  title?: string;
  items: NavItem[];
  roles?: UserRole[];
};

export type NavItemWithSub = NavItem & {
  items?: NavItem[];
};

export type NavigationConfig = {
  mainNav: NavItemWithSub[];
  sidebarNav: NavGroup[];
  mobileNav: NavItem[];
};
```

#### 3. Create Navigation Config

Create `src/config/navigation.ts`:

```typescript
import { Home, Package, ShoppingCart, Users, BarChart3, Store, Settings } from 'lucide-react';
import type { NavigationConfig } from '@/types/navigation';

export const vendorNavigation: NavigationConfig = {
  mainNav: [],
  sidebarNav: [
    {
      id: 'main',
      items: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          href: '/dashboard',
          icon: <Home className="size-4" />,
          roles: ['vendor'],
        },
        {
          id: 'products',
          title: 'Products',
          href: '/dashboard/products',
          icon: <Package className="size-4" />,
          roles: ['vendor'],
          items: [
            { id: 'all-products', title: 'All Products', href: '/dashboard/products' },
            { id: 'add-product', title: 'Add New', href: '/dashboard/products/create' },
            { id: 'categories', title: 'Categories', href: '/dashboard/products/categories' },
          ],
        },
        {
          id: 'orders',
          title: 'Orders',
          href: '/dashboard/orders',
          icon: <ShoppingCart className="size-4" />,
          roles: ['vendor'],
        },
        {
          id: 'customers',
          title: 'Customers',
          href: '/dashboard/customers',
          icon: <Users className="size-4" />,
          roles: ['vendor'],
        },
        {
          id: 'analytics',
          title: 'Analytics',
          href: '/dashboard/analytics',
          icon: <BarChart3 className="size-4" />,
          roles: ['vendor'],
        },
      ],
    },
    {
      id: 'store',
      title: 'Store',
      items: [
        {
          id: 'store-settings',
          title: 'Store Settings',
          href: '/dashboard/store',
          icon: <Store className="size-4" />,
          roles: ['vendor'],
        },
        {
          id: 'settings',
          title: 'Settings',
          href: '/dashboard/settings',
          icon: <Settings className="size-4" />,
          roles: ['vendor'],
        },
      ],
    },
  ],
  mobileNav: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="size-4" />,
    },
    {
      id: 'products',
      title: 'Products',
      href: '/dashboard/products',
      icon: <Package className="size-4" />,
    },
    {
      id: 'orders',
      title: 'Orders',
      href: '/dashboard/orders',
      icon: <ShoppingCart className="size-4" />,
    },
  ],
};
```

**✅ Checkpoint**: Types and config created

---

### Day 2: Navigation Context

Create `src/contexts/navigation-context.tsx`:

```typescript
'use client';

import { createContext, useContext, useState, useCallback } from 'react';

type NavigationContextType = {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const collapseSidebar = useCallback(() => {
    setIsSidebarCollapsed(true);
  }, []);

  const expandSidebar = useCallback(() => {
    setIsSidebarCollapsed(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        isSidebarCollapsed,
        toggleSidebar,
        collapseSidebar,
        expandSidebar,
        isMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
```

**✅ Checkpoint**: Navigation context created

---

### Day 3-4: Build Components

#### 1. Enhanced Sidebar

Create `src/components/navigation/sidebar.tsx` - See `IMPLEMENTATION_PLAN.md` for full code.

Key features:
- Collapsible sidebar
- Nested menu items
- Active state highlighting
- Badge indicators
- Tooltips when collapsed

#### 2. Top Header

Create `src/components/navigation/header.tsx` - See `IMPLEMENTATION_PLAN.md` for full code.

Key features:
- Sidebar trigger
- Search bar
- Notifications
- Theme toggle
- User menu

#### 3. Mobile Navigation

Create `src/components/navigation/mobile-nav.tsx` - See `IMPLEMENTATION_PLAN.md` for full code.

Key features:
- Bottom tab bar
- Active state
- Badge indicators
- Touch-friendly (48px targets)

**✅ Checkpoint**: Core components built

---

### Day 5: Command Palette

Create `src/components/navigation/command-palette.tsx`:

```typescript
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Home, Package, ShoppingCart, Users, Settings } from 'lucide-react';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard/products/create'))}
          >
            <Package className="mr-2 h-4 w-4" />
            <span>Create Product</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard/orders'))}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>View Orders</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/products'))}>
            <Package className="mr-2 h-4 w-4" />
            <span>Products</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/customers'))}>
            <Users className="mr-2 h-4 w-4" />
            <span>Customers</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/settings'))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
```

**✅ Checkpoint**: Command palette working (⌘K)

---

### Day 6-7: Integration

#### 1. Update Dashboard Layout

Update `src/app/dashboard/layout.tsx`:

```typescript
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { NavSidebar } from '@/components/navigation/sidebar';
import { Header } from '@/components/navigation/header';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { CommandPalette } from '@/components/navigation/command-palette';
import { StoreSwitcher } from '@/components/sidebar/team-switcher';
import { vendorNavigation } from '@/config/navigation';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  const user = {
    name: session.user.name || 'User',
    email: session.user.email || '',
    avatar: session.user.image || '',
  };

  return (
    <SidebarProvider>
      <NavSidebar
        items={vendorNavigation.sidebarNav.flatMap(group => group.items)}
        header={<StoreSwitcher teams={[{ name: 'My Store', logo: () => null, plan: 'Pro' }]} />}
      />
      <SidebarInset>
        <Header user={user} />
        <main className="flex flex-1 flex-col gap-4 p-4 pb-20 md:pb-4">
          {children}
        </main>
        <MobileNav items={vendorNavigation.mobileNav} />
      </SidebarInset>
      <CommandPalette />
    </SidebarProvider>
  );
}
```

#### 2. Add Middleware (Role-Based Access)

Update `src/middleware.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ['/', '/login', '/sign-up', '/stores'];
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Require authentication
  if (!session?.user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Role-based access control
  const userRole = session.user.role || 'customer';

  // Admin routes
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Vendor routes
  if (pathname.startsWith('/dashboard') && !['vendor', 'admin'].includes(userRole)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

**✅ Checkpoint**: Navigation fully integrated

---

### Day 8-9: Testing

#### 1. Manual Testing Checklist

- [ ] **Desktop (> 1024px)**
  - [ ] Sidebar expands/collapses
  - [ ] All nav links work
  - [ ] Active states highlight correctly
  - [ ] Nested menus expand/collapse
  - [ ] Command palette opens with ⌘K
  - [ ] User menu works
  - [ ] Theme toggle works

- [ ] **Tablet (768-1024px)**
  - [ ] Sidebar starts collapsed
  - [ ] Can expand sidebar
  - [ ] All features work

- [ ] **Mobile (< 768px)**
  - [ ] Bottom tabs visible
  - [ ] Sidebar hidden
  - [ ] All tabs work
  - [ ] Touch targets adequate (48px)

- [ ] **Keyboard Navigation**
  - [ ] Tab through all items
  - [ ] Enter activates links
  - [ ] ⌘K opens command palette
  - [ ] Esc closes modals

- [ ] **Accessibility**
  - [ ] Screen reader announces navigation
  - [ ] Focus indicators visible
  - [ ] Color contrast sufficient
  - [ ] ARIA labels present

#### 2. Automated Tests (Optional)

Create `src/components/navigation/__tests__/sidebar.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { NavSidebar } from '../sidebar';

describe('NavSidebar', () => {
  it('renders navigation items', () => {
    const items = [
      { id: 'dashboard', title: 'Dashboard', href: '/dashboard' },
    ];
    
    render(<NavSidebar items={items} />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
```

**✅ Checkpoint**: Testing complete

---

### Day 10: Polish & Documentation

#### 1. Add Loading States

Update components to show loading skeletons while data loads.

#### 2. Add Error Boundaries

Wrap navigation in error boundaries to handle failures gracefully.

#### 3. Performance Optimization

- [ ] Lazy load command palette
- [ ] Memoize navigation items
- [ ] Optimize re-renders

#### 4. Documentation

- [ ] Add JSDoc comments to components
- [ ] Update README with navigation usage
- [ ] Document keyboard shortcuts

**✅ Checkpoint**: Navigation system complete!

---

## 🧪 Testing Commands

```bash
# Run development server
pnpm dev

# Run type checking
pnpm tsc --noEmit

# Run linting
pnpm lint

# Run tests (if configured)
pnpm test

# Build for production
pnpm build
```

---

## 🐛 Troubleshooting

### Issue: Sidebar not collapsing

**Solution**: Check that `SidebarProvider` wraps the layout and `useSidebar()` is called within it.

### Issue: Active states not working

**Solution**: Verify `usePathname()` is being called in a client component ('use client').

### Issue: Command palette not opening

**Solution**: Check keyboard event listener is attached and ⌘K is not blocked by browser.

### Issue: Mobile nav not showing

**Solution**: Verify Tailwind breakpoints (`md:hidden`) and that component is rendered.

---

## 📚 Resources

### Documentation
- [NAVIGATION_ARCHITECTURE.md](./NAVIGATION_ARCHITECTURE.md) - Complete design
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Detailed implementation
- [GAP_ANALYSIS_AND_ROADMAP.md](./GAP_ANALYSIS_AND_ROADMAP.md) - Full roadmap

### External Resources
- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## ✅ Definition of Done

Navigation system is complete when:

- [x] All navigation components built
- [x] Role-based access control working
- [x] Command palette functional (⌘K)
- [x] Mobile responsive (< 768px)
- [x] Keyboard accessible
- [x] WCAG 2.1 AA compliant
- [x] No console errors
- [x] Performance < 200ms transitions
- [x] Code reviewed and merged

---

## 🎉 Next Steps

After completing navigation:

1. **Week 3-4**: Products Module
   - Product CRUD
   - File upload (S3)
   - Product management UI

2. **Week 5-6**: Orders Module
   - Order management
   - Customer tracking

3. **Week 7-8**: Payments
   - Khalti, eSewa, FonePay integration
   - Digital delivery

---

## 💬 Support

**Questions?** Contact:
- Technical Lead: [email]
- Project Manager: [email]
- Design Team: [email]

**Resources**:
- Slack: #pasaal-dev
- GitHub: [repo-url]
- Figma: [design-url]

---

**Document Version**: 1.0  
**Last Updated**: December 5, 2025  
**Status**: Ready for Development
