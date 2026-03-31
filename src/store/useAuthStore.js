import { create } from 'zustand';
import { getSession, keepSessionAlive, login, logout } from '../services/banking';

export const useAuthStore = create((set) => ({
  session: null,
  loading: false,
  hydrated: false,
  error: null,
  async hydrate() {
    set({ loading: true });
    const session = await getSession();
    set({ session, loading: false, hydrated: true });
  },
  async signIn(values) {
    set({ error: null, loading: true });

    try {
      const session = await login(values);
      set({ session, loading: false, hydrated: true });
      return session;
    } catch (error) {
      set({ error: error.message, loading: false, hydrated: true });
      throw error;
    }
  },
  async signOut() {
    set({ loading: true });
    await logout();
    set({ session: null, loading: false, error: null, hydrated: true });
  },
  async touch() {
    const session = await keepSessionAlive();
    set({ session });
  },
}));
