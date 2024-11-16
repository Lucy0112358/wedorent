import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCar, getCarsList, getCategories } from "../api/bookingApi";  // Import the new thunk

const initialState = {
  bookingData: {},
  bookingCar: {},
  serviceTotal: 0,
  allCars: [],
  categories: []  // New state for categories
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // setCarId:  (state, action) => {

    // },
    setBookingData: (state, action) => {
      console.log(action, "BookingSliceeeeeeeeeee");
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
      .addCase(getCarsList.fulfilled, (state, action) => {
        state.allCars = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;  // Update state with categories
      });
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
export const getAllCars = (state) => state.booking.allCars;
export const getAllCategories = (state) => state.booking.categories;  // Export the categories

export default bookingSlice.reducer;
