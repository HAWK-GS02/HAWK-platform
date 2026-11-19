"use client";

import { useState } from "react";
import { EventsPeriodFilter } from "../../components/events/EventsPeriodFilter";
import { useEvents } from "../../hooks/useEvents";
import { useCrossings } from "../../hooks/useCrossings";
import { EventsFilters } from "../../components/events/EventsFilters";
import { EventsList } from "../../components/events/EventsList";

export default function HistoryPage() {
  const {
    events,
    filters,
    loading,
    error,
    changeFilter,
    resetFilters,
    reloadEvents,
    applyPeriod,
  } = useEvents();

  const {
    crossings,
    loading: crossingsLoading,
    error: crossingsError,
  } = useCrossings();

  const crossingNames = Object.fromEntries(
    crossings.map((crossing) => [crossing.id, crossing.nome])
  );

  const [periodKey, setPeriodKey] = useState(0);

function handleResetFilters() {
  resetFilters();
  setPeriodKey((current) => current + 1);
}

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6 md:p-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">
            HAWK Control
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Histórico
          </h1>

          <p className="mt-2 text-gray-600">
            Consulte os eventos operacionais dos cruzamentos.
          </p>
        </div>

        <button
          type="button"
          onClick={reloadEvents}
          disabled={loading}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Atualizando..." : "Atualizar histórico"}
        </button>
      </header>

      <EventsFilters
        filters={filters}
        onFilterChange={changeFilter}
        onReset={handleResetFilters}
        crossings={crossings}
        crossingsLoading={crossingsLoading}
        crossingsError={crossingsError}
      />

      <EventsPeriodFilter
  key={periodKey}
  onApply={applyPeriod}
/>

      <EventsList
        events={events}
        loading={loading}
        error={error}
        onRetry={reloadEvents}
        crossingNames={crossingNames}
        limit={filters.limite}
      />
    </main>
  );
}