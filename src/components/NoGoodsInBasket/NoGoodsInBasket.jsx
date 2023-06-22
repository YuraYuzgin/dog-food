import React from 'react';
import './index.sass';
import iconNoProducts from '../../assets/img/ic-no-products.svg';

export const NoGoodsInBasket = () => {
  const toHome = () => {
    window.location.replace(window.location.origin);
  };
  return (
    <div className="no__product">
      <img src={iconNoProducts} alt="No products" />
      <h4 className="no__product__text">В корзине нет товаров</h4>
      <p className="no__product__description">Добавьте товар, нажав кнопку «В корзину» в карточке товара</p>
      <button className="no__product__btn_to_home" onClick={toHome}>
        На главную
      </button>
    </div>
  );
};
