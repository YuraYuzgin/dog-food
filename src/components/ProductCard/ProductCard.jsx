import React from 'react';
import { Link } from 'react-router-dom';
import './index.sass';
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
      <div className="product__card__tags">
        {!!discount && (
          <span className="product__card__tags__sale">-{discount}%</span>
        )}
        {!!product.tags.some((tag) => tag === 'new') && (
          <span className="product__card__tags__new">Новинка</span>
        )}
      </div>
      <button
        onClick={clickChangeLike}
        className={`product__card__like ${
          isLike ? 'product__card__like_active' : ''
        }`}
      >
        <Like />
      </button>
      <Link to={`/product/${product._id}`} className="product__card__link">
        <img src={pictures} alt="like" className="product__card__image" />
        {!!discount ? (
          <div className="product__card__price__wrapper">
            <p className="product__card__old_price">{price}&nbsp;₽</p>
            <p className="product__card__new_price">
              {Math.round(price - (price * discount) / 100)}&nbsp;₽
            </p>
          </div>
        ) : (
          <div className="product__card__price__wrapper">
            <p className="product__card__price">{price}&nbsp;₽</p>
          </div>
        )}
        <p className="product__card__wight">{wight}</p>
        <p className="product__card__name">{name}</p>
      </Link>
      <span className="product__card__btn">В Корзину</span>
    </div>
  );
};
