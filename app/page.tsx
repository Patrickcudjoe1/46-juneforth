import { JuneforthHero } from "@/components/juneforth-hero";
import { EssentialsSection } from "@/components/whats-Newsection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <JuneforthHero />
      <EssentialsSection />
    </main>
  );
}
