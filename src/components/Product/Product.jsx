import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.sass';
import { reviewsCount } from '../../utils/reviewsCount';
import { changeWordByQuantity } from '../../utils/changeWordByQuantity';
import truck from './img/ic-truck.svg';
import quality from './img/ic-quality.svg';
import { ReactComponent as Like } from '../ProductCard/img/like.svg';
import { BtnBack } from '../Buttons/BtnBack/BtnBack';
import { ratingProduct } from '../../utils/ratingProduct';
import { RatingStars } from '../RatingStars/RatingStars';
import { Reviews } from '../Reviews/Reviews';
import { fetchChangeLike } from '../../storage/slices/productsSlice';
import { ChangeCountGoods } from '../ChangeCountGoods/ChangeCountGoods';

export const Product = () => {
  const [isCount, setIsCount] = useState(true);
  const [isMaxCount, setIsMaxCount] = useState(false);
  const product = useSelector((state) => state.products.currentProduct);
  const goodsInBasket = useSelector((state) => state.basket.goods);
  const user = useSelector((state) => state.user.data);
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();

  const good = goodsInBasket.find((good) => good.productId === product._id);

  const productReviews = product.reviews;

  // Проверяем, добавлен ли в избранное товар
  useEffect(() => {
    setIsLike(product.likes.some((e) => e === user?._id));
  }, [product.likes, user]);

  // Вычисляем количество звёзд в рейтинге
  const countStars = Math.round(ratingProduct(productReviews));

  // При нажатии на кнопку изменения лайка отправляем запрос на сервер. Меняем значение isLike.
  const clickChangeLike = () => {
    if (dispatch(fetchChangeLike({ product, isLike }))) setIsLike(!isLike);
  };

  const reviewsCountThisProduct = reviewsCount(product.reviews);
  const newPrice = Math.round(
    product.price - (product.price * product.discount) / 100
  );

  return (
    <div className="product">
      <div className="product__header">
        <BtnBack />
        <h2 className="product__header__name">{product.name}</h2>
        <div className="product__header__rating_and_reviews_count">
          <div className="product__header__rating_and_reviews_count__stars">
            <RatingStars countStars={countStars} />
          </div>
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
            alt="product"
          />
        </div>
        <div className="product__main__info">
          {!!product.discount ? (
            <div className="product__main__price__wrapper">
              <p className="product__main__old_price">{product.price}&nbsp;₽</p>
              <p className="product__main__new_price">{newPrice}&nbsp;₽</p>
            </div>
          ) : (
            <div className="product__main__price__wrapper">
              <p className="product__main__price">{product.price}&nbsp;₽</p>
            </div>
          )}

          <div className="product__main__cart">
            <ChangeCountGoods
              isCount={isCount}
              setIsCount={setIsCount}
              isMaxCount={isMaxCount}
              setIsMaxCount={setIsMaxCount}
              goodsInBasket={goodsInBasket}
              good={good}
              product={product}
              classForProduct={true}
            />
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
            {product.discount ? newPrice : product.price}&nbsp;₽
          </span>
        </div>
      </div>
      <Reviews />
    </div>
  );
};
