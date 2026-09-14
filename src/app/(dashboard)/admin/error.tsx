'use client';

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold text-red-600">Erro no Painel</h2>
      <p className="mt-2 max-w-md text-sm text-slate-600">
        Não foi possível concluir esta operação. Tente novamente em instantes.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        Tentar novamente
      </button>
    </div>
  );
}