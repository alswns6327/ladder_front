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

  form {
    display: flex;
    flex-direction: column;
  }
`;

type ladderFormType = {
  ladderAccountId: string;
  ladderAccountPassword: string;
  ladderAccountName?: string;
  ladderAccountEmail?: string;
  ladderAccountAuth?: string;
};

interface HeaderProps {
  handleRegistSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogout: () => void;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  auth: ladderFormType;
}

const Header = ({
  handleRegistSubmit,
  handleLogout,
  handleLoginSubmit,
  auth,
}: HeaderProps) => {
  return (
    <HeaderBlock>
      <TopHeader>
        {auth.ladderAccountId ? (
          <>
            <UserButtonBox>
              <Button>유저 정보</Button>
              <UserInfo>{auth.ladderAccountId}</UserInfo>
            </UserButtonBox>
            <UserButtonBox>
              <Button onClick={handleLogout}>로그아웃</Button>
            </UserButtonBox>
          </>
        ) : (
          <>
            <UserButtonBox>
              <Button>로그인</Button>
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
            </UserButtonBox>
            <UserButtonBox>
              <Button>회원가입</Button>
              <UserInfo>
                <form onSubmit={handleRegistSubmit}>
                  <input name="ladderAccountId" placeholder="id" />
                  <input name="ladderAccountPassword" placeholder="pw" />
                  <input name="ladderAccountName" placeholder="name" />
                  <input
                    name="ladderAccountEmail"
                    placeholder="email"
                    type="email"
                  />
                  <Button type="submit">submit</Button>
                </form>
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
