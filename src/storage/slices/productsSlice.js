import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isLoading, isError } from '../utilsStore';
import { ratingProduct } from '../../utils/ratingProduct';

const initialState = {
  products: [],
  favoritesProducts: [],
  searchQuery: null,
  loading: false,
  currentProduct: {},
  total: 0,
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async function (id, { fulfillWithValue, rejectWithValue, getState, extra }) {
    try {
      const state = getState();
      const data = await extra.getAllProducts();
      return fulfillWithValue({ ...data, userId: state.user.data?._id });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchChangeLike = createAsyncThunk(
  'products/fetchChangeLike',
  async function (data, { fulfillWithValue, rejectWithValue, extra }) {
    try {
      const updatedProduct = await extra.changeLike(
        data.product._id,
        data.isLike
      );
      return fulfillWithValue({ updatedProduct, isLike: data.isLike });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProductsByQuery = createAsyncThunk(
  'products/fetchProductsByQuery',
  async function (searchQuery, { fulfillWithValue, rejectWithValue, extra }) {
    try {
      const resultSearch = await extra.getProductsByQuery(searchQuery);
      return fulfillWithValue(resultSearch);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Сортировка продуктов
    doSorting: (state, action) => {
      switch (action.payload) {
        case 'popular':
          state.products = state.products.sort(
            (a, b) => b.likes.length - a.likes.length
          );
          break;
        case 'novelties':
          state.products = state.products.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          break;
        case 'cheapFirst':
          state.products = state.products.sort((a, b) => a.price - b.price);
          break;
        case 'expensiveFirst':
          state.products = state.products.sort((a, b) => b.price - a.price);
          break;
        case 'byRating':
          state.products = state.products.sort(
            (a, b) => ratingProduct(b.reviews) - ratingProduct(a.reviews)
          );
          break;
        case 'byDiscount':
          state.products = state.products.sort(
            (a, b) => b.discount - a.discount
          );
          break;
        default:
          return state.products;
      }
    },

    // Текст поискового запроса
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Получение всех продуктов и избранных продуктов
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload.products ?? [];
      state.total = action.payload.total;
      state.favoritesProducts = state.products.filter((product) => {
        return product.likes.some((id) => id === action.payload.userId);
      });
    });

    // Изменение лайка, состояния избранных продуктов
    builder.addCase(fetchChangeLike.fulfilled, (state, action) => {
      const updatedProduct = action.payload.updatedProduct;
      const isLike = action.payload.isLike;
      const index = state.products.findIndex(
        (e) => e._id === updatedProduct._id
      );
      if (index !== -1) {
        state.products = [
          ...state.products.slice(0, index),
          updatedProduct,
          ...state.products.slice(index + 1),
        ];
      }
      // Удаление лайка
      if (isLike === true) {
        state.favoritesProducts = state.favoritesProducts.filter(
          (e) => e._id !== updatedProduct._id
        );
      }
      // Добавление лайка
      if (isLike === false) {
        state.favoritesProducts = [...state.favoritesProducts, updatedProduct];
      }
    });

    // Получение продуктов по запросу
    builder.addCase(fetchProductsByQuery.fulfilled, (state, action) => {
      //console.log(action.payload);
      state.products = action.payload;
    });

    builder.addMatcher(isError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addMatcher(isLoading, (state) => {
      state.loading = true;
    });
  },
});

export const { doSorting } = productsSlice.actions;
export const { setSearch } = productsSlice.actions;
export default productsSlice.reducer;
