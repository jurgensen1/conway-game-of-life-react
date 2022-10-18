import { configureStore } from '@reduxjs/toolkit';
import lifeReducer from '../features/life/lifeSlice';

export const store = configureStore({
  reducer: {
    life: lifeReducer,
  },
});
