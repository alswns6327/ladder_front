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
  padding: 10px 20px;
`;

const Header = () => {
  return (
    <HeaderBlock>
      <TopHeader>
        <UserButtonBox>
          <Button>유저 정보</Button>
          <UserInfo>유저 정보</UserInfo>
        </UserButtonBox>
      </TopHeader>
      <SubHeader>
        <Banner>오름 기록</Banner>
      </SubHeader>
    </HeaderBlock>
  );
};

export default Header;
