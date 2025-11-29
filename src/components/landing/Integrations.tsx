'use client';

import React from 'react';
import { Truck, Share2, MessageCircle, Code2 } from 'lucide-react';

export const Integrations: React.FC = () => {
    return (
        <section id="integrations" className="py-24 bg-muted/30 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6">
                        Connect with your favorite <span className="text-primary">Tools</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Pasaal plays nice with the services you already use.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Card 1: Logistics (8 cols) */}
                    <div className="md:col-span-8 group relative rounded-3xl border border-border bg-card overflow-hidden min-h-[300px] flex flex-col hover:shadow-xl transition-shadow">
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                        <div className="p-8 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 mb-6">
                                <Truck className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">Automated Logistics</h3>
                            <p className="text-muted-foreground">One-click courier requests with Pathao and Upaya. Print labels instantly.</p>
                        </div>

                        <div className="mt-auto relative h-48 w-full flex items-center justify-center overflow-hidden">
                            {/* Animated Truck/Path Line */}
                            <div className="absolute w-[120%] h-32 border-t-2 border-dashed border-orange-300 dark:border-orange-800 rotate-[-10deg] flex items-center translate-y-4">
                                <div className="absolute -top-4 left-0 animate-move-right bg-orange-500 text-white p-2 rounded-lg shadow-lg z-10">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <div className="absolute -top-4 left-0 animate-move-right bg-red-500 text-white p-2 rounded-lg shadow-lg z-10" style={{ animationDelay: '1.5s' }}>
                                    <Truck className="w-5 h-5" />
                                </div>
                            </div>

                            {/* City Markers */}
                            <div className="absolute bottom-8 left-12 flex flex-col items-center gap-1 z-0 opacity-60">
                                <div className="w-3 h-3 rounded-full bg-foreground"></div>
                                <span className="text-[10px] font-mono uppercase">KTM</span>
                            </div>
                            <div className="absolute top-12 right-12 flex flex-col items-center gap-1 z-0 opacity-60">
                                <div className="w-3 h-3 rounded-full bg-foreground"></div>
                                <span className="text-[10px] font-mono uppercase">PKR</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Social (4 cols) */}
                    <div className="md:col-span-4 group relative rounded-3xl border border-border bg-card overflow-hidden min-h-[300px] hover:shadow-xl transition-shadow">
                        <div className="p-8 relative z-10">
                            <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 mb-4">
                                <Share2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Social Commerce</h3>
                            <p className="text-sm text-muted-foreground">Sync products to FB & Instagram Shops automatically.</p>
                        </div>
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-purple-600/20 blur-3xl rounded-full" />
                        <div className="absolute bottom-6 right-6 flex gap-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg translate-y-0 group-hover:-translate-y-2 transition-transform duration-300 ring-4 ring-background">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ring-4 ring-background">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: SMS/Communication (4 cols) */}
                    <div className="md:col-span-4 group relative rounded-3xl border border-border bg-card overflow-hidden min-h-[300px] hover:shadow-xl transition-shadow">
                        <div className="p-8 relative z-10">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-4">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Sparrow SMS</h3>
                            <p className="text-sm text-muted-foreground">Automatic order confirmations and OTP verification via SMS.</p>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 space-y-2">
                            <div className="bg-background border border-border p-3 rounded-xl shadow-sm text-xs flex gap-3 items-center opacity-80 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><MessageCircle className="w-4 h-4" /></div>
                                <div>
                                    <p className="font-semibold">Pasaal Alert</p>
                                    <p className="text-muted-foreground">Your order #8821 has been confirmed!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Developers (4 cols) */}
                    <div className="md:col-span-4 group relative rounded-3xl border border-border bg-card overflow-hidden min-h-[300px] bg-gray-950 text-white hover:shadow-xl transition-shadow">
                        <div className="p-8 relative z-10">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4 ring-1 ring-white/20">
                                <Code2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">API First</h3>
                            <p className="text-sm text-gray-400">Build custom integrations with our robust REST API.</p>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-black/50 backdrop-blur-md font-mono text-[10px] leading-relaxed text-green-400 border-t border-white/10">
                            <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                                <span className="text-purple-400">POST</span> /api/v1/orders/create <br />
                                <span className="text-blue-400">Authorization:</span> Bearer sk_live...<br />
                                <span className="text-yellow-400">{'{ "status": "success", "id": "ord_123" }'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
