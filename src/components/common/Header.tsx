import styled from "styled-components";
import Button from "./Button";
import { ChangeEvent, useState } from "react";
import RequiredText from "./RequiredText";
import * as authTypes from "../../types/authTypes";

const HeaderBlock = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  min-width: 400px;
  background-color: white;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
  @media (min-width: 400px) {
    width: 400px;
  }
  @media (min-width: 576px) {
    width: 576px;
  }
  @media (min-width: 768px) {
    width: 768px;
  }
  @media (min-width: 992px) {
    width: 992px;
  }
  @media (min-width: 1300px) {
    width: 1300px;
  }
  z-index: 110;
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const UserButtonBox = styled.div`
  width: 100px;
`;

const SubHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div`
  font-size: 20px;
  font-weight: bold;
  border: 1px solid black;
  padding: 10px 20px;
`;

const UserInfo = styled.div`
  position: absolute;
  top: 50px;
  display: flex;
  flex-direction: column;

  input {
    width: 100px;
    padding: 0;
    border: none;
  }

  form {
    display: flex;
    flex-direction: column;
  }
  background-color: white;
`;

type ladderFormType = {
  ladderAccountId: string;
  ladderAccountPassword: string;
  ladderAccountName?: string;
  ladderAccountEmail?: string;
  ladderAccountAuth?: string;
};

interface HeaderProps {
  handleIdDuplicationCheck: () => Promise<void>;
  handleRegistSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
  handleLogout: () => void;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  auth: ladderFormType;
  registForm : authTypes.ladderUserType;
  handleRegistFormChange : (e : ChangeEvent<HTMLInputElement>) => void;
  handlewithdrawAccount : () => void;
}

const Header = ({
  handleIdDuplicationCheck,
  handleRegistSubmit,
  handleLogout,
  handleLoginSubmit,
  auth,
  registForm,
  handleRegistFormChange,
  handlewithdrawAccount
}: HeaderProps) => {
  const [showAccountInfo, setShowAccountInfo] = useState<boolean>(false);
  const [showLoginBox, setShowLoginBox] = useState<boolean>(false);
  const [showRegistBox, setShowRegistBox] = useState<boolean>(false);
  
  return (
    <HeaderBlock>
      <TopHeader>
        {auth.ladderAccountId ? (
          <>
            <UserButtonBox>
              <Button onClick={() => setShowAccountInfo(!showAccountInfo)}>
                유저 정보
              </Button>
              {showAccountInfo && <UserInfo>{auth.ladderAccountId}</UserInfo>}
            </UserButtonBox>
            <UserButtonBox>
              <Button onClick={handleLogout}>로그아웃</Button>
            </UserButtonBox>
            <UserButtonBox>
              <Button onClick={handlewithdrawAccount}>회원탈퇴</Button>
            </UserButtonBox>
          </>
        ) : (
          <>
            <UserButtonBox>
              <Button onClick={() => setShowLoginBox(!showLoginBox)}>
                로그인
              </Button>
              {showLoginBox && (
                <UserInfo>
                  <form onSubmit={handleLoginSubmit}>
                    <input placeholder="id" name="ladderAccountId" />
                    <input
                      placeholder="pw"
                      type="password"
                      name="ladderAccountPassword"
                    />
                    <Button type="submit">submit</Button>
                  </form>
                </UserInfo>
              )}
            </UserButtonBox>
            <UserButtonBox>
              <Button onClick={() => setShowRegistBox(!showRegistBox)}>
                회원가입
              </Button>
              {showRegistBox && (
                <UserInfo>
                  <form onSubmit={async (e) => {
                      const registResult = await handleRegistSubmit(e);
                      setShowRegistBox(!registResult);
                      if(registResult) setShowLoginBox(registResult);
                    }
                  }>
                    <RequiredText/>
                    <input 
                      name="ladderAccountId" 
                      placeholder="id"
                      value={registForm.ladderAccountId}
                      onChange={handleRegistFormChange}
                    />
                    <Button type="button" onClick={() => handleIdDuplicationCheck()}>중복체크</Button>
                    <RequiredText/>
                    <input 
                      name="ladderAccountPassword" 
                      type="password"
                      placeholder="pw"
                      value={registForm.ladderAccountPassword}
                      onChange={handleRegistFormChange} />
                    <RequiredText/>
                    <input 
                      name="recheckLadderAccountPassword"
                      type="password" 
                      placeholder="pw" 
                      value={registForm.recheckLadderAccountPassword}
                      onChange={handleRegistFormChange}
                    />
                    <input 
                      name="ladderAccountName" 
                      placeholder="name" 
                      value={registForm.ladderAccountName}
                      onChange={handleRegistFormChange}  
                    />
                    <input
                      name="ladderAccountEmail"
                      placeholder="email"
                      type="email"
                      value={registForm.ladderAccountEmail}
                      onChange={handleRegistFormChange}
                    />
                    <Button type="submit">submit</Button>
                  </form>
                </UserInfo>
              )}
            </UserButtonBox>
          </>
        )}
      </TopHeader>
      <SubHeader>
        <Banner>오름 기록</Banner>
      </SubHeader>
    </HeaderBlock>
  );
};

export default Header;
