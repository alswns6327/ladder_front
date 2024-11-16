import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuTemplateBlock = styled.div`
  top: 80px;
  display: flex;
  z-index: 100;
  @media (max-width: 768px) {
    position: sticky;
    flex-direction: row;
    width: 100%;
    align-items: flex-start;
    justify-content: space-around;
  }
  @media (min-width: 769px) {
    position: fixed;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledLink = styled(Link)`
  color: black;
  &:link, &:visited, &:hover, &:active {
    color: black; /* 모든 상태에서 색상 고정 */
    text-decoration: none; /* 모든 상태에서 밑줄 제거 */
  }
  & + & {
    @media (max-width: 768px) {
      margin: 0;
    }
    @media (min-width: 769px) {
      margin-top: 30px;
    }
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
