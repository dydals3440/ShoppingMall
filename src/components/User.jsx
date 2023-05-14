import React from 'react';

// 아니면 인자에 {user : {photoURL, displayName}}
export const User = ({ user }) => {
  const { photoURL, displayName } = user;
  return (
    <div className='flex items-center'>
      <img
        className='rounded-full w-12 h-12 mr-2 '
        src={photoURL}
        alt={displayName}
      />
      <span className='text-xl hidden md:block'>{displayName}</span>
    </div>
  );
};
