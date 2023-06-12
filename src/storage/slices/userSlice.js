import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isLoading, isError } from '../utilsStore';

const initialState = {
  data: {},
  loading: false,
};

// actions
export const getUser = createAsyncThunk(
  'user/getUser',
  async function (dataFromUp, { extra }) {
    const data = await extra.getUserInfoByToken();
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload;
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

export default userSlice.reducer;
