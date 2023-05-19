import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import './index.sass';
import { ratingProduct } from '../../utils/ratingProduct';
import { reviewsCount } from '../../utils/reviewsCount';
import { changeWordByQuantity } from '../../utils/changeWordByQuantity';
import minus from './img/minus.svg';
import plus from './img/plus.svg';
import truck from './img/ic-truck.svg';
import quality from './img/ic-quality.svg';
import { ReactComponent as Like } from '../ProductCard/img/like.svg';
import { ProductCardContext } from '../../context/productCardContext';
import { BtnBack } from '../Buttons/BtnBack/BtnBack';

export const Product = ({ product }) => {
  const [isLike, setIsLike] = useState(false);

  const user = useContext(UserContext);
  const { changeLike } = useContext(ProductCardContext);

  // Проверяем, добавлен ли в избранное товар
  useEffect(() => {
    setIsLike(product.likes.some((e) => e === user?._id));
  }, [product.likes, user]);

  // При нажатии на кнопку изменения лайка отправляем запрос на сервер. Меняем значение isLike.
  // Если ошибкок не произошло, меняем значение isLike.
  const clickChangeLike = () => {
    if (changeLike(product, isLike)) setIsLike(!isLike);
  };

  const reviewsCountThisProduct = reviewsCount(product.reviews);

  return (
    <div className="product">
      <div className="product__header">
        <BtnBack />
        <h2 className="product__header__name">{product.name}</h2>
        <div className="product__header__rating_and_reviews_count">
          <span className="product__header__rating">
            рейтинг {Math.round(ratingProduct(product.reviews))}
          </span>
          <span className="product__header__reviews_count">
            {reviewsCountThisProduct}
            {changeWordByQuantity(reviewsCount(product.reviews), 'отзыв')}
          </span>
        </div>
      </div>
      <div className="product__main">
        <div className="product__main__image__wrapper">
          {!!product.discount && (
            <span className="product__main__sale">-{product.discount}%</span>
          )}
          <img
            className="product__main__image"
            src={product.pictures}
            alt="product image"
          />
        </div>
        <div className="product__main__info">
          {!!product.discount ? (
            <div className="product__main__price__wrapper">
              <p className="product__main__old_price">{product.price}&nbsp;₽</p>
              <p className="product__main__new_price">
                {Math.round(
                  product.price - (product.price * product.discount) / 100
                )}
                &nbsp;₽
              </p>
            </div>
          ) : (
            <div className="product__main__price__wrapper">
              <p className="product__main__price">{product.price}&nbsp;₽</p>
            </div>
          )}
          <div className="product__main__cart">
            <div className="product__main__cart__add_put_away">
              <img src={minus} alt="minus" />
              <span className="product__main__cart__add__count">0</span>
              <img src={plus} alt="plus" />
            </div>
            <button className="product__main__cart__btn_add_to_cart">
              В корзину
            </button>
          </div>
          <div className="product__main__add_to_favorite">
            <button
              onClick={clickChangeLike}
              className={`product__main__like ${
                isLike ? 'product__main__like_active' : ''
              }`}
            >
              <Like />
              <span className="product__main__like__text">
                {isLike ? 'В избранном' : 'В избранное'}
              </span>
            </button>
          </div>
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
          <div className="product__main__info__quality">
            <img src={quality} alt="icon quality" />
            <div className="product__main__info__quality__text">
              <h4 className="product__main__info__quality__text__header">
                Гарантия качества
              </h4>
              <p className="product__main__info__quality__text__content">
                Если Вам не понравилось качество нашей продукции, мы вернем
                деньги, либо сделаем все возможное, чтобы удовлетворить ваши
                нужды.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="product__description">
        <h3 className="product__description__header">Описание</h3>
        <p className="product__description__text">{product.description}</p>
      </div>
      <div className="product__characteristics">
        <h3 className="product__characteristics__header">Характеристики</h3>
        <div className="product__characteristics__weight">
          <span className="product__characteristics__weight__title">Вес</span>
          <span className="product__characteristics__weight__line"></span>
          <span className="product__characteristics__weight__value">
            {product.wight}
          </span>
        </div>
        <div className="product__characteristics__price">
          <span className="product__characteristics__price__title">Цена</span>
          <span className="product__characteristics__price__line"></span>
          <span className="product__characteristics__price__value">
            {!!product.discount
              ? Math.round(
                  product.price - (product.price * product.discount) / 100
                )
              : product.price}
            &nbsp;₽
          </span>
        </div>
      </div>
    </div>
  );
};
