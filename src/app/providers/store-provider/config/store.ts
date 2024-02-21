import { api } from "@/src/shared/api";
import userSlice from "@/src/entities/user/model/slices/user.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware) 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;