import React, { useEffect, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';
import { User } from './User';
import { Button } from './ui/Button';
import { useUserContext } from '../context/UserContext';

export const Header = () => {
  const { user, login, logout } = useUserContext();
  return (
    <header className='flex justify-between border-b border-gray-400 p-3'>
      <Link to='/' className='flex font text-4xl text-brand'>
        <MdShoppingCart />
        <h1>ShoppingMall</h1>
      </Link>
      <nav className='flex flex-row items-center text-2xl gap-4'>
        <Link to='/products'>Products</Link>
        {user && <Link to='/carts'>Carts</Link>}
        {user && user.isAdmin && (
          <Link to='/products/new'>
            <BsFillPencilFill />
          </Link>
        )}
        {!user && <Button text={'LogIn'} onClick={login} />}
        {user && (
          <>
            <User user={user} />
            <Button text={'Logout'} onClick={logout} />
          </>
        )}
      </nav>
    </header>
  );
};
