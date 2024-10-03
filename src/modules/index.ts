import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "menu"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ auth })
);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
