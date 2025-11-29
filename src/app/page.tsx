import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/hero';
import { TrustedBrands } from '@/components/landing/TrustedBrands';
import { Features } from '@/components/landing/features';
import { Workflow } from '@/components/landing/Workflow';
import { Operations } from '@/components/landing/Operations';
import { Integrations } from '@/components/landing/Integrations';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/faq';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <Hero />
      <TrustedBrands />
      <Features />
      <Workflow />
      <Operations />
      <Integrations />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
