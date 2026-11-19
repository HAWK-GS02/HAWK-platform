import Link from "next/link";
import {
  eventTypeLabels,
  eventOriginLabels,
  formatEventDate,
} from "../../utils/eventPresentation";

export function EventsList({
  events,
  loading,
  error,
  onRetry,
  crossingNames,
  limit,
}) {
  if (loading) {
    return <p role="status">Carregando eventos...</p>;
  }

  if (error) {
    return (
      <section className="rounded-lg border border-red-200 p-5">
        <p role="alert" className="text-sm text-red-700">
          Não foi possível carregar o histórico: {error}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-sm font-medium underline"
        >
          Tentar novamente
        </button>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-gray-300 p-6">
        <h2 className="font-semibold">Nenhum evento encontrado</h2>
        <p className="mt-1 text-sm text-gray-600">
          Não há eventos para os filtros selecionados.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Eventos registrados">
      <p className="mb-4 text-sm text-gray-600">
        {events.length} evento(s) exibido(s), do mais recente para o
        mais antigo. Limite da consulta: {limit}.
      </p>

      <ul className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <li
            key={event.id}
            className="rounded-lg border border-gray-200 bg-white p-5"
          >
            <h2 className="font-semibold">
              {eventTypeLabels[event.tipo] ?? event.tipo}
            </h2>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Cruzamento</dt>
                <dd className="break-all font-medium">
                  {crossingNames[event.cruzamento_id] ??
                    event.cruzamento_id}
                </dd>
              </div>

              <div>
                <dt className="text-gray-500">Origem</dt>
                <dd>
                  {eventOriginLabels[event.origem] ?? event.origem}
                </dd>
              </div>

              <div>
                <dt className="text-gray-500">
                  Data e hora — São Paulo
                </dt>
                <dd>{formatEventDate(event.data_hora)}</dd>
              </div>
            </dl>

            <Link
              href={`/historico/${encodeURIComponent(event.id)}`}
              className="mt-5 inline-block text-sm font-medium text-blue-700 underline"
            >
              Ver detalhes
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}