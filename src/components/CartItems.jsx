import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { addOrUpdateToCart, removeFromCart } from '../api/firebase';

export const CartItems = ({
  product,
  product: { id, image, options, price, quantity, title },
  uid,
}) => {
  const handleMinus = () => {
    // 수량이 1개인 경우 더이상 마이너스 할 수 없으므로 보호처리
    if (quantity < 2) return alert('상품은 0개가 될 수 없습니다.');
    // 정의해둔 함수를 호출해서, 기존의 product는 유지하지만, 수량 부분만 변경
    addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });

  const handleDelete = () => {
    removeFromCart(uid, id);
    alert('정상적으로 삭제되었습니다.');
  };
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <p>{title}</p>
        <p>{options}</p>
        <div>
          <AiOutlineMinusSquare onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare onClick={handlePlus} />
          <RiDeleteBin5Fill onCLick={handleDelete} />
        </div>
      </div>
    </li>
  );
};
