"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import { useEvent } from "../../../hooks/useEvent";
import { EventDetails } from "../../../components/events/EventDetails";

function EventDetailsContent() {
  const { id } = useParams();

  const {
    event,
    loading,
    error,
    reloadEvent,
  } = useEvent(id);

  return (
    <main className="mx-auto max-w-4xl space-y-8 p-6 md:p-8">
      <header>
        <Link
          href="/historico"
          className="text-sm font-medium text-blue-700 underline"
        >
          Voltar ao histórico
        </Link>

        <p className="mt-5 text-sm font-medium text-slate-600">
          HAWK Control
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Detalhe do evento
        </h1>

        <p className="mt-2 text-gray-600">
          Consulte os dados registrados neste evento operacional.
        </p>
      </header>

      {loading ? (
        <p role="status">Carregando evento...</p>
      ) : error ? (
        <section className="rounded-lg border border-red-200 p-5">
          <p role="alert" className="text-sm text-red-700">
            Não foi possível carregar o evento: {error}
          </p>

          <button
            type="button"
            onClick={reloadEvent}
            className="mt-3 text-sm font-medium underline"
          >
            Tentar novamente
          </button>
        </section>
      ) : event ? (
        <EventDetails event={event} />
      ) : (
        <p role="status">Nenhum dado de evento disponível.</p>
      )}
    </main>
  );
}

export default function EventDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-4xl p-6 md:p-8">
          <p role="status">Preparando detalhe do evento...</p>
        </main>
      }
    >
      <EventDetailsContent />
    </Suspense>
  );
}