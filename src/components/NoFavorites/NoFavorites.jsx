import React from 'react';
import './index.sass';
import iconNoProducts from '../../assets/img/ic-no-products.svg';

export const NoFavorites = () => {
  const toHome = () => {
    window.location.replace(window.location.origin);
  };
  return (
    <div className="no_favorites">
      <img src={iconNoProducts} alt="No products" />
      <h4 className="no_favorites__text">В Избранном пока ничего нет</h4>
      <p className="no_favorites__description">
      Добавляйте товары в Избранное с помощью ❤️️
      </p>
      <button className="no_favorites__btn_to_home" onClick={toHome}>
        На главную
      </button>
    </div>
  );
};
