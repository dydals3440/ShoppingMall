import React from 'react';
import { useNavigate } from 'react-router-dom';
export const ProductCard = ({
  // product를 구조분해할당을 했기 때문에 product에 접근을 못하므로 한번더 인자로 정리해줌
  product,
  product: { id, image, title, category, price },
}) => {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        // product : product => product라고만 작성해도됨
        navigate(`/products/${id}`, { state: { product: product } });
      }}
      className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'
    >
      <img className='w-full' src={image} alt={title} />
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='truncate'>{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-600'>{category}</p>
    </li>
  );
};
