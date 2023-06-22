import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './index.sass';
import { ReactComponent as Like } from './img/like.svg';
import basket from '../../assets/img/ic-trash.svg';
import { fetchChangeLike } from '../../storage/slices/productsSlice.js';
import { ChangeCountGoods } from '../ChangeCountGoods/ChangeCountGoods';

export const ProductCard = ({
  pictures,
  price,
  wight,
  name,
  product,
  likes,
  discount,
  isFavorite,
}) => {
  const [isCount, setIsCount] = useState(true);
  const [isMaxCount, setIsMaxCount] = useState(false);
  const user = useSelector((state) => state.user.data);
  const goodsInBasket = useSelector((state) => state.basket.goods);
  const dispatch = useDispatch();

  const good = goodsInBasket.find((good) => good.productId === product._id);

  const isLike = likes.some((e) => e === user._id);
  const clickChangeLike = () => {
    dispatch(fetchChangeLike({ product, isLike }));
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
      {!isFavorite ? (
        <button
          onClick={clickChangeLike}
          className={`product__card__like ${
            isLike ? 'product__card__like_active' : ''
          }`}
        >
          <Like />
        </button>
      ) : (
        <button onClick={clickChangeLike} className="product__card__trash">
          <img src={basket} alt="basket" />
        </button>
      )}

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
      <div className="product__card__change_count_goods">
        <ChangeCountGoods
          isCount={isCount}
          setIsCount={setIsCount}
          isMaxCount={isMaxCount}
          setIsMaxCount={setIsMaxCount}
          goodsInBasket={goodsInBasket}
          good={good}
          product={product}
          classForProduct={false}
        />
      </div>
    </div>
  );
};
