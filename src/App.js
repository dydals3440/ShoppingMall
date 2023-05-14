import React from 'react';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';

export default function App() {
  return (
    <UserContextProvider>
      <Header />
      <Outlet />
    </UserContextProvider>
  );
}
