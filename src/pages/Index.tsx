import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { MissionVision } from "@/components/MissionVision";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <Benefits />
      <Services />
      <About />
      <MissionVision />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
