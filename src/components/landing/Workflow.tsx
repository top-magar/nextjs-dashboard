'use client';

import React, { useState } from 'react';
import { CreditCard, ShoppingBag, Users, ArrowUpRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Workflow: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'team'>('overview');

    return (
        <section id="workflow" className="py-24 bg-muted/30 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide mb-6">
                            Workflow
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                            Manage your entire <br />
                            <span className="text-primary">operation</span> in one place.
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Switch between high-level overview and detailed team management. Pasaal adapts to your role, whether you're an owner or a store manager.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div
                                className={cn(
                                    "p-6 rounded-2xl border cursor-pointer transition-all duration-300",
                                    activeTab === 'overview' ? "bg-card border-primary shadow-lg shadow-primary/5 ring-1 ring-primary/20" : "bg-transparent border-transparent hover:bg-muted/50"
                                )}
                                onClick={() => setActiveTab('overview')}
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className={cn("p-2 rounded-lg transition-colors", activeTab === 'overview' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground">Real-time Overview</h3>
                                </div>
                                <p className="text-muted-foreground pl-[3.25rem]">
                                    Monitor daily sales, active orders, and revenue trends across all your branches instantly.
                                </p>
                            </div>

                            <div
                                className={cn(
                                    "p-6 rounded-2xl border cursor-pointer transition-all duration-300",
                                    activeTab === 'team' ? "bg-card border-primary shadow-lg shadow-primary/5 ring-1 ring-primary/20" : "bg-transparent border-transparent hover:bg-muted/50"
                                )}
                                onClick={() => setActiveTab('team')}
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className={cn("p-2 rounded-lg transition-colors", activeTab === 'team' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground">Team Management</h3>
                                </div>
                                <p className="text-muted-foreground pl-[3.25rem]">
                                    Assign roles, track performance, and manage permissions for your staff members securely.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual (Interactive Mockup) */}
                    <div className="order-1 lg:order-2 h-[600px] relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-[2.5rem] blur-3xl opacity-50 animate-pulse" />
                        <div className="relative h-full w-full bg-background border border-border rounded-[2rem] shadow-2xl overflow-hidden flex flex-col">

                            {/* Mockup Header (Browser Chrome) */}
                            <div className="h-12 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                <div className="ml-4 flex-1 h-6 bg-background rounded-md border border-border/50 flex items-center justify-center text-[10px] text-muted-foreground font-mono">
                                    pasaal.com/dashboard
                                </div>
                            </div>

                            {/* Mockup Body */}
                            <div className="flex-1 flex overflow-hidden">

                                {/* Sidebar */}
                                <div className="w-16 md:w-64 border-r border-border bg-card/50 hidden md:flex flex-col p-4 gap-2">
                                    <div className="h-8 w-32 bg-primary/10 rounded-md mb-6" />
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className={cn("h-8 w-full rounded-md flex items-center gap-3 px-2", i === 1 ? "bg-primary/10 text-primary" : "text-muted-foreground")}>
                                            <div className="w-4 h-4 rounded-sm bg-current opacity-20" />
                                            <div className="h-2 w-20 bg-current opacity-20 rounded-full" />
                                        </div>
                                    ))}
                                    <div className="mt-auto">
                                        <div className="h-12 w-full bg-muted rounded-xl flex items-center gap-3 px-3">
                                            <div className="h-full w-[80%] bg-primary rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-background/50">

                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                        <div>
                                            <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
                                            <p className="text-sm text-muted-foreground">Welcome back, Kathmandu Gears</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">Export</Button>
                                            <Button size="sm">Add Product</Button>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        {[
                                            { label: 'Total Sales', val: 'NPR 245,000', change: '+12%', icon: CreditCard, color: 'text-blue-500' },
                                            { label: 'Active Orders', val: '24', change: '+4', icon: ShoppingBag, color: 'text-orange-500' },
                                            { label: 'Store Visits', val: '1,205', change: '+18%', icon: Users, color: 'text-purple-500' }
                                        ].map((stat, i) => (
                                            <div key={i} className="p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className={`p-2 rounded-lg bg-background border border-border ${stat.color} bg-opacity-10`}>
                                                        <stat.icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-xs font-medium text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">{stat.change}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                                                <h3 className="text-2xl font-bold text-foreground">{stat.val}</h3>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chart & Recent Orders Split */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                        {/* Chart Area */}
                                        <div className="lg:col-span-2 p-6 rounded-xl border border-border bg-card shadow-sm">
                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="font-semibold text-foreground">Revenue Over Time</h3>
                                                <select className="bg-transparent text-sm text-muted-foreground border-none outline-none cursor-pointer">
                                                    <option>Last 7 Days</option>
                                                </select>
                                            </div>
                                            <div className="h-48 flex items-end justify-between gap-2">
                                                {[35, 55, 40, 70, 50, 85, 60, 90, 75, 55, 80, 65].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-muted/30 rounded-t-sm relative group cursor-pointer">
                                                        <div
                                                            style={{ height: `${h}%` }}
                                                            className="absolute bottom-0 w-full bg-primary/80 rounded-t-sm transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                                        ></div>
                                                        {/* Tooltip on hover */}
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border shadow-lg pointer-events-none z-10">
                                                            Rs {h * 1000}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Recent Transactions */}
                                        <div className="p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col">
                                            <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
                                            <div className="space-y-4">
                                                {[
                                                    { name: 'Ram Sharma', item: 'Nike Air Max', price: 'Rs 12,500', time: '2m ago', method: 'eSewa' },
                                                    { name: 'Sita Karki', item: 'Cotton Saree', price: 'Rs 4,200', time: '15m ago', method: 'Khalti' },
                                                    { name: 'Ramesh B.', item: 'Gaming Mouse', price: 'Rs 3,100', time: '1h ago', method: 'COD' },
                                                ].map((order, i) => (
                                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                                {order.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-foreground">{order.name}</p>
                                                                <p className="text-xs text-muted-foreground">{order.item}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-medium text-foreground">{order.price}</p>
                                                            <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
                                                                {order.method === 'eSewa' && <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>}
                                                                {order.method === 'Khalti' && <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>}
                                                                {order.method === 'COD' && <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>}
                                                                {order.method}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <Button variant="ghost" size="sm" className="w-full mt-auto pt-4 text-muted-foreground hover:text-primary">
                                                View All Orders <ArrowUpRight className="w-3 h-3 ml-1" />
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
