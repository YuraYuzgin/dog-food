import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.sass';
import iconNoProducts from './img/ic-no-products.svg';

export const NoProductsByQuery = ({ setSearch }) => {
  const navigate = useNavigate();
  const toHome = () => {
    setSearch('');
    navigate('/');
  };
  return (
    <div className="no__product">
      <img src={iconNoProducts} alt="No products" />
      <h4 className="no__product__text">
        Простите, по вашему запросу товаров не надено.
      </h4>
      <button className="no__product__btn_to_home" onClick={toHome}>
        На главную
      </button>
    </div>
  );
};
