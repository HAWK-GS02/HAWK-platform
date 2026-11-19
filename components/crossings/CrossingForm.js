"use client"

import {useEffect, useState} from "react";

const initialForm = {
    nome: "",
    bairro: "",
    latitude: "",
    longitude: "",
    largura_via_m: "",
    status: "ativo",
};

export function CrossingForm({onSubmit, initialData, onCancel}) {
    const [formData, setFormData] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const isEditing = Boolean(initialData);

    useEffect(() => {
      setFormData({
        ...initialForm,
        ...initialData,
      });
    }, [initialData]);



    function handleChange(event){
        const {name, value} = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    async function handleSubmit(event){
        event.preventDefault();

        try{
            setSubmitting(true);
            setError("");
            setSuccessMessage("");

            await onSubmit({
                ...formData,
                latitude: Number(formData.latitude),
                longitude: Number(formData.longitude),
                largura_via_m: Number(formData.largura_via_m),
            });

            if (!isEditing) {
  setFormData(initialForm);
}

setSuccessMessage(
  isEditing
    ? "Cruzamento atualizado com sucesso."
    : "Cruzamento cadastrado com sucesso."
);
        }catch (err){
            setError(err.message);
        }finally {
            setSubmitting(false);
        }
    }

    return(
        <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-semibold">
        {isEditing ? "Editar cruzamento" : "Cadastrar cruzamento"}
      </h2>

      <p className="mt-1 text-sm text-gray-600">
        Preencha os dados de localização e configuração da travessia.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-1">
          <span className="text-sm font-medium">
            Nome do cruzamento
          </span>
          <input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="rounded-md border border-gray-300 p-2"
            required
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Bairro</span>
          <input
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            className="rounded-md border border-gray-300 p-2"
            required
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Latitude</span>
            <input
              name="latitude"
              type="number"
              min="-90"
              max="90"
              step="any"
              value={formData.latitude}
              onChange={handleChange}
              className="rounded-md border border-gray-300 p-2"
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Longitude</span>
            <input
              name="longitude"
              type="number"
              min="-180"
              max="180"
              step="any"
              value={formData.longitude}
              onChange={handleChange}
              className="rounded-md border border-gray-300 p-2"
              required
            />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm font-medium">
            Largura da via, em metros
          </span>
          <input
            name="largura_via_m"
            type="number"
            min="0.1"
            step="0.1"
            value={formData.largura_via_m}
            onChange={handleChange}
            className="rounded-md border border-gray-300 p-2"
            required
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="ativo">Ativo</option>
            <option value="manutencao">Manutenção</option>
            <option value="inativo">Inativo</option>
          </select>
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-700">
            Erro: {error}
          </p>
        )}

        {successMessage && (
          <p role="status" className="text-sm text-green-700">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting
  ? "Salvando..."
  : isEditing
    ? "Salvar alterações"
    : "Cadastrar cruzamento"}
        </button>
        {isEditing && (
  <button
    type="button"
    onClick={onCancel}
    className="rounded-md border border-gray-300 px-4 py-2 font-medium text-slate-700"
  >
    Cancelar edição
  </button>
)}
      </form>
    </section>
    );
}