import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './TaskSlice';
import alertReducer from './alertSlice';
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    alert: alertReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
