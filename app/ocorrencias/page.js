"use client";

import { useState } from "react";
import { useOccurrences } from "../../hooks/useOccurrences";
import { useCrossings } from "../../hooks/useCrossings";
import { OccurrenceForm } from "../../components/occurrences/OccurrenceForm";
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
    addOccurrence,
    editOccurrence,
    removeOccurrence,
    changeSituation,
  } = useOccurrences();

  const {
    crossings,
    loading: crossingsLoading,
    error: crossingsError,
  } = useCrossings();

  const [editingOccurrence, setEditingOccurrence] = useState(null);
  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionPending, setActionPending] = useState(false);

  async function handleSubmit(data) {
    setMessage("");

    if (editingOccurrence) {
      await editOccurrence(editingOccurrence.id, data);
      setEditingOccurrence(null);
      setMessage("Ocorrência atualizada com sucesso.");
      return;
    }

    await addOccurrence(data);
  }

  function handleEdit(occurrence) {
    setMessage("");
    setEditingOccurrence(occurrence);
  }

  function handleCancelEdit() {
    setEditingOccurrence(null);
  }

  async function handleDelete(occurrence) {
    if (actionPending) return;

    const confirmed = window.confirm(
      `Deseja excluir a ocorrência "${occurrence.tipo}"?`,
    );

    if (!confirmed) return;

    try {
      setActionPending(true);
      setActionError("");
      setMessage("");

      await removeOccurrence(occurrence.id);

      if (editingOccurrence?.id === occurrence.id) {
        setEditingOccurrence(null);
      }

      setMessage("Ocorrência excluída com sucesso.");
    } catch (err) {
      setActionError(err.message || "Não foi possível excluir a ocorrência.");
    } finally {
      setActionPending(false);
    }
  }

  async function handleSituationChange(occurrence, situacao) {
    if (actionPending) return;

    try {
      setActionPending(true);
      setActionError("");
      setMessage("");

      await changeSituation(occurrence.id, situacao);

      setMessage("Situação atualizada com sucesso.");
    } catch (err) {
      setActionError(err.message || "Não foi possível atualizar a situação.");
    } finally {
      setActionPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6 md:p-8">
      <header>
        <p className="text-sm font-medium text-slate-600">HAWK Control</p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">Ocorrências</h1>

        <p className="mt-2 text-gray-600">
          Gerencie as ocorrências dos cruzamentos monitorados.
        </p>
      </header>

      {message && (
        <p role="status" className="text-sm text-green-700">
          {message}
        </p>
      )}

      {actionError && (
  <p role="alert" className="text-sm text-red-700">
    {actionError}
  </p>
)}

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <OccurrenceForm
          key={editingOccurrence?.id ?? "new"}
          initialData={editingOccurrence}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
          crossings={crossings}
          crossingsLoading={crossingsLoading}
          crossingsError={crossingsError}
        />

        <div className="space-y-6">
          <OccurrencesFilters filters={filters} onFilterChange={changeFilter} />

          <OccurrencesList
  occurrences={occurrences}
  loading={loading}
  error={error}
  onRetry={loadOccurrences}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onSituationChange={handleSituationChange}
  actionsDisabled={actionPending || Boolean(editingOccurrence)}
/>
        </div>
      </div>
    </main>
  );
}
