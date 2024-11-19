import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as commonTypes from "../types/commonTypes";

const initialState: commonTypes.modalInitialType = {
    toast : {
        display : false,
        messageType : "success",
        text : "",
    },
    alert : {
        display : false,
        width : 150,
        height : 100,
        text : ""
    },
    confirm : {
        display : false,
        width : 150,
        height : 100,
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
        state.toast.messageType = payload.messageType;
        state.toast.text = payload.text;
    },
    openAlertModal(state, {payload} : {payload : commonTypes.alertModalType}) {
        state.alert.display = true;
        state.alert.width = payload.width;
        state.alert.height = payload.height;
        state.alert.text = payload.text;
    },
    openConfirmModal(state, {payload} : {payload : commonTypes.confirmModalType}) {
        state.confirm.display = true;
        state.confirm.width = payload.width;
        state.confirm.height = payload.height;
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