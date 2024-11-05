import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCar, getCarsList } from "../api/bookingApi";

const initialState = {
  bookingData: {},
  bookingCar: {},
  serviceTotal: 0,
  allCars: []
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      console.log(action, "BookingSliceeeeeeeeeee");
      let data = action.payload;

      // Rename returnLocation to EndAddress
      if (data.returnLocation) {
        data.EndAddress = data.returnLocation;
        delete data.returnLocation; // Remove the old key if needed
      }

      // Rename location to StartAddress
      if (data.location) {
        data.StartAddress = data.location;
        data.pickupDateOne = data.StartDate;
        data.pickupDateTwo = data.EndDate;
        
        delete data.location; // Remove the old key if needed
        delete data.pickupDateOne; // Remove the old key if needed
      }

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

export default bookingSlice.reducer;
