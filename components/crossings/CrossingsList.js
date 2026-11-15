import Link from "next/link";

const statusLabels = {
    ativo: "Ativo",
    manutencao: "Em manutenção",
    inativo: "Inativo",
};

const statusStyles = {
  ativo: "bg-green-100 text-green-800",
  manutencao: "bg-amber-100 text-amber-800",
  inativo: "bg-gray-200 text-gray-800",
};

export function CrossingsList({ crossings, loading, error }) {
  if (loading) {
    return (
      <section aria-live="polite">
        <p>Carregando cruzamentos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section aria-live="assertive">
        <p className="text-red-700">
          Não foi possível carregar os cruzamentos: {error}
        </p>
      </section>
    );
  }

  if (crossings.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-gray-300 p-6">
        <h2 className="font-semibold">Nenhum cruzamento cadastrado</h2>
        <p className="mt-1 text-sm text-gray-600">
          Cadastre o primeiro cruzamento para iniciar o monitoramento.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Cruzamentos cadastrados
        </h2>

        <p className="text-sm text-gray-600">
          {crossings.length} registrado(s)
        </p>
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {crossings.map((crossing) => (
          <li
            key={crossing.id}
            className="rounded-lg border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{crossing.nome}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {crossing.bairro}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[crossing.status]}`}
              >
                {statusLabels[crossing.status] || crossing.status}
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-gray-500">Largura da via</dt>
                <dd className="font-medium">
                  {crossing.largura_via_m} m
                </dd>
              </div>

              <div>
                <dt className="text-gray-500">Coordenadas</dt>
                <dd className="font-medium">
                  {crossing.latitude}, {crossing.longitude}
                </dd>
              </div>
            </dl>

            <Link
              href={`/cruzamentos/${crossing.id}`}
              className="mt-5 inline-flex text-sm font-medium text-slate-900 underline underline-offset-4"
            >
              Ver detalhes
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}