// Изменеие окончания слова в зависимости от количества товаров
export const changeWordByQuantity = (count, word) => {
  if (count > 10 && count < 15) {
    return ` ${word}ов`;
  }
  const remainder = count % 10;
  if (!remainder || !count) {
    return ` ${word}ов`;
  }

  if (remainder === 1) {
    return ` ${word}`;
  }
  if (remainder > 1 && remainder < 5) {
    return ` ${word}а`;
  }
  if (remainder >= 5 && remainder <= 9) {
    return ` ${word}ов`;
  }
};
