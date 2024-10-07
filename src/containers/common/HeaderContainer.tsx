import React, { useState } from "react";
import Header from "../../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncRegist } from "../../modules/auth";
import { AppDispatch } from "../../modules";

const HeaderContainer = () => {
  type authType = {
    ladderAccountId: string;
    ladderAccountName: string;
    ladderAccountEmail: string;
    ladderAccountAuth: string;
  };

  const auth: authType = useSelector(({ auth }: { auth: authType }) => auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();

  type registFormType = {
    ladderAccountId: string;
    ladderAccountPassword: string;
    ladderAccountName: string;
    ladderAccountEmail: string;
    ladderAccountAuth: string;
  };

  const [registForm, setRegistForm] = useState<registFormType>({
    ladderAccountId: "",
    ladderAccountPassword: "",
    ladderAccountName: "",
    ladderAccountEmail: "",
    ladderAccountAuth: "USER",
  });

  const handleRegist = (): void => {
    dispatch(asyncRegist(registForm));
  };

  const handleInputRegistForm = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, name }: { value: string; name: string } = e.target;
    setRegistForm({ ...registForm, [name]: value });
  };

  return (
    <Header
      handleRegist={handleRegist}
      handleInputRegistForm={handleInputRegistForm}
      auth={auth}
    />
  );
};

export default HeaderContainer;
