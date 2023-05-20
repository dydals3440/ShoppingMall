import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useQuery } from 'react-query';
import { getCart } from '../api/firebase';
import { CartItems } from '../components/CartItems';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import { PriceCard } from '../components/PriceCard';
import { Button } from '../components/ui/Button';

const SHIPPING_COST = 3000;
export const ShoppingCart = () => {
  const { uid } = useUserContext();
  const { isLoading, data: products } = useQuery(['carts'], () => getCart(uid));
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => (prev + parseInt(current.price)) & current.quantity,
      0
    );
  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        내 장바구니
      </p>
      {!hasProducts && (
        <p>장바구니에 상품이 없습니다. 상품을 선택해 추가해주세요!</p>
      )}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 px-8'>
            {products &&
              products.map((product) => (
                <CartItems key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className='flex justify-between mb-4 items-center md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING_COST} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총가격' price={totalPrice * SHIPPING_COST} />
          </div>
          <Button text='주문하기' />
        </>
      )}
    </section>
  );
};
