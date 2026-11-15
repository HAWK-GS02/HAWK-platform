"use client";

import { CrossingForm } from "../../components/crossings/CrossingForm";
import { CrossingsList } from "../../components/crossings/CrossingsList";
import {useCrossings} from "../../hooks/useCrossings";


export default function CrossingsPage() {
    const { crossings, loading, error, addCrossing, } = useCrossings();


    return (
    <main className="mx-auto max-w-6xl space-y-8 p-6 md:p-8">
      <header>
        <p className="text-sm font-medium text-slate-600">
          HAWK Control
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Cruzamentos
        </h1>

        <p className="mt-2 max-w-2xl text-gray-600">
          Gerencie os cruzamentos monitorados pelo sistema HAWK.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <CrossingForm onCreate={addCrossing} />

        <CrossingsList
          crossings={crossings}
          loading={loading}
          error={error}
        />
      </div>
    </main>
  );
}