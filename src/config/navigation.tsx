/**
 * Navigation Configuration
 * 
 * Centralized navigation configuration for different user contexts.
 * This is the single source of truth for all navigation menus.
 */

import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Store, 
  Settings,
  FileText,
  CreditCard,
  Bell,
  HelpCircle,
  Tag,
  Layers,
  TrendingUp,
  DollarSign,
  UserCog,
  Database,
  Shield,
  Globe
} from 'lucide-react';
import type { NavigationConfig, UserRole } from '@/types/navigation';

/**
 * Vendor Dashboard Navigation
 * Used by store owners/merchants to manage their business
 */
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
          description: 'Overview and quick stats',
        },
        {
          id: 'products',
          title: 'Products',
          href: '/dashboard/products',
          icon: <Package className="size-4" />,
          roles: ['vendor'],
          description: 'Manage your digital products',
          items: [
            { 
              id: 'all-products', 
              title: 'All Products', 
              href: '/dashboard/products',
              description: 'View all products',
            },
            { 
              id: 'add-product', 
              title: 'Add New', 
              href: '/dashboard/products/create',
              description: 'Create a new product',
            },
            { 
              id: 'categories', 
              title: 'Categories', 
              href: '/dashboard/products/categories',
              description: 'Manage product categories',
            },
            { 
              id: 'collections', 
              title: 'Collections', 
              href: '/dashboard/products/collections',
              description: 'Organize products into collections',
            },
          ],
        },
        {
          id: 'orders',
          title: 'Orders',
          href: '/dashboard/orders',
          icon: <ShoppingCart className="size-4" />,
          roles: ['vendor'],
          description: 'Manage customer orders',
          items: [
            { 
              id: 'all-orders', 
              title: 'All Orders', 
              href: '/dashboard/orders',
            },
            { 
              id: 'pending-orders', 
              title: 'Pending', 
              href: '/dashboard/orders?status=pending',
            },
            { 
              id: 'fulfilled-orders', 
              title: 'Fulfilled', 
              href: '/dashboard/orders?status=fulfilled',
            },
          ],
        },
        {
          id: 'customers',
          title: 'Customers',
          href: '/dashboard/customers',
          icon: <Users className="size-4" />,
          roles: ['vendor'],
          description: 'View and manage customers',
        },
        {
          id: 'analytics',
          title: 'Analytics',
          href: '/dashboard/analytics',
          icon: <BarChart3 className="size-4" />,
          roles: ['vendor'],
          description: 'Sales and performance insights',
          items: [
            { 
              id: 'overview', 
              title: 'Overview', 
              href: '/dashboard/analytics',
            },
            { 
              id: 'sales', 
              title: 'Sales', 
              href: '/dashboard/analytics/sales',
            },
            { 
              id: 'traffic', 
              title: 'Traffic', 
              href: '/dashboard/analytics/traffic',
            },
          ],
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
          description: 'Customize your store',
          items: [
            { 
              id: 'appearance', 
              title: 'Appearance', 
              href: '/dashboard/store/appearance',
            },
            { 
              id: 'pages', 
              title: 'Pages', 
              href: '/dashboard/store/pages',
            },
            { 
              id: 'navigation', 
              title: 'Navigation', 
              href: '/dashboard/store/navigation',
            },
          ],
        },
        {
          id: 'settings',
          title: 'Settings',
          href: '/dashboard/settings',
          icon: <Settings className="size-4" />,
          roles: ['vendor'],
          description: 'Account and preferences',
          items: [
            { 
              id: 'general', 
              title: 'General', 
              href: '/dashboard/settings',
            },
            { 
              id: 'billing', 
              title: 'Billing', 
              href: '/dashboard/settings/billing',
            },
            { 
              id: 'integrations', 
              title: 'Integrations', 
              href: '/dashboard/settings/integrations',
            },
            { 
              id: 'team', 
              title: 'Team', 
              href: '/dashboard/settings/team',
            },
          ],
        },
      ],
    },
  ],
  mobileNav: [
    {
      id: 'dashboard',
      title: 'Home',
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
    {
      id: 'more',
      title: 'More',
      href: '/dashboard/settings',
      icon: <Settings className="size-4" />,
    },
  ],
};

/**
 * Admin Portal Navigation
 * Used by platform administrators to manage the marketplace
 */
export const adminNavigation: NavigationConfig = {
  mainNav: [],
  sidebarNav: [
    {
      id: 'main',
      items: [
        {
          id: 'admin-dashboard',
          title: 'Dashboard',
          href: '/admin',
          icon: <Home className="size-4" />,
          roles: ['admin'],
          description: 'Platform overview',
        },
        {
          id: 'vendors',
          title: 'Vendors',
          href: '/admin/vendors',
          icon: <Store className="size-4" />,
          roles: ['admin'],
          description: 'Manage vendors and stores',
          items: [
            { 
              id: 'all-vendors', 
              title: 'All Vendors', 
              href: '/admin/vendors',
            },
            { 
              id: 'pending-vendors', 
              title: 'Pending Approval', 
              href: '/admin/vendors?status=pending',
            },
            { 
              id: 'active-vendors', 
              title: 'Active', 
              href: '/admin/vendors?status=active',
            },
          ],
        },
        {
          id: 'users',
          title: 'Users',
          href: '/admin/users',
          icon: <Users className="size-4" />,
          roles: ['admin'],
          description: 'Manage all users',
        },
        {
          id: 'transactions',
          title: 'Transactions',
          href: '/admin/transactions',
          icon: <DollarSign className="size-4" />,
          roles: ['admin'],
          description: 'Payment oversight',
        },
        {
          id: 'content',
          title: 'Content',
          href: '/admin/content',
          icon: <FileText className="size-4" />,
          roles: ['admin'],
          description: 'CMS and announcements',
        },
        {
          id: 'reports',
          title: 'Reports',
          href: '/admin/reports',
          icon: <TrendingUp className="size-4" />,
          roles: ['admin'],
          description: 'Platform analytics',
        },
      ],
    },
    {
      id: 'system',
      title: 'System',
      items: [
        {
          id: 'settings',
          title: 'Settings',
          href: '/admin/settings',
          icon: <Settings className="size-4" />,
          roles: ['admin'],
          description: 'Platform configuration',
        },
        {
          id: 'security',
          title: 'Security',
          href: '/admin/security',
          icon: <Shield className="size-4" />,
          roles: ['admin'],
          description: 'Security and access control',
        },
      ],
    },
  ],
  mobileNav: [
    {
      id: 'admin-dashboard',
      title: 'Home',
      href: '/admin',
      icon: <Home className="size-4" />,
    },
    {
      id: 'vendors',
      title: 'Vendors',
      href: '/admin/vendors',
      icon: <Store className="size-4" />,
    },
    {
      id: 'users',
      title: 'Users',
      href: '/admin/users',
      icon: <Users className="size-4" />,
    },
    {
      id: 'settings',
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="size-4" />,
    },
  ],
};

/**
 * Customer Store Navigation
 * Used in the public-facing storefront
 */
export const storeNavigation = {
  header: [
    { id: 'products', title: 'Products', href: '/products' },
    { id: 'collections', title: 'Collections', href: '/collections' },
    { id: 'about', title: 'About', href: '/about' },
    { id: 'contact', title: 'Contact', href: '/contact' },
  ],
  footer: {
    company: [
      { id: 'about', title: 'About Us', href: '/about' },
      { id: 'contact', title: 'Contact', href: '/contact' },
      { id: 'careers', title: 'Careers', href: '/careers' },
    ],
    support: [
      { id: 'help', title: 'Help Center', href: '/help' },
      { id: 'returns', title: 'Returns', href: '/returns' },
      { id: 'shipping', title: 'Shipping', href: '/shipping' },
    ],
    legal: [
      { id: 'terms', title: 'Terms of Service', href: '/terms' },
      { id: 'privacy', title: 'Privacy Policy', href: '/privacy' },
      { id: 'cookies', title: 'Cookie Policy', href: '/cookies' },
    ],
  },
};

/**
 * Helper function to filter navigation items by role
 */
export function filterNavByRole(
  nav: NavigationConfig,
  role: UserRole
): NavigationConfig {
  return {
    mainNav: nav.mainNav.filter(
      (item) => !item.roles || item.roles.includes(role)
    ),
    sidebarNav: nav.sidebarNav
      .filter((group) => !group.roles || group.roles.includes(role))
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => !item.roles || item.roles.includes(role)
        ),
      })),
    mobileNav: nav.mobileNav.filter(
      (item) => !item.roles || item.roles.includes(role)
    ),
  };
}
