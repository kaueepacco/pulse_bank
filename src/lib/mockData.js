export const initialTransactions = [
  {
    id: 'txn-001',
    type: 'income',
    title: 'Salario Tech Corp',
    amount: 8400,
    createdAt: '2026-03-30T08:00:00.000Z',
    description: 'Credito em conta',
  },
  {
    id: 'txn-002',
    type: 'expense',
    title: 'Supermercado Aurora',
    amount: -248.9,
    createdAt: '2026-03-30T19:10:00.000Z',
    description: 'Debito via cartao virtual',
  },
  {
    id: 'txn-003',
    type: 'expense',
    title: 'Streaming Plus',
    amount: -39.9,
    createdAt: '2026-03-29T22:20:00.000Z',
    description: 'Assinatura mensal',
  },
  {
    id: 'txn-004',
    type: 'income',
    title: 'Cashback Pulse',
    amount: 18.2,
    createdAt: '2026-03-28T13:00:00.000Z',
    description: 'Retorno promocional',
  },
  {
    id: 'txn-005',
    type: 'income',
    title: 'Freelance Web Design',
    amount: 1200,
    createdAt: '2026-03-27T10:00:00.000Z',
    description: 'Projeto de redesign de website',
  }
];

export const initialAccount = {
  balance: 12840.52,
  transactions: initialTransactions,
};
