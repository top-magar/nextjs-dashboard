"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { TrustedBrands } from "./TrustedBrands";
import { Features } from "./Features";
import { Workflow } from "./Workflow";
import { Operations } from "./Operations";
import { Integrations } from "./Integrations";
import { Pricing } from "./Pricing";
import { FAQ } from "./FAQ";
import { CTA } from "./CTA";
import { Footer } from "./Footer";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary flex flex-col relative overflow-x-hidden">
            <Navbar />
            <main className="flex-1 w-full pt-16 flex flex-col">
                <Hero />
                <TrustedBrands />
                <Features />
                <Workflow />
                <Operations />
                <Integrations />
                <Pricing />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
