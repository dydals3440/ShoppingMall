import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const ProductDetail = () => {
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const handleClick = () => {
    // 장바구니에 추가하면 됩니다.
  };
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  return (
    <section>
      <p>{category}</p>
      <img src={image} alt={title} />
      <div>
        <h2>{title}</h2>
        <p>₩{price}</p>
        <p>옵션: </p>
        <select onChange={handleSelect} value={selected}>
          {options &&
            options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
        </select>
        <Button text='장바구니에 추가' onClick={handleClick} />
      </div>
    </section>
  );
};
