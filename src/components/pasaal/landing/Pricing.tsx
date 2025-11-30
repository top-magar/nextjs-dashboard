"use client";

import React from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Plan data
const plans = [
    {
        id: "starter",
        name: "Starter",
        description:
            "Essential tools for new businesses just starting their online journey.",
        price: { monthly: 0, yearly: 0 },
        features: [
            "Up to 50 Products",
            "Basic Storefront",
            "Cash on Delivery Support",
            "Standard Order Management",
            "Email Support",
        ],
        notIncluded: [
            "Digital Payments (eSewa/Khalti)",
            "Custom Domain",
            "Advanced Analytics",
        ],
        cta: "Start for Free",
        popular: false,
    },
    {
        id: "growth",
        name: "Growth",
        description: "Advanced features for growing businesses ready to scale sales.",
        price: { monthly: 2500, yearly: 25000 }, // 2500 * 10 for yearly (2 months free)
        features: [
            "Unlimited Products",
            "Accept eSewa, Khalti, IME Pay",
            "Custom Domain (yourname.com)",
            "Advanced Analytics Dashboard",
            "Inventory Automation",
            "Priority Chat Support",
            "Facebook & Insta Sync",
        ],
        notIncluded: [],
        cta: "Get Started",
        popular: true,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "For large scale marketplaces and organizations.",
        price: { monthly: "Custom", yearly: "Custom" },
        features: [
            "Unlimited Everything",
            "Dedicated Account Manager",
            "Custom API Integrations",
            "SLA Support",
            "Multi-vendor Support",
            "White Labeling",
        ],
        notIncluded: [],
        cta: "Contact Sales",
        popular: false,
    },
];

export const Pricing: React.FC = () => {
    const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">(
        "monthly"
    );

    return (
        <section id="pricing" className="py-24 bg-muted/30 border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        Start for free and upgrade as you grow. No hidden fees.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center p-1 bg-muted rounded-full border border-border">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                                billingCycle === "monthly"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                                billingCycle === "yearly"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Yearly <Badge variant="secondary" className="text-[10px] px-1.5 h-5">Save 20%</Badge>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <Card
                            key={plan.id}
                            className={cn(
                                "relative flex flex-col transition-all duration-300 hover:shadow-xl",
                                plan.popular
                                    ? "border-primary shadow-lg shadow-primary/5 scale-105 z-10"
                                    : "border-border hover:border-primary/50"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-primary text-primary-foreground hover:bg-primary px-4 py-1">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className="p-8 pb-0">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-sm text-muted-foreground h-10">
                                    {plan.description}
                                </p>
                                <div className="mt-6 flex items-baseline gap-1">
                                    {typeof plan.price.monthly === "number" ? (
                                        <>
                                            <span className="text-4xl font-bold text-foreground">
                                                {billingCycle === "monthly"
                                                    ? (plan.price.monthly === 0 ? "Free" : `Rs ${plan.price.monthly.toLocaleString()}`)
                                                    : ((plan.price as { monthly: number; yearly: number }).yearly === 0 ? "Free" : `Rs ${(plan.price as { monthly: number; yearly: number }).yearly.toLocaleString()}`)}
                                            </span>
                                            {(billingCycle === "monthly" ? plan.price.monthly : (plan.price as { monthly: number; yearly: number }).yearly) > 0 && (
                                                <span className="text-muted-foreground">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                                            )}
                                        </>
                                    ) : (
                                        <span className="text-4xl font-bold text-foreground">
                                            Custom
                                        </span>
                                    )}
                                </div>
                                {billingCycle === "yearly" &&
                                    typeof plan.price.yearly === "number" &&
                                    plan.price.yearly > 0 && (
                                        <p className="text-xs text-green-600 mt-1 font-medium">
                                            Billed Rs {plan.price.yearly.toLocaleString()} yearly
                                        </p>
                                    )}
                            </CardHeader>

                            <CardContent className="p-8 flex-1">
                                <div className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-0.5 p-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 shrink-0">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-sm text-foreground/90">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}

                                    {/* Visual cue for missing features in lower tiers */}
                                    {plan.notIncluded.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 opacity-50 grayscale select-none"
                                            aria-hidden="true"
                                        >
                                            <div className="mt-0.5 p-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                                                <XCircle className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-sm text-muted-foreground decoration-muted-foreground/50">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="p-8 pt-0">
                                <Button
                                    variant={plan.popular ? "default" : "outline"}
                                    className={cn(
                                        "w-full",
                                        plan.popular ? "shadow-lg shadow-primary/20 h-12" : "h-12"
                                    )}
                                    size="lg"
                                    asChild
                                >
                                    <Link href="/register">{plan.cta}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Enterprise CTA Footer */}
                <div className="mt-16 bg-muted/30 rounded-2xl p-8 border border-border text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-muted/50 transition-colors">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <HelpCircle className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-bold text-foreground">
                                Need a custom solution?
                            </h3>
                        </div>
                        <p className="text-muted-foreground text-sm max-w-md">
                            We offer tailored packages for large marketplaces, government
                            entities, and NGO projects requiring custom integrations.
                        </p>
                    </div>
                    <Button variant="secondary" className="whitespace-nowrap">
                        Contact Enterprise Team
                    </Button>
                </div>
            </div>
        </section>
    );
};
