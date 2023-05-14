import React, { useEffect, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';
import { User } from './User';

export const Header = () => {
  const [user, setUser] = useState();
  // , useEffect 훅 내에서 onUserStateChange 함수를 호출하면 페이지가 렌더링될 때 해당 함수가 실행되고, 이때 onAuthStateChanged 메서드가 작동하여 사용자 인증 상태의 변경을 감지합니다. 그리고 인증 상태가 변경되면 전달한 콜백 함수가 호출됩니다.
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);
  return (
    <header className='flex justify-between border-b border-gray-400 p-3'>
      <Link to='/' className='flex font text-4xl text-brand'>
        <MdShoppingCart />
        <h1>ShoppingMall</h1>
      </Link>
      <nav className='flex flex-row items-center text-2xl gap-4'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new'>
          <BsFillPencilFill />
        </Link>
        {!user ? (
          <button
            className='bg-brand p-2 rounded-md text-white  ease-in duration-300 hover:scale-110'
            onClick={login}
          >
            Login
          </button>
        ) : (
          <>
            <User user={user} />
            <button
              className='bg-brand p-2 rounded-md text-white  ease-in duration-300 hover:scale-110'
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};
