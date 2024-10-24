import BgGradient from "@/components/Home/BgGradient";

import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import { Hero2 } from "@/components/Home/Hero2";
import Navbar from "@/components/Home/Navbar";
import Pricing from "@/components/Home/Pricing";

export default function Home() {
  return (
    <main className="relative flex w-full min-w-0 gap-5">
      <section className="w-full min-w-0 dark:bg-black">
        <Navbar />
        <BgGradient>
          <Hero />

          <Hero2 />

          <Pricing />

          <Footer />
        </BgGradient>
      </section>
    </main>
  );
}
