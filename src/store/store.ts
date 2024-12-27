import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Using localStorage
import cartReducer from "@/store/fetures/buttons/providerButton";
import blogReducer from "@/store/reducer/blog";
import newsReducer from "@/store/reducer/news";
import { BlogApi } from "./blogs";
import { NewsApi } from "./news";
import { bookDemoApi } from "./bookdemo";
import { contactUs } from "./contact";



export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      blog: blogReducer,
      news: newsReducer,
      [BlogApi.reducerPath]: BlogApi.reducer,
      [NewsApi.reducerPath]: NewsApi.reducer,
      [bookDemoApi.reducerPath]:bookDemoApi.reducer,
      [contactUs.reducerPath]:contactUs.reducer

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(BlogApi.middleware, NewsApi.middleware,bookDemoApi.middleware,contactUs.middleware),
  });
};

// Create a persistor for rehydration
export const persistor = persistStore(makeStore());

// Types for state and dispatch
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
