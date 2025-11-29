import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
// Marketing styles are now in the main CSS structure

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary flex flex-col relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full pt-16 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}