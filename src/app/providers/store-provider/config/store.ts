import { api } from "@/src/shared/api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware) 
})