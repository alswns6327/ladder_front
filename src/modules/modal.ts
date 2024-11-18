import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as commonTypes from "../types/commonTypes";

const initialState: commonTypes.modalInitialType = {
    toast : {
        display : false,
        type : "success",
        text : "",
    },
    alert : {
        display : false,
        width : "",
        height : "",
        text : ""
    },
    confirm : {
        display : false,
        width : "",
        height : "",
        text : "",
        confirmFn(){}
    }
}

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: initialState,
  reducers: {
    openToastModal(state, {payload} : {payload : commonTypes.toastModalType}) {
        state.toast.display = true;
        state.toast.type = payload.type;
        state.toast.text = payload.text;
    },
    openAlertModal(state, {payload} : {payload : commonTypes.alertModalType}) {
        state.alert.display = true;
        state.alert.width = payload.width ?? state.alert.width;
        state.alert.height = payload.height ?? state.alert.height;
        state.alert.text = payload.text;
    },
    openConfirmModal(state, {payload} : {payload : commonTypes.confirmModalType}) {
        state.confirm.display = true;
        state.confirm.width = payload.width ?? state.alert.width;
        state.confirm.height = payload.height ?? state.alert.height;
        state.confirm.text = payload.text;
        state.confirm.confirmFn = payload.confirmFn;
    },
    closeToastModal(state) {
        state.toast = initialState.toast;
    },
    closeAlertModal(state) {
        state.alert = initialState.alert;
    },
    closeConfirmModal(state) {
        state.confirm = initialState.confirm;
    },
  },
});

export const {openToastModal, openAlertModal, openConfirmModal, closeToastModal, closeAlertModal, closeConfirmModal} = modalSlice.actions;
export default modalSlice.reducer;