import React, { memo } from 'react';
import { ReactComponent as Star } from '../../assets/img/ic-star.svg';
import './index.sass';

export const RatingStars = memo(
  ({
    countStars,
    setRate = () => {},
    isEditable = false,
    wasClick,
    setWasClick,
    ratingAfterClick,
    setRatingAfterClick,
  }) => {
    const arrayStars = new Array(5).fill(<></>);

    const changeRating = (ratingOnClick) => {
      if (isEditable === false) return;
      setRate(ratingOnClick);
      setWasClick(true);
      setRatingAfterClick(ratingOnClick);
    };

    const changeShowStars = (countFillStars) => {
      if (isEditable === false) return;
      setRate(countFillStars);
    };

    const outStars = () => {
      wasClick === false ? setRate(3) : setRate(ratingAfterClick);
    };

    return (
      <div className="stars_rating">
        {arrayStars.map((elem, index) => {
          return (
            <Star
              key={index}
              className={`star ${
                index < countStars ? 'star_fill' : 'star_empty'
              } ${isEditable && 'editable'}`}
              onMouseEnter={() => changeShowStars(index + 1)}
              onMouseLeave={() => outStars()}
              onClick={() => changeRating(index + 1)}
            />
          );
        })}
      </div>
    );
  }
);
