import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../config/axios/axiosConfig";

export const getCar = createAsyncThunk(
  'booking/getCar',
  async (id, thunkAPI) => {
    try {
      console.log(id, "carId")
      const config = {
        method: "get",
        url: `Car/${id}`,
      };

      const response = await instance(config);
      console.log(response.data, "Car get");
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  }
)

export const sendBooking = createAsyncThunk(
  'booking/sendBooking',
  async (data, thunkAPI) => {
    try {
      console.log(data, "sssssssssssssssssssss")
      const config = {
        data: data,
        method: "post",
        url: '/Reservation/addReservation',
      };
      console.log(config, "config")
      const response = await instance(config);
      console.log(response.data, "Car geeeeeeeeeeeeeeeeeeeeeeeeeeeeet")
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  }
)

export const getCarsList = createAsyncThunk(
  'booking/getAllCars',
  async (params, thunkAPI) => {
    try {
      const config = {
        method: "get",
        url: '/Car/Cars',
        params: {...params}
      };

      const response = await instance(config);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  }
)

export const sendEmail = createAsyncThunk(
  'booking/sendEmail',
  async (data, thunkAPI) => {
    try {
      console.log(data, "email")
      const config = {
        data: data,
        method: "post",
        url: '/Email',
      };
      console.log(config, "config")
      const response = await instance(config);
      console.log(response.data, "Car email")
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  }
)