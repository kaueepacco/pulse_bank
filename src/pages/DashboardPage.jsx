import { useQuery } from '@tanstack/react-query';
import { CreditCard, Landmark, Wallet } from 'lucide-react';
import { useSessionGuard } from '../hooks/useSessionGuard';
import { formatCurrency } from '../lib/utils';
import { getAccountData } from '../services/banking';
import { useAuthStore } from '../store/useAuthStore';
import { StatCard } from '../ui/StatCard';
import { TransactionList } from '../ui/TransactionList';
import { TransferForm } from '../ui/TransferForm';

export function DashboardPage() {
  useSessionGuard();

  const session = useAuthStore((state) => state.session);
  const accountQuery = useQuery({
    queryKey: ['account'],
    queryFn: getAccountData,
  });

  if (accountQuery.isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center text-white">
        Carregando dados da conta...
      </div>
    );
  }

  const account = accountQuery.data;
  const expenses = account.transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  return (
    <main className="grid flex-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <StatCard label="Saldo disponivel" value={formatCurrency(account.balance)} highlight>
            <Wallet className="text-accent" />
          </StatCard>
          <StatCard label="Saidas do periodo" value={formatCurrency(expenses)}>
            <CreditCard className="text-slate-300" />
          </StatCard>
          <StatCard
            label="Conta"
            value={`${session.user.agency} / ${session.user.account}`}
          >
            <Landmark className="text-slate-300" />
          </StatCard>
        </div>

        <TransactionList transactions={account.transactions} />
      </section>

      <aside className="space-y-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Seguranca
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">Camadas ativas</h2>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li>Bloqueio temporario apos multiplas tentativas de login.</li>
            <li>Sessao com expiracao automatica por inatividade.</li>
            <li>Transferencias exigem senha dedicada de 4 digitos.</li>
            <li>Rotas protegidas e validacao tipada nos formularios.</li>
          </ul>
        </section>

        <TransferForm />
      </aside>
    </main>
  );
}
