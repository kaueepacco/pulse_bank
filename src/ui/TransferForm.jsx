import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowRightLeft, LoaderCircle, LockKeyhole } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { submitTransfer } from '../services/banking';

const transferSchema = z.object({
  recipient: z.string().min(3, 'Informe o destinatario.'),
  amount: z
    .coerce.number()
    .positive('O valor deve ser maior que zero.')
    .max(100000, 'Valor acima do limite permitido.'),
  description: z.string().max(60, 'Use no maximo 60 caracteres.').optional(),
  transferPassword: z
    .string()
    .min(4, 'A senha precisa ter 4 digitos.')
    .max(4, 'A senha precisa ter 4 digitos.'),
});

export function TransferForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      recipient: '',
      amount: '',
      description: '',
      transferPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: submitTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
      reset();
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Transferencias
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">
            Nova transferencia
          </h2>
        </div>

        <div className="rounded-2xl border border-warning/25 bg-warning/10 p-3 text-warning">
          <LockKeyhole size={20} />
        </div>
      </div>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <Field
          label="Destinatario"
          placeholder="Ex.: Maria Silva"
          error={errors.recipient?.message}
          registration={register('recipient')}
        />

        <Field
          label="Valor"
          placeholder="0,00"
          error={errors.amount?.message}
          registration={register('amount')}
          inputMode="decimal"
        />

        <Field
          label="Descricao"
          placeholder="Opcional"
          error={errors.description?.message}
          registration={register('description')}
        />

        <Field
          label="Senha de transferencia"
          placeholder="4 digitos"
          error={errors.transferPassword?.message}
          registration={register('transferPassword')}
          type="password"
          maxLength={4}
        />

        {mutation.error ? (
          <p className="rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
            {mutation.error.message}
          </p>
        ) : null}

        {mutation.isSuccess ? (
          <p className="rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent">
            Transferencia realizada com sucesso.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3 font-semibold text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {mutation.isPending ? (
            <LoaderCircle className="animate-spin" size={18} />
          ) : (
            <ArrowRightLeft size={18} />
          )}
          Confirmar transferencia
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  error,
  registration,
  type = 'text',
  ...props
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <input
        type={type}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-accent/50"
        {...registration}
        {...props}
      />
      {error ? <span className="mt-2 block text-sm text-danger">{error}</span> : null}
    </label>
  );
}
