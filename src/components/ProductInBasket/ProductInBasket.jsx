import React, { useState } from 'react';
import { ChangeCountGoods } from '../ChangeCountGoods/ChangeCountGoods';
import './index.sass';
import { ReactComponent as Trash } from '../../assets/img/ic-trash.svg';
import { useDispatch } from 'react-redux';
import { removeFromBasket } from '../../storage/slices/basketSlice';

export const ProductInBasket = ({ product, goods }) => {
  const [isCount, setIsCount] = useState(true);
  const [isMaxCount, setIsMaxCount] = useState(false);
  const good = goods.find((good) => good.productId === product._id);
  const dispatch = useDispatch();

  return (
    <div className="product_in_basket">
      <img
        className="product_in_basket__image"
        src={product.pictures}
        alt="product"
      />
      <div className="product_in_basket__info">
        <span className="product_in_basket__info__name">{product.name}</span>
        <span className="product_in_basket__info__wight">{product.wight}</span>
      </div>
      <div className="product_in_basket__change_count">
        <ChangeCountGoods
          isCount={isCount}
          setIsCount={setIsCount}
          isMaxCount={isMaxCount}
          setIsMaxCount={setIsMaxCount}
          goodsInBasket={goods}
          good={good}
          product={product}
          classForProduct={false}
        />
      </div>
      {!!product.discount ? (
        <div className="product__card__price__wrapper product_in_basket__price_block">
          <p className="product__card__old_price">{product.price * good.count}&nbsp;₽</p>
          <p className="product__card__new_price">
            {Math.round(
              (product.price - (product.price * product.discount) / 100) * good.count
            )}
            &nbsp;₽
          </p>
        </div>
      ) : (
        <div className="product__card__price__wrapper product_in_basket__price_block">
          <p className="product__card__price">{product.price * good.count}&nbsp;₽</p>
        </div>
      )}
      <Trash
        className="product_in_basket__remove_good"
        onClick={() => dispatch(removeFromBasket(product._id))}
      />
    </div>
  );
};
