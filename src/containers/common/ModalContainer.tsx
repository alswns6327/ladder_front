import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commonTypes from "../../types/commonTypes";
import * as Modals from "../../components/common/Modals";
import Button from '../../components/common/Button';
import * as modalDodules from '../../modules/modal';
import { AppDispatch } from '../../modules';
import Outside from '../../components/common/Outside';

const ModalContainer = () => {
  const modal = useSelector(({modal} : {modal : commonTypes.modalInitialType}) => modal);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <Modals.ToastModal
        $display={modal.toast.display}
        $messageType={modal.toast.messageType}>
        {modal.toast.text}
        <button onClick={() => dispatch(modalDodules.closeToastModal())}/>
      </Modals.ToastModal>

      <Outside close={() => dispatch(modalDodules.closeAlertModal())} $display={modal.alert.display}>
        <Modals.AlertModal 
          $display={modal.alert.display}
          $width={modal.alert.width} 
          $height={modal.alert.height}>
          {modal.alert.text}
          <Button onClick={() => dispatch(modalDodules.closeAlertModal())}>
            닫기
          </Button>
        </Modals.AlertModal>
      </Outside>
      
      <Modals.ConfirmModal 
        $display={modal.confirm.display} 
        $width={modal.confirm.width} 
        $height={modal.confirm.height}>
        <div className='background'></div>
        <Outside close={() => dispatch(modalDodules.closeConfirmModal())} $display={modal.confirm.display}>
          <div className='conFirmModal'>
            {modal.confirm.text}
            <div>
              <Button onClick={() => {modal.confirm.confirmFn(); dispatch(modalDodules.closeConfirmModal())}}>
                확인
              </Button>
              <Button onClick={() => dispatch(modalDodules.closeConfirmModal())}>
                취소
              </Button>
            </div>
          </div>
        </Outside>
      </Modals.ConfirmModal>
    </>
  );
};

export default ModalContainer;