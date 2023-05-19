import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useQuery } from 'react-query';
import { getCart } from '../api/firebase';
import { CartItems } from '../components/CartItems';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import { PriceCard } from '../components/PriceCard';

const SHIPPING_COST = 3000;
export const ShoppingCart = () => {
  const { uid } = useUserContext();
  const { isLoading, data: products } = useQuery(['carts'], () => getCart(uid));
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => (prev + parseInt(current.price)) & current.quantity
    );
  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  return (
    <section>
      <p>내 장바구니</p>
      {!hasProducts && (
        <p>장바구니에 상품이 없습니다. 상품을 선택해 추가해주세요!</p>
      )}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItems key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill />
            <PriceCard text='배송액' price={SHIPPING_COST} />
            <FaEquals />
            <PriceCard text='총가격' price={totalPrice * SHIPPING_COST} />
          </div>
        </>
      )}
    </section>
  );
};
