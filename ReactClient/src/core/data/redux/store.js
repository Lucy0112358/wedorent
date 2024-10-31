import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import bookingReducer from './slice/bookingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});
