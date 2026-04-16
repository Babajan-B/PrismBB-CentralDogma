import { CentralDogmaHero } from "@/components/hero/CentralDogmaHero";
import { MobileLanding } from "@/components/hero/MobileLanding";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <CentralDogmaHero />
      <MobileLanding />
    </main>
  );
}
