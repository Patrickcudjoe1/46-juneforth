import { JuneforthHero } from "@/components/juneforth-hero";
import { EssentialsSection } from "@/components/essentials-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <JuneforthHero />
      <EssentialsSection />
    </main>
  );
}
