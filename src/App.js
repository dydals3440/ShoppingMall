import React from 'react';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Header />
        <Outlet />
      </UserContextProvider>
    </QueryClientProvider>
  );
}
