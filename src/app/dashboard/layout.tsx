import { AnnouncementBar } from '@/components/announcementbar';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { StickyBanner } from '@/components/ui/sticky-banner';
import React, { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
      <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                  <SidebarTrigger />
                  {children}
              </SidebarInset>
          </SidebarProvider>
        
  );
}
