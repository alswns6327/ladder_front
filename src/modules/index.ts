import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import modal from "./modal";
import { useDispatch } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ auth, modal })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

// useSelector 사용 시 타입으로 사용하기 위함
export type RootState = ReturnType<typeof store.getState>;

// useDispatch를 좀 더 명확하게 사용하기 위함
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
