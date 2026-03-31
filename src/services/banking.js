import {
  LOGIN_CREDENTIALS,
  MAX_LOGIN_ATTEMPTS,
  MOCK_USER,
  SESSION_TIMEOUT_MS,
  TRANSFER_PASSWORD,
} from '../lib/constants';
import {
  clearSession,
  loadAccount,
  loadLoginGuard,
  loadSession,
  saveAccount,
  saveLoginGuard,
  saveSession,
} from '../lib/storage';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login({ email, password }) {
  await delay(700);

  const guard = loadLoginGuard();
  const now = Date.now();

  if (guard.lockedUntil && now < guard.lockedUntil) {
    throw new Error('Acesso temporariamente bloqueado. Aguarde 1 minuto.');
  }

  if (
    email !== LOGIN_CREDENTIALS.email ||
    password !== LOGIN_CREDENTIALS.password
  ) {
    const attempts = guard.attempts + 1;
    const lockedUntil = attempts >= MAX_LOGIN_ATTEMPTS ? now + 60_000 : null;

    saveLoginGuard({
      attempts: lockedUntil ? 0 : attempts,
      lockedUntil,
    });

    throw new Error('Credenciais invalidas.');
  }

  saveLoginGuard({ attempts: 0, lockedUntil: null });

  const session = {
    user: MOCK_USER,
    token: crypto.randomUUID(),
    lastActivityAt: now,
    expiresAt: now + SESSION_TIMEOUT_MS,
  };

  saveSession(session);
  return session;
}

export async function logout() {
  await delay(100);
  clearSession();
}

export async function getSession() {
  await delay(150);
  const session = loadSession();

  if (!session) {
    return null;
  }

  if (Date.now() > session.expiresAt) {
    clearSession();
    return null;
  }

  return session;
}

export async function keepSessionAlive() {
  const session = loadSession();

  if (!session) {
    return null;
  }

  const nextSession = {
    ...session,
    lastActivityAt: Date.now(),
    expiresAt: Date.now() + SESSION_TIMEOUT_MS,
  };

  saveSession(nextSession);
  return nextSession;
}

export async function getAccountData() {
  await delay(250);
  return loadAccount();
}

export async function submitTransfer({
  recipient,
  amount,
  description,
  transferPassword,
}) {
  await delay(500);

  if (transferPassword !== TRANSFER_PASSWORD) {
    throw new Error('Senha de transferencia incorreta.');
  }

  const account = loadAccount();

  if (amount > account.balance) {
    throw new Error('Saldo insuficiente para concluir a transferencia.');
  }

  const transaction = {
    id: crypto.randomUUID(),
    type: 'expense',
    title: `Transferencia para ${recipient}`,
    amount: -Number(amount),
    createdAt: new Date().toISOString(),
    description: description || 'Transferencia realizada no app',
  };

  const nextAccount = {
    balance: Number((account.balance - Number(amount)).toFixed(2)),
    transactions: [transaction, ...account.transactions],
  };

  saveAccount(nextAccount);
  return nextAccount;
}
