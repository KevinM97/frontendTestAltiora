import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async(ThunkApi, {rejectWithValue})=>{
        try{
          return await axios.get(`/Product/list`);
        }catch(err){
            return rejectWithValue(`Errores: ${err.message}`);
        }
    }
)

export const registerProduct = createAsyncThunk(
    "products/registerProduct",
    async (productData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "/Product/registerProduct",
          productData,
          { headers: { "Content-Type": "application/json" } }
        );
        if (!response.ok || !response.data) {
            throw new Error("Respuesta inesperada del backend");
          }
        return response.data;
      } catch (err) {
        console.error("Error en la solicitud POST:", err.response);
        return rejectWithValue(`Errores: ${err.message}`);
      }
    }
  );


export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/Product/${productId}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(`Errores: ${err.message}`);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, nombre, precio, codigo }, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `/Product/${id}`,
          { ProductId: id, Nombre: nombre, Precio: precio, Codigo: codigo },
          { headers: { "Content-Type": "application/json" } }
        );
        if (!response.ok || !response.data) {
          throw new Error("Respuesta inesperada del backend");
        }
        return response.data;
      } catch (err) {
        console.error("Error en la solicitud PUT:", err.response);
        return rejectWithValue(`Errores: ${err.message}`);
      }
    }
  );
  
  
