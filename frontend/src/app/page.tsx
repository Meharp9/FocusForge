import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col justify-center gap-10">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}