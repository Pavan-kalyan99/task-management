// src/redux/slice/alertSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning' | null;
  open: boolean;
}

const initialState: AlertState = {
  message: '',
  severity: 'info',
  open: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertMessage: (state, action: PayloadAction<{ message: string; severity: 'success' | 'error' | 'info' | 'warning' }>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    clearAlertMessage: (state) => {
      state.message = '';
      state.severity = null;
      state.open = false;
    },
  },
});

export const { setAlertMessage, clearAlertMessage } = alertSlice.actions;

export default alertSlice.reducer;
