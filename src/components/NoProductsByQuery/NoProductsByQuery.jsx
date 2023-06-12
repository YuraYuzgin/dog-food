import React from 'react';
import './index.sass';
import iconNoProducts from './img/ic-no-products.svg';

export const NoProductsByQuery = () => {
  const toHome = () => {
    window.location.replace(window.location.origin);
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
