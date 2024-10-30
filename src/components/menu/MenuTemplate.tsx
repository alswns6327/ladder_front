import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuTemplateBlock = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100px;
  align-items: flex-start;
`;

const StyledLink = styled(Link)`
  & + & {
    margin-top: 30px;
  }
`;

const MenuTemplate = () => {
  return (
    <MenuTemplateBlock>
      <StyledLink to={"/"}>책 리뷰/정리</StyledLink>
      <StyledLink to={"/article"}>사유/아이디어</StyledLink>
      <StyledLink to={"/edu"}>교육 자료</StyledLink>
    </MenuTemplateBlock>
  );
};

export default MenuTemplate;
