import React from 'react';

export const Button = ({ text, onClick }) => {
  return (
    <button
      className='bg-brand p-2 rounded-md text-white  ease-in duration-300 hover:scale-110 '
      onClick={onClick}
    >
      {text}
    </button>
  );
};
