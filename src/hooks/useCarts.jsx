import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getCart } from '../api/firebase';
import { useUserContext } from '../context/UserContext';
import { removeFromCart, addOrUpdateToCart } from '../api/firebase';

export default function useCarts() {
  const { uid } = useUserContext();
  const queryClient = useQueryClient();
  // carts 전체에다가 받아온 정보를 캐싱하는 것이아닌, 사용자 별로 캐싱하도록 설정 사용자가 로그인 하지않으면 uid가 null이기 떄문에, uid가 false인 경우에 쿼리가 수행되지 않도록 enabled 옵션을 사용!
  const cartsQuery = useQuery(['carts', uid || ''], () => getCart(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        // 모든 아이템을 invalidate 하는 것이 아닌, 해당하는 로그인한 사용자의 uid의 카트에만 정보 업데이트, 다수의 로그인 사용자를 염두해놓은 리팩토링
        queryClient.invalidateQueries(['carts', uid]);
      },
    }
  );

  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', uid]);
    },
  });
  return { cartsQuery, addOrUpdateItem, removeItem };
}
