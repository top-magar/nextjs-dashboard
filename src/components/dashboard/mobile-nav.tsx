"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/components/sidebar/nav-main";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import { logout } from "@/lib/actions";

export function MobileNav({
    routes,
    user,
}: {
    routes: Route[];
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}) {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background px-4 pb-safe md:hidden">
            {routes.map((route) => {
                const isActive = pathname === route.link;
                return (
                    <Link
                        key={route.id}
                        href={route.link}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                            isActive
                                ? "text-primary"
                                : "text-muted-foreground hover:text-primary"
                        )}
                    >
                        {route.icon}
                        <span>{route.title}</span>
                    </Link>
                );
            })}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
                        <Avatar className="h-6 w-6 rounded-lg">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <span>Account</span>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56 rounded-lg mb-2"
                    side="top"
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Upgrade to Pro
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <BadgeCheck className="mr-2 h-4 w-4" />
                            Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <form action={logout}>
                            <button type="submit" className="flex w-full items-center">
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
