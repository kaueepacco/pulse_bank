import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../lib/utils';

export function TransactionList({ transactions }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Extrato
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">
            Ultimas transacoes
          </h2>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {transactions.map((transaction) => {
          const isIncome = transaction.amount > 0;

          return (
            <article
              key={transaction.id}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-slate-950/40 px-4 py-4"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                  isIncome
                    ? 'bg-accent/15 text-accent'
                    : 'bg-danger/15 text-danger'
                }`}
              >
                {isIncome ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <strong className="truncate text-white">{transaction.title}</strong>
                  <span
                    className={`text-sm font-semibold ${
                      isIncome ? 'text-accent' : 'text-danger'
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
                  <span>{transaction.description}</span>
                  <span>{formatDate(transaction.createdAt)}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
