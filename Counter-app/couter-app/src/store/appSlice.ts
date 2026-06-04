import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  count: number;
  isModalOpen: boolean;
  phoneNumber: string;
}

const initialState: AppState = {
  count: 0,
  isModalOpen: false,
  phoneNumber: localStorage.getItem('phoneNumber') || '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 2;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      localStorage.setItem('phoneNumber', action.payload);
    },
  },
});

export const { increment, setModalOpen, setPhoneNumber } = appSlice.actions;

export default appSlice.reducer;
