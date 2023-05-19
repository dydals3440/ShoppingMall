import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  // useEffect 훅 내에서 onUserStateChange 함수를 호출하면 페이지가 렌더링될 때 해당 함수가 실행되고, 이때 onAuthStateChanged 메서드가 작동하여 사용자 인증 상태의 변경을 감지합니다. 그리고 인증 상태가 변경되면 전달한 콜백 함수가 호출됩니다.
  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);
  return (
    // uid를 사용할 일이 많으니까, user가 있다면 uid만 호출해서 user.uid를 가져올 수 있게 처리
    <UserContext.Provider
      value={{ user, uid: user && user.uid, login: login, logout: logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
