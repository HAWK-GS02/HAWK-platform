import { Sidebar } from "../components/layout/Sidebar";
import { PageHeader } from "../components/layout/PageHeader";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-hawk-background font-hawk text-hawk-text lg:flex">
      <Sidebar activeHref="/" />

      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            eyebrow="CENTRAL DE MONITORAMENTO / 01"
            title="A cidade, em perspectiva."
            description="Uma leitura operacional dos cruzamentos e dos eventos registrados."
          />
        </div>
      </main>
    </div>
  );
}