import React from 'react';
import { useUserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user } = useUserContext();
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace={true} />;
  }
  return children;
};

// 1. 로그인한 사용자가 있는지 확인
// 2. 그 사용자가 어드민 권한이 있는지 확인
// requireAdmin이 true인 경우, 로그인도 되어 있어야 하고, 어드민 권한도 갖고 있어야함.
// 조건에 맞지 않으면 상위 경로로 이동
// 조건에 맞는 경우에만 전달한 children을 보여줌
