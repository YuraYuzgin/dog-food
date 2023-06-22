import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isLoading, isError, sortReviews } from '../utilsStore';
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
  async function (
    data,
    { fulfillWithValue, rejectWithValue, getState, extra }
  ) {
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

// Получение продуктов по запросу
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

// Получение продукта по id
export const fetchCurrentProduct = createAsyncThunk(
  'products/fetchCurrentProduct',
  async function (productId, { fulfillWithValue, rejectWithValue, extra }) {
    try {
      const product = await extra.getProductById(productId);
      return fulfillWithValue(product);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Добавление отзыва
export const fetchSendReview = createAsyncThunk(
  'products/fetchSendReview',
  async function (
    { productId, data },
    { fulfillWithValue, rejectWithValue, extra }
  ) {
    try {
      const res = await extra.addReviewByIdProduct(productId, data);
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Удаление отзыва
export const fetchDeleteReview = createAsyncThunk(
  'products/fetchDeleteReview',
  async function (
    { productId, reviewId },
    { fulfillWithValue, rejectWithValue, extra }
  ) {
    try {
      const res = await extra.deleteReviewById(productId, reviewId);
      return fulfillWithValue(res);
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
      state.loading = false;
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
        state.loading = false;
      }
      // Добавление лайка
      if (isLike === false) {
        state.favoritesProducts = [...state.favoritesProducts, updatedProduct];
        state.loading = false;
      }
    });

    // Получение продуктов по запросу
    builder.addCase(fetchProductsByQuery.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });

    // Получение продукта по id
    builder.addCase(fetchCurrentProduct.fulfilled, (state, action) => {
      state.currentProduct = action.payload;
      sortReviews(state.currentProduct.reviews);
      state.loading = false;
    });

    // Добавление отзыва
    builder.addCase(fetchSendReview.fulfilled, (state, action) => {
      state.currentProduct = action.payload;
      sortReviews(state.currentProduct.reviews);
      state.loading = false;
    });

    // Удаление отзыва
    builder.addCase(fetchDeleteReview.fulfilled, (state, action) => {
      state.currentProduct = action.payload;
      sortReviews(state.currentProduct.reviews);
      state.loading = false;
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

export const { doSorting, setSearch } = productsSlice.actions;
export default productsSlice.reducer;
