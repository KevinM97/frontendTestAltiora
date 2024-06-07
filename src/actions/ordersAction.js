import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

export const getOrders = createAsyncThunk(
    "costumers/getOrders",
    async(ThunkApi, {rejectWithValue})=>{
        try{
          return await axios.get(`/Order/list`);
        }catch(err){
            return rejectWithValue(`Errores: ${err.message}`);
        }
    }
)