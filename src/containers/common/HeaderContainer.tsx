import React from "react";
import Header from "../../components/common/Header";
import { useSelector } from "react-redux";

const HeaderContainer = () => {
  type authType = {
    ladderAccountId: string;
    ladderAccountName: string;
    ladderAccountEmail: string;
    ladderAccountAuth: string;
  };

  const auth: authType = useSelector(({ auth }: { auth: authType }) => auth);

  console.log(auth.ladderAccountId);

  return <Header />;
};

export default HeaderContainer;
