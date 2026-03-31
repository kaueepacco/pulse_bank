import { initialAccount } from './mockData';

const ACCOUNT_KEY = 'pulsebank.account';
const SESSION_KEY = 'pulsebank.session';
const LOGIN_GUARD_KEY = 'pulsebank.login-guard';

export function loadAccount() {
  const data = localStorage.getItem(ACCOUNT_KEY);
  return data ? JSON.parse(data) : initialAccount;
}

export function saveAccount(account) {
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
}

export function loadSession() {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function loadLoginGuard() {
  const data = localStorage.getItem(LOGIN_GUARD_KEY);
  return data ? JSON.parse(data) : { attempts: 0, lockedUntil: null };
}

export function saveLoginGuard(guard) {
  localStorage.setItem(LOGIN_GUARD_KEY, JSON.stringify(guard));
}
