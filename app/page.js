import { Sidebar } from "../components/layout/Sidebar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-hawk-background font-hawk text-hawk-text lg:flex">
      <Sidebar activeHref="/" />
    </div>
  );
}