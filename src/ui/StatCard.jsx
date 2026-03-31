import { cn } from '../lib/utils';

export function StatCard({ label, value, highlight = false, children }) {
  return (
    <section
      className={cn(
        'rounded-[2rem] border p-6 backdrop-blur',
        highlight
          ? 'border-accent/30 bg-accent/10 shadow-glow'
          : 'border-white/10 bg-white/5',
      )}
    >
      <p className="text-sm text-slate-300">{label}</p>
      <div className="mt-3 flex items-start justify-between gap-4">
        <strong className="text-3xl font-bold text-white">{value}</strong>
        {children}
      </div>
    </section>
  );
}
