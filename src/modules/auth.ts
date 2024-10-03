import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../lib/api/auth";

const REGIST: string = "auth/REGIST";

type initialStateType = {
  ladderAccountId: string;
  ladderAccountName: string;
  ladderAccountEmail: string;
  ladderAccountAuth: string;
};

const initialState: initialStateType = {
  ladderAccountId: "",
  ladderAccountName: "",
  ladderAccountEmail: "",
  ladderAccountAuth: "",
};

interface registParam {
  ladderAccountId: string;
  ladderAccountPassword: string;
  ladderAccountName: string;
  ladderAccountEmail: string;
}

export const asyncRegist = createAsyncThunk(
  REGIST,
  async ({
    ladderAccountId,
    ladderAccountPassword,
    ladderAccountName,
    ladderAccountEmail,
  }: registParam) => {
    const response = await api.regist({
      ladderAccountId,
      ladderAccountPassword,
      ladderAccountName,
      ladderAccountEmail,
    });

    return response.data;
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncRegist.pending, (state, action) => {});
    builder.addCase(asyncRegist.fulfilled, (state, action) => {
      state.ladderAccountId = action.payload.data.ladderAccountId;
    });
    builder.addCase(asyncRegist.rejected, (state, action) => {});
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
