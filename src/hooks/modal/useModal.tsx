import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../modules';
import * as modalModules from "../../modules/modal";

const useModal = () 
  : {
      openToastModal : (text : string, messageType : "success" | "warning" | "error") => void,
      openAlertModal : (text : string, width? : number, height? : number) => void,
      openConfirmModal : (text : string, confirmFn : () => void, width? : number, height? : number) => void 
    } => {
  const dispatch = useDispatch<AppDispatch>();

  const openToastModal = (text : string, messageType : "success" | "warning" | "error") : void => {
    dispatch(modalModules.closeToastModal());
    setTimeout(() => dispatch(modalModules.openToastModal({display : true, text, messageType})), 100);
  }
  const openAlertModal = (text : string, width? : number, height? : number) : void => {
    width = width ?? 150;
    height = height ?? 100;
    dispatch(modalModules.openAlertModal({display : true, text, width, height}));
  }
  const openConfirmModal = (text : string, confirmFn : () => void, width? : number, height? : number) : void => {
    width = width ?? 150;
    height = height ?? 100;
    dispatch(modalModules.openConfirmModal({display : true, text, width, height, confirmFn}));   
    return ;
  }
  return {
    openToastModal,
    openAlertModal,
    openConfirmModal,
  }
};

export default useModal;