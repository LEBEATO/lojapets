"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { data, error } = await authService.login(email, password);

    if (error || !data) {
      setErrorMsg("Credenciais incorretas ou acesso não autorizado.");
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-black text-center text-slate-800 mb-6">🔒 Restrito à Administração</h2>
        
        {errorMsg && (
          <p className="text-red-500 text-xs text-center mb-4 bg-red-50 p-2.5 rounded-lg border border-red-100 font-medium">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="E-mail profissional" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-sm"
            required
          />
          <input 
            type="password" 
            placeholder="Senha de acesso" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-sm"
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-xl font-bold transition-colors text-sm disabled:bg-slate-300"
          >
            {loading ? "Verificando chaves..." : "Autenticar"}
          </button>
        </form>
      </div>
    </div>
  );
}