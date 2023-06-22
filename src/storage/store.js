import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import productsSlice from './slices/productsSlice';
import basketSlice from './slices/basketSlice';
import { api } from '../utils/api';

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    basket: basketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export default store;
