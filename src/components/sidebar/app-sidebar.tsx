"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Home, FileText, Users } from "lucide-react"
import { Logo } from "@/components/sidebar/logo"
import type { Route } from "@/components/sidebar/nav-main"
import DashboardNavigation from "@/components/sidebar/nav-main"
import { NotificationsPopover } from "@/components/sidebar/nav-notifications"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import { NavUser } from "@/components/sidebar/nav-user"

const notifications = [
  {
    id: "1",
    avatar: "/avatars/01.png",
    fallback: "OM",
    text: "New order received.",
    time: "10m ago",
  },
]

const routes: Route[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home className="size-4" />,
    link: "/dashboard",
  },
  {
    id: "invoices",
    title: "Invoices",
    icon: <FileText className="size-4" />,
    link: "/dashboard/invoices",
  },
  {
    id: "customers",
    title: "Customers",
    icon: <Users className="size-4" />,
    link: "/dashboard/customers",
  },
]

const teams = [
  { name: "Acme Inc", logo: Logo, plan: "Dashboard" },
]

const user = {
  name: "User",
  email: "user@nextmail.com",
  avatar: "/avatars/shadcn.jpg",
}

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between"
        )}
      >
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          {!isCollapsed && (
            <span className="font-semibold text-black dark:text-white">
              Acme
            </span>
          )}
        </a>

        <motion.div
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <NotificationsPopover notifications={notifications} />
          <SidebarTrigger />
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <DashboardNavigation routes={routes} />
      </SidebarContent>
      <SidebarFooter className="px-2">
        <TeamSwitcher teams={teams} />
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
