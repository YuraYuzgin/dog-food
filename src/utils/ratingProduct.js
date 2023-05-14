// Подсчёт рейтинга продукта
export const ratingProduct = (reviews) => {
  if (!reviews || !reviews.length) {
    return 0;
  }
  const sumReviews = reviews.reduce(
    (accumulator, elem) => accumulator + elem.rating,
    0
  );
  return sumReviews / reviews.length;
};
