import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

export const getCustomers = createAsyncThunk(
    "costumers/getCustomers",
    async(ThunkApi, {rejectWithValue})=>{
        try{
          return await axios.get(`/Customer/list`);
        }catch(err){
            return rejectWithValue(`Errores: ${err.message}`);
        }
    }
)