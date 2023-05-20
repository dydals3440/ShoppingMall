import React from 'react';
import { ProductCard } from './ProductCard';
import useProducts from '../hooks/useProducts';

export const Products = () => {
  // const {
  //   isLoading,
  //   error,
  //   data: products,
  // } = useQuery(['products'], getProduct, { staleTime: 1000 * 60 }); // firebase에서 정의한 getProduct를 통해 모든 제품의 정보를 가져옴 위의 코드를 훅으로 만들어 사용
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();
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
