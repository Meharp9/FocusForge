import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">🌿 Focus Garden</h1>
      <p className="text-lg opacity-80">
        Grow your focus. One session at a time.
      </p>
      <ThemeToggle />
    </main>
  );
}