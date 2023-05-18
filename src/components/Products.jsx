import React from 'react';
import { getProduct } from '../api/firebase';
import { useQuery } from 'react-query';
import { ProductCard } from './ProductCard';

export const Products = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(['products'], getProduct); // firebase에서 정의한 getProduct를 통해 모든 제품의 정보를 가져옴
  return (
    <>
      {isLoading && <p>Loading....</p>}
      {error && <p>{error}</p>}
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-3'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
};
