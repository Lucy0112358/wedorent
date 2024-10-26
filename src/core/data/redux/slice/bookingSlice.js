import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCar } from "../api/bookingApi";

const initialState = {
  bookingData: {},
  bookingCar: {},
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      console.log(action, "BookingSLiceeeeeeeeeee")
      let data = action.payload;

      state.bookingData = { ...state.bookingData, [data.key]: data.value };
    },
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCar.fulfilled, (state, action) => {
        state.bookingCar = action.payload;
      })
  },
});

export const {
  setBookingData
} = bookingSlice.actions;

export const getBookingData = (state) => state.booking.bookingData;
export const getBookingCar = (state) => state.booking.bookingCar;

export default bookingSlice.reducer;
