// Изменеие окончания слова в зависимости от количества товаров
export const changeWordByQuantity = (count) => {
    const remainder = count % 10;
    if (!remainder || !count) {
      return ' товаров';
    }
    if (remainder > 10 && remainder < 15) {
      return ' товаров';
    }
    if (remainder === 1) {
      return ' товар';
    }
    if (remainder > 1 && remainder < 5) {
      return ' товара';
    }
    if (remainder >= 5 && remainder <= 9) {
      return ' товаров';
    }
  };