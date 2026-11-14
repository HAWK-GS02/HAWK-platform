"use client";

import {useCrossings} from "../../hooks/useCrossings";

export default function TesteApiPage() {
    const { crossings, loading, error, } = useCrossings();


    if(loading) {
        return <main className="p-8">Carregando cruzamentos...</main>;
    }

    if(error) {
        return <main className="p-8"><p>Erro ao carregar cruzamentos: {error}</p></main>;
    }

    return (
        <main className="p-8">
            <h1 className="mb-4 text-2xl font-bold">Conexão com a API HAWK</h1>

            {crossings.length === 0 ? (
                <p>Nenhum cruzamento cadastrado na API.</p>
            ) : (
                <ul className="space-y-3">
                    {crossings.map((crossing) => (
                        <li key={crossing.id} className="border p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">{crossing.nome}</h2>
                            <p>Bairro: {crossing.bairro}</p>
                            <p>Status: {crossing.status}</p>
                            <p>Largura da via: {crossing.largura_via_m} m</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}