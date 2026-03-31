import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SESSION_TIMEOUT_MS } from '../lib/constants';
import { useAuthStore } from '../store/useAuthStore';

export function useSessionGuard(enabled = true) {
  const navigate = useNavigate();
  const session = useAuthStore((state) => state.session);
  const signOut = useAuthStore((state) => state.signOut);
  const touch = useAuthStore((state) => state.touch);

  useEffect(() => {
    if (!enabled || !session) {
      return undefined;
    }

    const handleActivity = () => {
      touch();
    };

    const handleExpiry = async () => {
      await signOut();
      navigate('/login', {
        replace: true,
        state: { reason: 'Sua sessao expirou por inatividade.' },
      });
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);

    const timer = window.setTimeout(handleExpiry, SESSION_TIMEOUT_MS);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.clearTimeout(timer);
    };
  }, [enabled, navigate, session, signOut, touch]);
}
