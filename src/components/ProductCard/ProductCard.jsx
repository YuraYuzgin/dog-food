import React from 'react';
import './index.css';
import { ReactComponent as Like } from './img/like.svg';

export const ProductCard = ({
  userId,
  pictures,
  price,
  wight,
  name,
  product,
  changeLike,
  likes,
  discount,
}) => {
  const isLike = likes.some((e) => e === userId);
  const clickChangeLike = () => {
    changeLike(product, isLike);
  };
  return (
    <div className="product__card">
      <div className="product__card__sale"></div>
      <button
        onClick={clickChangeLike}
        className={`product__card__like ${
          isLike ? 'product__card__like_active' : ''
        }`}
      >
        <Like />
      </button>
      <a href="/" className="product__card__link">
        <img src={pictures} className="product__card__image" />
        <p className="product__card__price">{price} ₽</p>
        <p className="product__card__wight">{wight}</p>
        <p className="product__card__name">{name}</p>
      </a>
      <span className="product__card__btn">В Корзину</span>
    </div>
  );
};
