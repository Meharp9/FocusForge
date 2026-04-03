'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect, useRef } from 'react';
import { isTokenExpired } from '@/utils';

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const checked = useRef(false);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;

    const token = localStorage.getItem('access_token');
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('access_token');
      window.location.href = '/auth';
    }
  }, []);

  return <>{children}</>;
};

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthGate>{children}</AuthGate>
    </Provider>
  );
};

export default StoreProvider;
