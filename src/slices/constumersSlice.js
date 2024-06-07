import { createSlice } from "@reduxjs/toolkit";
import { getCustomers } from "../actions/costumersAction";

export const initialState = {
    customers: [],
    loading: false,
    error: null
}

const costumSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCustomers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getCustomers.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.customers = payload.data;
          state.error = null;
        })
        .addCase(getCustomers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const costumReducer = costumSlice.reducer;
  
  export default costumSlice;