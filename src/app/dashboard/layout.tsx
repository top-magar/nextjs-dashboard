/**
 * Dashboard Layout
 * 
 * Main layout for vendor dashboard with:
 * - Sidebar navigation
 * - Top header
 * - Mobile bottom navigation
 * - Command palette
 */

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavSidebar } from '@/components/navigation/sidebar';
import { Header } from '@/components/navigation/header';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { CommandPalette } from '@/components/navigation/command-palette';
import { StoreHeader } from '@/components/navigation/store-header';
import { vendorNavigation } from '@/config/navigation';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  // Require authentication
  if (!session?.user) {
    redirect('/login');
  }

  // TODO: Check if user has vendor role
  // For now, we'll allow any authenticated user

  const user = {
    name: session.user.name || 'User',
    email: session.user.email || '',
    avatar: session.user.image || '',
  };

  // TODO: Fetch actual stores from database
  const stores = [
    { 
      name: 'My Store', 
      plan: 'Pro' 
    },
  ];

  // Flatten sidebar nav groups into items
  const sidebarItems = vendorNavigation.sidebarNav.flatMap(group => group.items);

  return (
    <SidebarProvider>
      <NavSidebar
        items={sidebarItems}
        header={<StoreHeader stores={stores} />}
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