import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addCurrentProduct,
  addProductToBasket,
  removeCurrentProduct,
  removeFromBasket,
} from '../../storage/slices/basketSlice';
import './index.sass';

export const ChangeCountGoods = ({
  isCount,
  setIsCount,
  isMaxCount,
  setIsMaxCount,
  good,
  product,
  classForProduct
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (good?.count === product.stock) {
      setIsMaxCount(true);
    }
  }, [good?.count, product.stock, setIsMaxCount]);

  const addCurrentProductToBasket = () => {
    if (product.stock >= 1) {
      dispatch(addProductToBasket(product._id));
    } else if (product.stock === 0) {
      setIsCount(false);
    }
  };

  const increaseNumberGoods = () => {
    if (good.count < product.stock) {
      dispatch(addCurrentProduct(good.productId));
    } else if (good.count >= product.stock) {
      alert(`Доступное количество товара: ${product.stock}`);
    }
  };

  const reduceTheNumberOfGoods = () => {
    if (good.count > 1) {
      dispatch(removeCurrentProduct(good.productId));
    } else if (good.count === 1) {
      dispatch(removeFromBasket(good.productId));
    }
  };

  return (
    <div className={`change_count_goods ${classForProduct && 'for_product'}`}>
      {!good || good.count === 0 ? (
        <span
          className="change_count_goods__btn"
          onClick={addCurrentProductToBasket}
        >
          {isCount ? 'В Корзину' : 'Нет товара'}
        </span>
      ) : (
        <div className="change_count_goods__change_count">
          <span
            onClick={reduceTheNumberOfGoods}
            className="change_count_goods__change_count__minus"
          >
            -
          </span>
          <span>{good.count}</span>
          <span
            onClick={increaseNumberGoods}
            className={`change_count_goods__change_count__plus ${
              isMaxCount && 'disable'
            }`}
          >
            +
          </span>
        </div>
      )}
    </div>
  );
};
