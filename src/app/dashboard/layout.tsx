import { AppSidebar, routes, user } from "@/components/sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <DashboardHeader />
                <div className="flex flex-1 flex-col gap-4 p-4 pb-20 md:pb-4">
                    {children}
                </div>
                <MobileNav routes={routes} user={user} />
            </SidebarInset>
        </SidebarProvider>
    );
}