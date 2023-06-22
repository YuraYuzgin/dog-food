import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './index.sass';
import { RatingStars } from '../RatingStars/RatingStars';
import { ReactComponent as Basket } from '../../assets/img/ic-trash.svg';
import {
  fetchSendReview,
  fetchDeleteReview,
} from '../../storage/slices/productsSlice';

export const Reviews = memo(() => {
  const [showForm, setShowForm] = useState(false);
  const [rate, setRate] = useState(3);
  const [wasClick, setWasClick] = useState(false);
  const [ratingAfterClick, setRatingAfterClick] = useState(3);

  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();
  const productId = useSelector((state) => state.products.currentProduct._id);
  const reviews = useSelector((state) => state.products.currentProduct.reviews);

  const dateOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' });

  const reviewDate = (review) => {
    return new Date(review.created_at).toLocaleString('ru-RU', dateOptions);
  };

  const reviewRegister = {
    required: {
      value: true,
      message: 'Обязательное для заполнения поле.',
    },
  };

  const onSendReview = ({ text }) => {
    const data = { text, rating: rate };
    dispatch(fetchSendReview({ productId, data }));
    reset();
    setShowForm(false);
  };

  const deleteReview = (reviewId) => {
    dispatch(fetchDeleteReview({ productId, reviewId }));
  };

  return (
    <div className="product__reviews">
      <h3 className="product__reviews__header">Отзывы</h3>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="product__reviews__btn"
        >
          Написать отзыв
        </button>
      )}
      {showForm && (
        <form
          className="product__reviews__form"
          onSubmit={handleSubmit(onSendReview)}
        >
          <RatingStars
            countStars={rate}
            setRate={setRate}
            isEditable={true}
            wasClick={wasClick}
            setWasClick={setWasClick}
            ratingAfterClick={ratingAfterClick}
            setRatingAfterClick={setRatingAfterClick}
          />
          <textarea
            {...register('text', reviewRegister)}
            className="product__reviews__form__textarea"
            type="text"
            placeholder="Напишите отзыв..."
          />
          {errors?.text && (
            <span className="product__reviews__form__error">
              {errors?.text.message}
            </span>
          )}
          <div className="product__reviews__form__btns">
            <button className="product__reviews__btn" type="submit">
              Отправить
            </button>
            <button
              className="product__reviews__btn"
              onClick={() => setShowForm(false)}
            >
              Закрыть форму
            </button>
          </div>
        </form>
      )}
      <div className="product__reviews__list">
        {reviews.map((review) => {
          return (
            <div className="product__reviews__list__item" key={review._id}>
              <div className="product__reviews__list__item__hr" />
              <div className="product__reviews__list__item__header">
                <span className="product__reviews__list__item__header__author">
                  {review.author.name}
                </span>
                <span className="product__reviews__list__item__header__date">
                  {reviewDate(review)}
                </span>
                {user?._id === review.author._id && (
                  <Basket
                    onClick={() => deleteReview(review._id)}
                    className="product__reviews__list__item__header__basket"
                  />
                )}
              </div>
              <div className="product__reviews__list__item__rating">
                <RatingStars countStars={review.rating} />
              </div>
              <p className="product__reviews__list__item__text">
                {review.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
});
