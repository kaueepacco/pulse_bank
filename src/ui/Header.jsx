import { ShieldCheck, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function Header() {
  const session = useAuthStore((state) => state.session);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <header className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-accent/80">
          Pulse Bank
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white">
          Ola, {session?.user.name}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent">
          <ShieldCheck size={16} />
          Sessao protegida
        </div>
        <button
          type="button"
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-white/30 hover:bg-white/10"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </header>
  );
}
