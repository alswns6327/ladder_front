import React, { ChangeEvent, useState } from "react";
import Header from "../../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncLogin, asyncLogout, asyncWithdrawAccount } from "../../modules/auth";
import { AppDispatch } from "../../modules";
import * as authTypes from "../../types/authTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authApiRequestParam from "../../lib/api/auth";
import { requestApiFn } from "../../lib/api/apiClient";
import useModal from "../../hooks/modal/useModal";

const HeaderContainer = () => {
  const modal = useModal();
  const auth: authTypes.ladderUserType = useSelector(
    ({ auth }: { auth: authTypes.ladderUserType }) => auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isIdDuplicationCheck, setIsIdDuplicationCheck] = useState<boolean>(false);
  const [registForm, setRegistForm] = useState<authTypes.ladderUserType>({
    ladderAccountId : "",
    ladderAccountPassword : "",
    recheckLadderAccountPassword : "",
    ladderAccountName : "",
    ladderAccountEmail : "",
  });
  const handleRegistSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<boolean> => {
    e.preventDefault();
    const ladderAccountId = registForm.ladderAccountId.trim();
    const ladderAccountPassword = registForm.ladderAccountPassword.trim();
    let checkRegistResult = true;
    if(!isIdDuplicationCheck){
      modal.openToastModal("아이디 중복 체크를 해주세요.", "warning");
      checkRegistResult = false;
    } else if(!ladderAccountId || !ladderAccountPassword) {
      modal.openToastModal("아이디 패스워드를 모두 입력해주세요.", "warning");
      checkRegistResult = false;
    } else if (!/^[A-Za-z0-9][^@#@!]{4,12}$/.test(ladderAccountId)) {
      modal.openToastModal("영문, 숫자로만 된 4~12 자리의 아이디를 입력해주세요.", "warning");
      checkRegistResult = false;
    } else if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(ladderAccountPassword)) {
      modal.openToastModal("영문, 숫자, 특수기호를 포함한 8~15자리 패스워드를 입력해주세요.", "warning");
      checkRegistResult = false;
    } else if (registForm.recheckLadderAccountPassword !== registForm.ladderAccountPassword) {
      modal.openToastModal("패스워드가 일치하지 않습니다.", "warning");
      checkRegistResult = false;
    }

    if(!checkRegistResult) return checkRegistResult;

    const resultData =  await requestApiFn<authTypes.ladderUserType, {ladderAccountId : string}>(
      authApiRequestParam.regist(registForm)
    );

    if(resultData.code === "200") {
      setRegistForm({
        ladderAccountId : "",
        ladderAccountPassword : "",
        recheckLadderAccountPassword : "",
        ladderAccountName : "",
        ladderAccountEmail : "",
      });
    }else{
      checkRegistResult = false;
      modal.openToastModal(resultData.msg, "error");
    }

    return checkRegistResult;
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: authTypes.ladderUserType = Object.fromEntries(
      formData
    ) as authTypes.ladderUserType;

    if(!data.ladderAccountId.trim() || !data.ladderAccountPassword.trim()) return modal.openToastModal("아이디 패스워드를 모두 입력해주세요.", "warning");

    dispatch(asyncLogin(data))
    .then(response => {
      const resultData = response.payload as commonTypes.apiReturnType<authTypes.ladderUserType>;
      if(resultData.code !== "200"){
        modal.openToastModal(resultData.msg, "error");
      }
    });
  };

  const handleLogout = (): void => {
    dispatch(asyncLogout())
    .then(response => {
      const resultData = response.payload as commonTypes.apiReturnType<authTypes.ladderUserType>;
      if(resultData.code !== "200"){
        modal.openToastModal(resultData.msg, "error");
      }
    });
  };

  const handleRegistFormChange = (e : ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setRegistForm({...registForm, [name] : value});
    if(name === "ladderAccountId") setIsIdDuplicationCheck(false);
  }
  
  const handleIdDuplicationCheck = async () : Promise<void> => {
    const ladderAccountId = registForm.ladderAccountId;
    if(!ladderAccountId.trim()) return modal.openToastModal("아이디를 입력해주세요.", "warning");
    else if (!/^[A-Za-z0-9][^@#@!]{4,12}$/.test(ladderAccountId)) {
      return modal.openToastModal("영문, 숫자로만 된 4~12 자리의 아이디를 입력해주세요.", "warning");
    }

    const resultData = await requestApiFn<string, number>(
      authApiRequestParam.idDuplicationCheck(ladderAccountId)
    );
    if(resultData.code !== "200") return modal.openToastModal(resultData.msg, "error");

    if(resultData.data === 0) {
      setIsIdDuplicationCheck(true);
      modal.openToastModal("사용 가능한 아이디 입니다.", "success");
    } else {
      setIsIdDuplicationCheck(false);
      modal.openToastModal("이미 존재하는 아이디 입니다.", "warning");
    }
  }

  const handlewithdrawAccount = () => {
    modal.openConfirmModal("정말 탈퇴하시겠습니까?", () => dispatch(asyncWithdrawAccount(auth.ladderAccountId))
    .then(response => {
      console.log(response);
      const resultData = response.payload as commonTypes.apiReturnType<authTypes.ladderUserType>;
      console.log(resultData);
      if(resultData.code !== "200"){
        modal.openToastModal(resultData.msg, "error");
      }
    }), 200);
  }

  return (
    <Header
      handleIdDuplicationCheck={handleIdDuplicationCheck}
      handleRegistSubmit={handleRegistSubmit}
      handleLogout={handleLogout}
      handleLoginSubmit={handleLoginSubmit}
      auth={auth}
      registForm={registForm}
      handleRegistFormChange={handleRegistFormChange}
      handlewithdrawAccount={handlewithdrawAccount}
    />
  );
};

export default HeaderContainer;
