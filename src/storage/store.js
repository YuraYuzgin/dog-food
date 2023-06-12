import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import productsSlice from './slices/productsSlice';
import { api } from '../utils/api';

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export default store;
