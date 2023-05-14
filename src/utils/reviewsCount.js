// Подсчёт количества отзывов
export const reviewsCount = (reviews) => {
  if (!reviews || !reviews.length) {
    return 0;
  }
  return reviews.length;
};
