/**
 * Navigation Type Definitions
 * 
 * Defines types for the navigation system including user roles,
 * navigation items, and configuration structures.
 */

import type { ReactNode } from 'react';

/**
 * User roles in the system
 * - admin: Platform administrator with full access
 * - vendor: Store owner/merchant
 * - customer: End user/buyer
 */
export type UserRole = 'admin' | 'vendor' | 'customer';

/**
 * Base navigation item
 */
export type NavItem = {
  /** Unique identifier for the nav item */
  id: string;
  /** Display title */
  title: string;
  /** Route path */
  href: string;
  /** Optional icon component */
  icon?: ReactNode;
  /** Optional badge (number or text) */
  badge?: number | string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether the link is external */
  external?: boolean;
  /** Which roles can see this item */
  roles?: UserRole[];
  /** Optional description for tooltips */
  description?: string;
};

/**
 * Navigation item with optional sub-items
 */
export type NavItemWithSub = NavItem & {
  /** Optional nested navigation items */
  items?: NavItem[];
};

/**
 * Navigation group (section with title)
 */
export type NavGroup = {
  /** Unique identifier for the group */
  id: string;
  /** Optional group title */
  title?: string;
  /** Navigation items in this group */
  items: NavItemWithSub[];
  /** Which roles can see this group */
  roles?: UserRole[];
};

/**
 * Complete navigation configuration for a context
 */
export type NavigationConfig = {
  /** Top navigation items (horizontal menu) */
  mainNav: NavItemWithSub[];
  /** Sidebar navigation groups */
  sidebarNav: NavGroup[];
  /** Mobile bottom navigation items */
  mobileNav: NavItem[];
};

/**
 * Navigation context type
 */
export type NavigationContextType = {
  /** Whether sidebar is open */
  isSidebarOpen: boolean;
  /** Whether sidebar is collapsed */
  isSidebarCollapsed: boolean;
  /** Toggle sidebar open/closed */
  toggleSidebar: () => void;
  /** Collapse sidebar */
  collapseSidebar: () => void;
  /** Expand sidebar */
  expandSidebar: () => void;
  /** Whether mobile menu is open */
  isMobileMenuOpen: boolean;
  /** Toggle mobile menu */
  toggleMobileMenu: () => void;
};
