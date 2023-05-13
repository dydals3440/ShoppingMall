import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
export const Header = () => {
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
        <button>Login</button>
      </nav>
    </header>
  );
};
