import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import userReducer from './slice/userSlice';


const store = configureStore({
  // reducer: rootReducer,
  user: userReducer,
});

export default store;
