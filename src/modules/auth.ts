import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../lib/api/auth";
import apiClient from "../lib/api/apiClient";

const REGIST: string = "auth/REGIST";
const LOGIN: string = "auth/LOGIN";
const LOGOUT: string = "auth/LOGOUT";

export type initialStateType = {
  ladderAccountId: string;
  ladderAccountName: string;
  ladderAccountEmail: string;
  ladderAccountAuth: string;
};

type ladderUserType = {
  ladderAccountId: string;
  ladderAccountPassword: string;
  ladderAccountName?: string;
  ladderAccountEmail?: string;
  ladderAccountAuth?: string;
  accessToken?: string;
};

const initialState: initialStateType = {
  ladderAccountId: "",
  ladderAccountName: "",
  ladderAccountEmail: "",
  ladderAccountAuth: "",
};

export const asyncRegist = createAsyncThunk(
  REGIST,
  async ({
    ladderAccountId,
    ladderAccountPassword,
    ladderAccountName,
    ladderAccountEmail,
  }: ladderUserType) => {
    const response = await api.regist({
      ladderAccountId,
      ladderAccountPassword,
      ladderAccountName,
      ladderAccountEmail,
    });

    return response.data;
  }
);

export const asyncLogin = createAsyncThunk(
  LOGIN,
  async ({ ladderAccountId, ladderAccountPassword }: ladderUserType) => {
    const response = await api.login({
      ladderAccountId,
      ladderAccountPassword,
    });
    localStorage.setItem("accessToken", response.data.data.accessToken);
    apiClient.defaults.headers.Authorization = "Bearer ".concat(
      localStorage.getItem("accessToken") as string
    );
    return response.data;
  }
);

export const asyncLogout = createAsyncThunk(LOGOUT, async () => {
  const response = await api.logout();
  localStorage.setItem("accessToken", "");
  apiClient.defaults.headers.Authorization = "";
  return response.data;
});

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncRegist.pending, (state, action) => {});
    builder.addCase(asyncRegist.fulfilled, (state, action) => {});
    builder.addCase(asyncRegist.rejected, (state, action) => {});
    builder.addCase(asyncLogin.pending, (state, action) => {});
    builder.addCase(asyncLogin.fulfilled, (state, { payload }) => {
      const { data: ladderUser }: { data: ladderUserType } = payload;
      state.ladderAccountId = ladderUser.ladderAccountId;
      state.ladderAccountName = ladderUser.ladderAccountName as string;
      state.ladderAccountEmail = ladderUser.ladderAccountEmail as string;
      state.ladderAccountAuth = ladderUser.ladderAccountAuth as string;
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {});
    builder.addCase(asyncLogout.pending, (state, action) => {});
    builder.addCase(asyncLogout.fulfilled, (state, action) => {
      state.ladderAccountId = "";
      state.ladderAccountAuth = "";
      state.ladderAccountAuth = "";
      state.ladderAccountAuth = "";
    });
    builder.addCase(asyncLogout.rejected, (state, action) => {});
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
