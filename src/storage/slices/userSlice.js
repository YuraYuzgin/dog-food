import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isError } from '../utilsStore';

const initialState = {
  data: {},
  userAuthorized: true,
  error: '',
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async function (data, { extra, fulfillWithValue, rejectWithValue }) {
    try {
      const res = await extra.getUserInfoByToken();
      return fulfillWithValue(res);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchChangeAvatar = createAsyncThunk(
  'user/fetchChangeAvatar',
  async function (data, { extra, fulfillWithValue, rejectWithValue }) {
    try {
      const res = await extra.changeAvatar(data);
      return fulfillWithValue(res);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchChangeUserInfo = createAsyncThunk(
  'user/fetchChangeUserInfo',
  async function (data, { extra, fulfillWithValue, rejectWithValue }) {
    try {
      const res = await extra.changeUserInfo(data);
      return fulfillWithValue(res);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    userAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    addUserError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchChangeAvatar.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchChangeUserInfo.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addMatcher(isError, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { userAuthorized, addUserError } = userSlice.actions;
export default userSlice.reducer;
