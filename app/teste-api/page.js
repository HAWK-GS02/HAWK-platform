"use client";

import { useEffect, useState } from "react";
import { getCrossings } from "../../services/crossingsService";

export default function TesteApiPage() {
    const [crossings, setCrossings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCrossings() {
            try {
                const data = await getCrossings();
                setCrossings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadCrossings();
    }, []);

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
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}