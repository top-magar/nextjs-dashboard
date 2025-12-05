/**
 * Top Header Component
 * 
 * Features:
 * - Sidebar trigger
 * - Search bar
 * - Notifications
 * - Theme toggle
 * - User menu
 */

'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/mode-toggle';
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logout } from '@/lib/actions';

type HeaderProps = {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  showSearch?: boolean;
  showNotifications?: boolean;
};

export function Header({ user, showSearch = true, showNotifications = true }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 m-2 rounded-xl border bg-sidebar shadow px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        
        {showSearch && (
          <div className="relative hidden md:block flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search... (⌘K)"
              className="pl-8"
              onFocus={(e) => {
                e.preventDefault();
                // TODO: Open command palette
                // This will be implemented in command-palette.tsx
              }}
              readOnly
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {showNotifications && <NotificationButton />}
        <ModeToggle />
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
}

function NotificationButton() {
  // TODO: Fetch notifications from API
  const notifications = [
    {
      id: '1',
      title: 'New order received',
      description: 'Order #1234 from John Doe',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: '2',
      title: 'Product approved',
      description: 'Your product "Template A" has been approved',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      title: 'Payment received',
      description: 'NPR 1,500 deposited to your account',
      time: '3 hours ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="max-h-96">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-1 p-3 cursor-pointer"
              >
                <div className="flex items-start justify-between w-full gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-primary cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu({ user }: { user: { name: string; email: string; avatar?: string } }) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/dashboard/settings">Account Settings</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/dashboard/settings/billing">Billing</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/help">Support</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={logout} className="w-full">
            <button type="submit" className="w-full text-left text-destructive">
              Log out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
