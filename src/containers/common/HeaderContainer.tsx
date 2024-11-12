import React, { useState } from "react";
import Header from "../../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncLogin, asyncLogout, asyncRegist } from "../../modules/auth";
import { AppDispatch } from "../../modules";

type ladderAccountFormType = {
  ladderAccountId: string;
  ladderAccountPassword: string;
  ladderAccountName?: string;
  ladderAccountEmail?: string;
  ladderAccountAuth?: string;
};

const HeaderContainer = () => {
  const auth: ladderAccountFormType = useSelector(
    ({ auth }: { auth: ladderAccountFormType }) => auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleRegistSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: ladderAccountFormType = Object.fromEntries(
      formData
    ) as ladderAccountFormType;
    const ladderAccountId = data.ladderAccountId.trim();
    const ladderAccountPassword = data.ladderAccountPassword.trim();
    if(!ladderAccountId || !data.ladderAccountPassword.trim()) return alert("아이디 패스워드를 모두 입력해주세요.");
    else if (!/^[A-Za-z0-9][^@#@!]{4,12}$/.test(ladderAccountId)) {
      return alert("영문, 숫자로만 된 4~12 자리의 아이디를 입력해주세요.");
    } else if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/.test(ladderAccountPassword)) {
      return alert("영문, 숫자, 특수기호를 포함한 8~15자리 패스워드를 입력해주세요.");
    }

    dispatch(asyncRegist(data));
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: ladderAccountFormType = Object.fromEntries(
      formData
    ) as ladderAccountFormType;

    if(!data.ladderAccountId.trim() || !data.ladderAccountPassword.trim()) return alert("아이디 패스워드를 모두 입력해주세요.");

    dispatch(asyncLogin(data));
  };

  const handleLogout = (): void => {
    dispatch(asyncLogout());
  };

  return (
    <Header
      handleRegistSubmit={handleRegistSubmit}
      handleLogout={handleLogout}
      handleLoginSubmit={handleLoginSubmit}
      auth={auth}
    />
  );
};

export default HeaderContainer;
