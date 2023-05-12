import React from 'react';
import './index.sass';
import iconNoProducts from './img/ic-no-products.svg';
import { BtnToHome } from '../BtnToHome/BtnToHome';

export const NoProductsByQuery = ({setSearch}) => {
  return (
    <div className="no__product">
      <img src={iconNoProducts} alt="No products" />
      <h4 className="no__product__text">
        Простите, по вашему запросу товаров не надено.
      </h4>
      <BtnToHome setSearch={setSearch} />
    </div>
  );
};
