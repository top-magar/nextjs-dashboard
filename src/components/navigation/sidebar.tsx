/**
 * Enhanced Sidebar Navigation Component
 * 
 * Features:
 * - Collapsible sidebar
 * - Nested menu items
 * - Active state highlighting
 * - Badge indicators
 * - Tooltips when collapsed
 * - Keyboard accessible
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { NavItemWithSub } from '@/types/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

type NavSidebarProps = {
  items: NavItemWithSub[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export function NavSidebar({ items, header, footer }: NavSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar variant="floating" collapsible="icon">
      {header && <SidebarHeader>{header}</SidebarHeader>}
      
      <SidebarContent className="gap-4 px-2 py-4">
        <SidebarMenu>
          {items.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>

      {footer && <SidebarFooter className="px-2 pb-4">{footer}</SidebarFooter>}
    </Sidebar>
  );
}

function NavItem({
  item,
  isCollapsed,
}: {
  item: NavItemWithSub;
  isCollapsed: boolean;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(() => {
    // Auto-expand if current path matches
    if (pathname === item.href) return true;
    if (item.items?.some(sub => pathname === sub.href || pathname.startsWith(sub.href + '/'))) {
      return true;
    }
    return false;
  });
  
  const hasSubItems = item.items && item.items.length > 0;
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

  // Disabled state
  if (item.disabled) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          disabled
          className={cn(
            'flex w-full items-center rounded-lg px-2 transition-colors opacity-50 cursor-not-allowed',
            isCollapsed && 'justify-center'
          )}
          tooltip={item.title}
        >
          {item.icon}
          {!isCollapsed && (
            <span className="ml-2 text-sm font-medium">{item.title}</span>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  // Item with sub-items
  if (hasSubItems) {
    return (
      <SidebarMenuItem>
        <Collapsible open={!isCollapsed && isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={cn(
                'flex w-full items-center rounded-lg px-2 transition-colors',
                isActive && 'bg-sidebar-accent text-foreground font-semibold',
                !isActive && 'text-muted-foreground hover:bg-sidebar-muted hover:text-foreground',
                isCollapsed && 'justify-center'
              )}
              tooltip={item.title}
            >
              {item.icon}
              {!isCollapsed && (
                <>
                  <span className="ml-2 flex-1 text-sm font-medium text-left">
                    {item.title}
                  </span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto mr-2 h-5 px-1.5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {isOpen ? (
                    <ChevronDown className="size-4 shrink-0" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0" />
                  )}
                </>
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>

          {!isCollapsed && (
            <CollapsibleContent>
              <SidebarMenuSub className="my-1 ml-3.5">
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.id} className="h-auto">
                    <SidebarMenuSubButton asChild>
                      <Link
                        href={subItem.href}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                          pathname === subItem.href || pathname.startsWith(subItem.href + '/')
                            ? 'bg-sidebar-accent text-foreground font-semibold'
                            : 'text-muted-foreground hover:bg-sidebar-muted hover:text-foreground'
                        )}
                      >
                        {subItem.icon && <span className="shrink-0">{subItem.icon}</span>}
                        <span className="flex-1">{subItem.title}</span>
                        {subItem.badge !== undefined && (typeof subItem.badge === 'number' ? subItem.badge > 0 : subItem.badge) && (
                          <Badge variant="secondary" className="ml-auto h-4 px-1 text-xs">
                            {subItem.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          )}
        </Collapsible>
      </SidebarMenuItem>
    );
  }

  // Simple item without sub-items
  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={item.title} asChild>
        <Link
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          className={cn(
            'flex items-center rounded-lg px-2 transition-colors',
            isActive
              ? 'bg-sidebar-accent text-foreground font-semibold'
              : 'text-muted-foreground hover:bg-sidebar-muted hover:text-foreground',
            isCollapsed && 'justify-center'
          )}
        >
          {item.icon}
          {!isCollapsed && (
            <>
              <span className="ml-2 flex-1 text-sm font-medium">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
