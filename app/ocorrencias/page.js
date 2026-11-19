"use client";

import { useOccurrences } from "../../hooks/useOccurrences";
import { OccurrencesFilters } from "../../components/occurrences/OccurrencesFilters";
import { OccurrencesList } from "../../components/occurrences/OccurrencesList";

export default function OccurrencesPage() {
  const {
    occurrences,
    filters,
    loading,
    error,
    changeFilter,
    loadOccurrences,
  } = useOccurrences();

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6 md:p-8">
      <header>
        <p className="text-sm font-medium text-slate-600">
          HAWK Control
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Ocorrências
        </h1>

        <p className="mt-2 text-gray-600">
          Acompanhe as ocorrências dos cruzamentos monitorados.
        </p>
      </header>

      <OccurrencesFilters
        filters={filters}
        onFilterChange={changeFilter}
      />

      <OccurrencesList
        occurrences={occurrences}
        loading={loading}
        error={error}
        onRetry={loadOccurrences}
      />
    </main>
  );
}