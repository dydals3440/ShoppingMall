import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addNewProduct, getProducts as fetchProducts } from '../api/firebase';

// 한 곳에서 동일한 캐시키로, 데이터를 읽어오는 것과 업데이트 하는 것이 함께 있으니, staletime이 얼마까지 있는지, 이것을 invalidate 해야하는지 말아야하는지 관리하기 편해지게 훅으로 만듬.
export default function useProducts() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery(['products'], fetchProducts, {
    staleTime: 1000 * 60,
  });
  const addProducts = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(['products']),
    }
  );
  // 커스텀 훅을 사용하는 사람이 두가지를 가져갈 수 있도록 만들어줌!
  return { productsQuery, addProducts };
}
