"use client";

export default function Input({
  label,
  name,
  type = "text",
  asTextArea,
}: {
  label: string;
  name: string;
  type?: string;
  asTextArea?: boolean;
}) {
  return (
    <label className="text-sm">
      <div className="text-zinc-700" data-split>{label}</div>
      {asTextArea ? (
        <textarea
          name={name}
          className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 outline-none ring-0 focus:border-zinc-400"
          rows={5}
        />
      ) : (
        <input
          name={name}
          type={type}
          className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 outline-none ring-0 focus:border-zinc-400"
        />
      )}
    </label>
  );
}
