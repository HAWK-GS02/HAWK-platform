export function MetricCard({ title, value, unit, description }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="text-sm font-medium text-gray-600">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        {value ?? "—"}

        {unit && (
          <span className="ml-1 text-base font-medium text-gray-500">
            {unit}
          </span>
        )}
      </p>

      {description && (
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      )}
    </article>
  );
}