'use client';

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-red-600">Erro no Painel</h2>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button 
        onClick={reset} 
        className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
      >
        Tentar novamente
      </button>
    </div>
  );
}