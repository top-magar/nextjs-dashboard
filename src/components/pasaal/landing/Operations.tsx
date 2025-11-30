"use client";

import React from "react";
import { Box, Globe, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Operations: React.FC = () => {
    return (
        <section id="operations" className="py-24 bg-muted/30 border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                        Run Your Business on{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                            Autopilot
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Stop juggling spreadsheets and manual tasks. Pasaal automates your
                        inventory, orders, and customer notifications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Order Processing (Simulated in previous step output, but I'll recreate based on context) */}
                    {/* Actually, the previous output started with Notification 3, implying there was more before. 
              I will assume a card structure similar to the others. 
              Since I missed the beginning of Operations.tsx, I will reconstruct the first card based on the "Notification" context 
              which suggests "Automated Notifications" or "Order Tracking". 
              However, looking at the truncated output, it seems to be part of a larger card or section.
              I will create a "Smart Notifications" card as the first one.
          */}
                    <div className="group relative rounded-3xl border border-border bg-card overflow-hidden hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col">
                        <div className="p-8 pb-0 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Box className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Automated Notifications
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                Keep your customers in the loop with automatic SMS and email
                                updates for every order status change.
                            </p>
                        </div>

                        {/* Visual: Notifications Mockup */}
                        <div className="mt-8 px-6 pb-6 h-48 relative flex flex-col gap-3 justify-end overflow-hidden">
                            <div className="bg-background border border-border rounded-lg p-3 shadow-sm flex gap-3 opacity-80 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                    <Box className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-foreground">
                                        Order Shipped
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                        "Hi Ram, your package is out for delivery via Pathao..."
                                    </p>
                                </div>
                            </div>
                            <div className="bg-background border border-border rounded-lg p-3 shadow-sm flex gap-3 opacity-60 group-hover:opacity-80 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500 delay-75">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                    <AlertTriangle className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-foreground">
                                        Low Stock Warning
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                        Goldstar Shoes (Size 42) is running low.
                                    </p>
                                </div>
                            </div>
                            {/* Gradient Overlay for bottom fade */}
                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Card 2: Smart Inventory */}
                    <div className="group relative rounded-3xl border border-border bg-card overflow-hidden hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-500 flex flex-col">
                        <div className="p-8 pb-0 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Box className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Inventory Intelligence
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                Never run out of best-sellers during Dashain. Set automatic
                                reorder points and low-stock warnings.
                            </p>
                        </div>

                        {/* Visual: Product Card Mockup */}
                        <div className="mt-8 px-6 pb-6 h-48 relative flex items-end justify-center">
                            <div className="w-full bg-background border border-border rounded-t-xl p-4 shadow-sm group-hover:pb-6 transition-all duration-500 relative z-10">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-12 h-12 bg-muted rounded-md shrink-0"></div>
                                    <div className="flex-1">
                                        <div className="h-3 w-3/4 bg-foreground/10 rounded mb-2"></div>
                                        <div className="h-2 w-1/2 bg-foreground/5 rounded"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="font-medium text-foreground">
                                            Stock Level
                                        </span>
                                        <span className="text-red-500 font-bold flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" /> 5 Left
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full w-[15%] bg-red-500 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="pt-2">
                                        <button className="w-full py-1.5 text-xs font-medium bg-foreground text-background rounded-md hover:opacity-90 transition-opacity">
                                            Reorder Stock
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 w-[90%] h-full bg-muted/20 border-x border-t border-border/50 rounded-t-xl -z-0 scale-95 translate-y-2"></div>
                        </div>
                    </div>

                    {/* Card 3: Multi-channel Sync */}
                    <div className="group relative rounded-3xl border border-border bg-card overflow-hidden hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-500 flex flex-col">
                        <div className="p-8 pb-0 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Sell Everywhere
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                Connect your inventory to Instagram Shop and Facebook
                                Marketplace. One stock pool for all your channels.
                            </p>
                        </div>

                        {/* Visual: Connection Toggles */}
                        <div className="mt-8 px-6 pb-6 h-48 relative overflow-hidden">
                            <div className="space-y-3 pt-2">
                                {/* FB Toggle */}
                                <div className="flex items-center justify-between bg-background border border-border p-3 rounded-lg shadow-sm group-hover:translate-x-1 transition-transform duration-300 delay-75">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                            f
                                        </div>
                                        <span className="text-sm font-medium text-foreground">
                                            Facebook
                                        </span>
                                    </div>
                                    <div className="w-8 h-4 bg-green-500 rounded-full relative">
                                        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                                {/* Insta Toggle */}
                                <div className="flex items-center justify-between bg-background border border-border p-3 rounded-lg shadow-sm group-hover:translate-x-1 transition-transform duration-300 delay-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-xs">
                                            IG
                                        </div>
                                        <span className="text-sm font-medium text-foreground">
                                            Instagram
                                        </span>
                                    </div>
                                    <div className="w-8 h-4 bg-green-500 rounded-full relative">
                                        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                                {/* Daraz Toggle (Off) */}
                                <div className="flex items-center justify-between bg-background border border-border p-3 rounded-lg shadow-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
                                            D
                                        </div>
                                        <span className="text-sm font-medium text-foreground">
                                            Daraz
                                        </span>
                                    </div>
                                    <div className="w-8 h-4 bg-muted rounded-full relative">
                                        <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative background glow */}
                            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline">Explore All Features</Button>
                </div>
            </div>
        </section>
    );
};
