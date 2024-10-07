import styled from "styled-components";
import Button from "./Button";

const HeaderBlock = styled.div``;

const TopHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const UserButtonBox = styled.div``;

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
`;
type registFormType = {
  ladderAccountId: string;
  ladderAccountPassword: string;
  ladderAccountName: string;
  ladderAccountEmail: string;
  ladderAccountAuth: string;
};
type authType = {
  ladderAccountId: string;
  ladderAccountName: string;
  ladderAccountEmail: string;
  ladderAccountAuth: string;
};
interface HeaderProps {
  handleRegist: () => void;
  handleInputRegistForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  auth: authType;
}

const Header = ({ handleRegist, handleInputRegistForm, auth }: HeaderProps) => {
  return (
    <HeaderBlock>
      <TopHeader>
        {auth.ladderAccountId ? (
          <UserButtonBox>
            <Button>유저 정보</Button>
            <UserInfo>유저 정보</UserInfo>
          </UserButtonBox>
        ) : (
          <>
            <UserButtonBox>
              <Button>로그인</Button>
              <UserInfo>
                <input placeholder="id" />
                <input placeholder="pw" />
                <Button>submit</Button>
              </UserInfo>
            </UserButtonBox>
            <UserButtonBox>
              <Button>회원가입</Button>
              <UserInfo>
                <input
                  name="ladderAccountId"
                  onChange={handleInputRegistForm}
                  placeholder="id"
                />
                <input
                  name="ladderAccountPassword"
                  onChange={handleInputRegistForm}
                  placeholder="pw"
                />
                <input
                  name="ladderAccountName"
                  onChange={handleInputRegistForm}
                  placeholder="name"
                />
                <input
                  name="ladderAccountEmail"
                  onChange={handleInputRegistForm}
                  placeholder="email"
                  type="email"
                />
                <Button onClick={handleRegist}>submit</Button>
              </UserInfo>
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
