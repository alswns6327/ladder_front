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

    dispatch(asyncRegist(data));
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: ladderAccountFormType = Object.fromEntries(
      formData
    ) as ladderAccountFormType;

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
