import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NoGoodsInBasket } from '../../components/NoGoodsInBasket/NoGoodsInBasket';
import { changeWordByQuantity } from '../../utils/changeWordByQuantity';
import { ProductInBasket } from '../../components/ProductInBasket/ProductInBasket';
import truck from '../../components/Product/img/ic-truck.svg';
import './index.sass';
import { removeAllGoodsFromBasket } from '../../storage/slices/basketSlice';

export const BasketPage = () => {
  const dispatch = useDispatch();
  const goods = useSelector((state) => state.basket.goods);
  const goodsCount = goods.reduce((sum, currentGood) => {
    return sum + currentGood.count;
  }, 0);
  const allProducts = useSelector((state) => state.products.products);

  const productsInBasket = [];
  allProducts.forEach((product) => {
    goods.forEach((good) => {
      if (product._id === good.productId)
        productsInBasket.push({ ...product, count: good.count });
    });
  });

  const orderAccepted = () => {
    dispatch(removeAllGoodsFromBasket());
    alert('Заказ принят!')
  };

  const totalSum = productsInBasket.reduce((sum, currentProduct) => {
    return sum + currentProduct.price * currentProduct.count;
  }, 0);

  const totalSale = productsInBasket.reduce((sum, currentProduct) => {
    if (!!currentProduct.discount) {
      return (
        sum +
        ((currentProduct.price * currentProduct.discount) / 100) *
          currentProduct.count
      );
    } else {
      return sum + 0;
    }
  }, 0);

  const totalCost = totalSum - totalSale;

  return (
    <div className="basket">
      <div className="basket__count_goods">
        <b>
          {goodsCount} {changeWordByQuantity(goodsCount, 'товар')}
        </b>
        &nbsp;в корзине
      </div>

      {!!goodsCount && (
        <>
          <div className="basket__main">
            <div className="basket__main__goods_list">
              {productsInBasket.map((product) => {
                return (
                  <ProductInBasket
                    key={product._id}
                    product={product}
                    goods={goods}
                  />
                );
              })}
            </div>

            <div>
              <div className="basket__main__order">
                <h4 className="basket__main__order__title">Ваша корзина</h4>
                <div className="basket__main__order__sum_sale">
                  <span className="basket__main__order__sum_sale__field">
                    Товары ({goodsCount})
                  </span>
                  <span className="basket__main__order__sum_sale__sum_value">
                    {totalSum}&nbsp;₽
                  </span>
                </div>
                <div className="basket__main__order__sum_sale">
                  <span className="basket__main__order__sum_sale__field">
                    Скидка
                  </span>
                  <span className="basket__main__order__sum_sale__sale_value">
                    {totalSale}&nbsp;₽
                  </span>
                </div>
                <div className="basket__main__order__line"></div>
                <div className="basket__main__order__cost">
                  <span className="basket__main__order__cost__field">
                    Общая стоимость
                  </span>
                  <span className="basket__main__order__cost__value">
                    {totalCost}&nbsp;₽
                  </span>
                </div>
                <button
                  onClick={orderAccepted}
                  className="basket__main__order__btn"
                >
                  Оформить заказ
                </button>
              </div>

              <div>
                <div className="product__main__info__delivery">
                  <img src={truck} alt="icon truck" />
                  <div className="product__main__info__delivery__text">
                    <h4 className="product__main__info__delivery__text__header">
                      Доставка по всему Миру!
                    </h4>
                    <p className="product__main__info__delivery__text__content">
                      Доставка курьером — <b>от 399 ₽</b>
                    </p>
                    <p className="product__main__info__delivery__text__content">
                      Доставка в пункт выдачи — <b>от 199 ₽</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!goodsCount && (
        <div>
          <NoGoodsInBasket />
        </div>
      )}
    </div>
  );
};
