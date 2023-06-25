import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActiveModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    changeActiveModal: (state, action) => {
      state.isActiveModal = action.payload;
    },
  },
});

export const { changeActiveModal } = modalSlice.actions;
export default modalSlice.reducer;
