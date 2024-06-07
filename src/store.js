import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { costumReducer } from "./slices/constumersSlice";

export default configureStore({
    reducer:{
        products: productsReducer,
        customers: costumReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})