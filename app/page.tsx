import MinimalistHeroDemo from "@/components/minimalist-hero-demo";
import { EssentialsSection } from "@/components/essentials-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MinimalistHeroDemo />
      <EssentialsSection />
    </main>
  );
}
