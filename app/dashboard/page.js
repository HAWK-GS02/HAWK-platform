"use client";

import { useDashboard } from "../../hooks/useDashboard";
import { DashboardMetrics } from "../../components/dashboard/DashboardMetrics";
import { CrossingsReportTable } from "../../components/dashboard/CrossingsReportTable";

const summaryMetrics = [
  {
    field: "total_travessias",
    title: "Travessias",
  },
  {
    field: "total_extensoes",
    title: "Extensões",
  },
  {
    field: "total_falhas",
    title: "Falhas",
  },
  {
    field: "total_ocorrencias",
    title: "Ocorrências",
  },
];

const timeMetrics = [
  {
    field: "tempo_medio_espera_s",
    title: "Tempo médio de espera",
    unit: "s",
    decimals: 1,
  },
  {
    field: "tempo_medio_travessia_s",
    title: "Tempo médio de travessia",
    unit: "s",
    decimals: 1,
  },
  {
    field: "percentual_extensoes",
    title: "Taxa de extensões",
    unit: "%",
    decimals: 1,
  },
];

export default function DashboardPage() {
  const {
    summary,
    times,
    crossings,
    loading,
    reloadDashboard,
  } = useDashboard();

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">
            HAWK Control
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-gray-600">
            Visão consolidada dos dados operacionais registrados
            no sistema HAWK.
          </p>
        </div>

        <button
          type="button"
          onClick={reloadDashboard}
          disabled={loading}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Atualizando..." : "Atualizar relatórios"}
        </button>
      </header>

      <DashboardMetrics
        title="Resumo operacional"
        report={summary}
        metrics={summaryMetrics}
        loading={loading}
      />

      <DashboardMetrics
        title="Tempos e extensões"
        report={times}
        metrics={timeMetrics}
        loading={loading}
      />

      <CrossingsReportTable
        report={crossings}
        loading={loading}
      />
    </main>
  );
}