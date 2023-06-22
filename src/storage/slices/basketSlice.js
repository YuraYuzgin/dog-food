import { createSlice } from '@reduxjs/toolkit';

const basketFromLocalStorage = JSON.parse(localStorage.getItem('basket')) || [];

const initialState = {
  goods: basketFromLocalStorage,
  productList: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    // Добавление продукта в корзину
    addProductToBasket: (state, action) => {
      state.goods = [...state.goods, { productId: action.payload, count: 1 }];
      localStorage.setItem('basket', JSON.stringify(state.goods));
    },

    // Увеличение количества конкретного товара в корзине
    addCurrentProduct: (state, action) => {
      state.goods = state.goods.map((good) =>
        good.productId === action.payload
          ? { productId: action.payload, count: good.count + 1 }
          : good
      );
      localStorage.setItem('basket', JSON.stringify(state.goods));
    },

    // Уменьшение количества конкретного товара в корзине
    removeCurrentProduct: (state, action) => {
      state.goods = state.goods.map((good) =>
        good.productId === action.payload
          ? { productId: action.payload, count: good.count - 1 }
          : good
      );
      localStorage.setItem('basket', JSON.stringify(state.goods));
    },

    // Удаление конкретного товара из корзины
    removeFromBasket: (state, action) => {
      state.goods = state.goods.filter(
        (good) => good.productId !== action.payload
      );
      localStorage.setItem('basket', JSON.stringify(state.goods));
    },

    // Удаление всех товаров из корзины
    removeAllGoodsFromBasket: (state, action) => {
      state.goods = [];
      localStorage.removeItem('basket');
    },
  },
});

export const {
  addProductToBasket,
  addCurrentProduct,
  removeCurrentProduct,
  removeFromBasket,
  removeAllGoodsFromBasket
} = basketSlice.actions;
export default basketSlice.reducer;
