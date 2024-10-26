import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../config/axios/axiosConfig";

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, thunkAPI) => {
      try {
        const config = {
          method: "get",
          url: 'User/company-users?adminId=8',
        };
        
        const response = await instance(config);
        console.log(response.data, "aaaaaaaalllllllllllllUserrrrrr")
        return response?.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)

export const getCar = createAsyncThunk(
  'booking/getCar',
  async (id, thunkAPI) => {
      try {
        console.log(id, "sssssssssssssssssssss")
        const config = {
          method: "get",
          url: `cars/${id}`,
        };
        
        const response = await instance(config);
        console.log(response.data, "Car geeeeeeeeeeeeeeeeeeeeeeeeeeeeet")
        return response?.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)

