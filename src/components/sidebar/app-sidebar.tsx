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
import { StoreSwitcher } from "@/components/sidebar/team-switcher"
import { NavUser } from "@/components/sidebar/nav-user"

export const notifications = [
  {
    id: "1",
    avatar: "/avatars/01.png",
    fallback: "OM",
    text: "New order received.",
    time: "10m ago",
  },
]

export const routes: Route[] = [
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

export const user = {
  name: "User",
  email: "user@nextmail.com",
  avatar: "/avatars/shadcn.jpg",
}

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <StoreSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <DashboardNavigation routes={routes} />
      </SidebarContent>
      <SidebarFooter className="px-2 pb-4">
        <div className="flex justify-center">
          {/*<SidebarTrigger />*/}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

