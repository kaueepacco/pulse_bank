import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore';

const loginSchema = z.object({
  email: z.string().email('Digite um email valido.'),
  password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres.'),
});

export function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const hydrate = useAuthStore((state) => state.hydrate);
  const signIn = useAuthStore((state) => state.signIn);
  const session = useAuthStore((state) => state.session);
  const hydrated = useAuthStore((state) => state.hydrated);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'cliente@pulsebank.com',
      password: '123456',
    },
  });

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrate, hydrated]);

  useEffect(() => {
    if (session) {
      navigate('/', { replace: true });
    }
  }, [navigate, session]);

  const onSubmit = handleSubmit(async (values) => {
    await signIn(values);
    navigate('/', { replace: true });
  });

  return (
    <main className="grid min-h-screen bg-mesh px-4 py-6 text-mist sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
      <section className="flex items-center justify-center py-8">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-accent/80">
            Pulse Bank
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-tight text-white">
            Seu banco digital com foco em clareza, velocidade e seguranca.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-slate-300">
            Projeto demonstrativo com login mock, dashboard financeiro e
            transferencias protegidas por senha.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoCard title="Sessao protegida" text="Expiracao por inatividade e rotas privadas." />
            <InfoCard title="Transferencia segura" text="Validacao com formulario tipado e senha dedicada." />
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center py-8">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Entrar
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Acesse sua conta
              </h2>
            </div>

            <div className="rounded-2xl border border-accent/20 bg-accent/10 p-3 text-accent">
              <ShieldCheck size={20} />
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <LoginField
              label="Email"
              registration={register('email')}
              error={errors.email?.message}
            />
            <LoginField
              label="Senha"
              type="password"
              registration={register('password')}
              error={errors.password?.message}
            />

            {location.state?.reason ? (
              <p className="rounded-2xl border border-warning/20 bg-warning/10 px-4 py-3 text-sm text-warning">
                {location.state.reason}
              </p>
            ) : null}

            {error ? (
              <p className="rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-accent px-4 py-3 font-semibold text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Validando acesso...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            Use o login mock:
            <br />
            Email: cliente@pulsebank.com
            <br />
            Senha: 123456
            <br />
            Senha de transferencia: 4321
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, text }) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
      <strong className="text-white">{title}</strong>
      <p className="mt-2 text-sm text-slate-300">{text}</p>
    </article>
  );
}

function LoginField({ label, error, registration, type = 'text' }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <input
        type={type}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-accent/50"
        {...registration}
      />
      {error ? <span className="mt-2 block text-sm text-danger">{error}</span> : null}
    </label>
  );
}
