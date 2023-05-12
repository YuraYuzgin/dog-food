import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.sass';
import iconLeftArrow from './img/ic-left-arrow.svg';

export const Product = ({ product }) => {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <div className="product">
      <div onClick={() => back()}>
        <img src={iconLeftArrow} alt="left arrow" />
        <span>Назад</span>
      </div>
    </div>
  );
};
