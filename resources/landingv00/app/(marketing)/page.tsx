
import { Hero } from '@/components/landing/hero';
import { TrustedBrands } from '@/components/landing/TrustedBrands';
import { Features } from '@/components/landing/features';
import { Workflow } from '@/components/landing/Workflow';
import { Operations } from '@/components/landing/Operations';
import { Integrations } from '@/components/landing/Integrations';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/faq';
import { CTA } from '@/components/landing/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBrands />
      <Features />
      <Workflow />
      <Operations />
      <Integrations />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}