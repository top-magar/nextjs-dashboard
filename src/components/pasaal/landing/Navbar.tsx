"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";

const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Operations", href: "#operations" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
];

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md py-3 border-border shadow-sm"
                    : "bg-transparent py-5 border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                            P
                        </div>
                        <span className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                            Pasaal
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="rounded-full"
                            aria-label="Toggle theme"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" asChild>
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button className="shadow-lg shadow-primary/20" asChild>
                                <Link href="/register">Start Free Trial</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="rounded-full"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle className="text-left flex items-center gap-2">
                                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                                            P
                                        </div>
                                        Pasaal
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 mt-8">
                                    <div className="flex flex-col gap-4">
                                        {navLinks.map((link) => (
                                            <SheetClose asChild key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                                                >
                                                    {link.name}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </div>

                                    <div className="border-t pt-6">
                                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                                            Resources
                                        </p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {["Blog", "Community", "Help Center", "API Docs"].map(
                                                (item) => (
                                                    <Link
                                                        key={item}
                                                        href="#"
                                                        className="text-sm font-medium p-2 rounded-md bg-muted/50 border border-border text-center hover:bg-muted transition-colors"
                                                    >
                                                        {item}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 mt-auto">
                                        <SheetClose asChild>
                                            <Button variant="outline" className="w-full" asChild>
                                                <Link href="/login">Log in</Link>
                                            </Button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Button className="w-full shadow-lg shadow-primary/20" asChild>
                                                <Link href="/register">Start Free Trial</Link>
                                            </Button>
                                        </SheetClose>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};
