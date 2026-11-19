const priorityLabels = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

const priorityStyles = {
  baixa: "bg-blue-100 text-blue-800",
  media: "bg-amber-100 text-amber-800",
  alta: "bg-red-100 text-red-800",
};

const situationLabels = {
  aberta: "Aberta",
  em_andamento: "Em andamento",
  resolvida: "Resolvida",
};

export function OccurrencesList({
  occurrences,
  loading,
  error,
  onRetry,
  onEdit,
  onDelete,
  onSituationChange,
  actionsDisabled,
}) {
  if (loading) {
    return <p role="status">Carregando ocorrências...</p>;
  }

  if (error) {
    return (
      <section className="rounded-lg border border-red-200 p-5">
        <p role="alert" className="text-sm text-red-700">
          Não foi possível carregar as ocorrências: {error}
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

  if (occurrences.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-gray-300 p-6">
        <h2 className="font-semibold">Nenhuma ocorrência encontrada</h2>

        <p className="mt-1 text-sm text-gray-600">
          Não há registros para os filtros selecionados.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Ocorrências encontradas">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Ocorrências</h2>

        <p className="text-sm text-gray-600">
          {occurrences.length} registro(s)
        </p>
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {occurrences.map((occurrence) => (
          <li
            key={occurrence.id}
            className="rounded-lg border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold">{occurrence.tipo}</h3>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  priorityStyles[occurrence.prioridade] ??
                  "bg-gray-100 text-gray-800"
                }`}
              >
                Prioridade:{" "}
                {priorityLabels[occurrence.prioridade] ?? occurrence.prioridade}
              </span>
            </div>

            <p className="mt-3 whitespace-pre-wrap text-sm text-gray-600">
              {occurrence.descricao}
            </p>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Situação</dt>
                <dd className="font-medium">
                  {situationLabels[occurrence.situacao] ?? occurrence.situacao}
                </dd>
              </div>

              <div>
                <dt className="text-gray-500">ID do cruzamento</dt>
                <dd className="break-all font-medium">
                  {occurrence.cruzamento_id}
                </dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onEdit(occurrence)}
                disabled={actionsDisabled}
                className="text-sm font-medium text-blue-700 underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => onDelete(occurrence)}
                disabled={actionsDisabled}
                className="text-sm font-medium text-red-700 underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                Excluir
              </button>

              {occurrence.situacao === "aberta" && (
                <button
                  type="button"
                  onClick={() => onSituationChange(occurrence, "em_andamento")}
                  disabled={actionsDisabled}
                  className="text-sm font-medium text-amber-800 underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Iniciar atendimento
                </button>
              )}

              {occurrence.situacao === "em_andamento" && (
                <button
                  type="button"
                  onClick={() => onSituationChange(occurrence, "resolvida")}
                  disabled={actionsDisabled}
                  className="text-sm font-medium text-green-700 underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Marcar como resolvida
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
