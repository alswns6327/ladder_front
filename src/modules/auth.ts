import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApiRequestParam from "../lib/api/auth";
import apiClient, { requestApiFn } from "../lib/api/apiClient";
import * as authTypes from "../types/authTypes";

const REGIST: string = "auth/REGIST";
const LOGIN: string = "auth/LOGIN";
const LOGOUT: string = "auth/LOGOUT";

const initialState: authTypes.authInitialStateType = {
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
  }: authTypes.ladderUserType) => {
    const resultData =  await requestApiFn<authTypes.ladderUserType, {ladderAccountId : string}>(
      authApiRequestParam.regist({
        ladderAccountId,
        ladderAccountPassword,
        ladderAccountName,
        ladderAccountEmail,
      })
    );

    return resultData;
  }
);

export const asyncLogin = createAsyncThunk(
  LOGIN,
  async ({ ladderAccountId, ladderAccountPassword }: authTypes.ladderUserType) => {
    const resultData =  await requestApiFn<authTypes.ladderUserType, authTypes.ladderUserType>(
      authApiRequestParam.login({
        ladderAccountId,
        ladderAccountPassword,
      })
    );
    localStorage.setItem("accessToken", resultData.data.accessToken as string);
    apiClient.defaults.headers.Authorization = "Bearer ".concat(
      localStorage.getItem("accessToken") as string
    );
    return resultData;
  }
);

export const asyncLogout = createAsyncThunk(LOGOUT, async () => {
  const resultData =  await requestApiFn<void, string>(
    authApiRequestParam.logout()
  );
  localStorage.setItem("accessToken", "");
  apiClient.defaults.headers.Authorization = "";
  return resultData;
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
      const { data: ladderUser }: { data: authTypes.ladderUserType } = payload;
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
