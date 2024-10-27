import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCar } from "../api/bookingApi";

const initialState = {
  bookingData: {},
  bookingCar: {},
  serviceTotal: 0,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      console.log(action, "BookingSLiceeeeeeeeeee")
      let data = action.payload;

      state.bookingData = data;
    },
    setServiceTotalAdd: (state, action) => {
      state.serviceTotal = +(state.serviceTotal + action.payload).toFixed(2);
    },
    setServiceTotalRemove: (state, action) => {
      state.serviceTotal = +(state.serviceTotal - action.payload).toFixed(2);
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
  setBookingData,
  setServiceTotalAdd,
  setServiceTotalRemove,
} = bookingSlice.actions;

export const getBookingData = (state) => state.booking.bookingData;
export const getBookingCar = (state) => state.booking.bookingCar;
export const getServiceTotal = (state) => state.booking.serviceTotal;

export default bookingSlice.reducer;
