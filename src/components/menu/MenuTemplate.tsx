import { Link } from "react-router-dom";
import styled from "styled-components";
import * as commonTypes from "../../types/commonTypes";

const MenuTemplateBlock = styled.div`
  top: 80px;
  display: flex;
  z-index: 100;
  border: 1px solid black;
  border-radius: 9px;
  padding: 12px;
  background-color: white;
  @media (max-width: 768px) {
    position: sticky;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
  }
  @media (min-width: 769px) {
    position: fixed;
    flex-direction: column;
    align-items: flex-start;
    h1 {
      margin-bottom: 15px;
      width: calc(100% - 12px);
    }
  }

  h1 {
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }
`;

const StyledLink = styled(Link)`
  color: black;
  &:link, &:visited, &:hover, &:active {
    color: black; /* 모든 상태에서 색상 고정 */
    text-decoration: none; /* 모든 상태에서 밑줄 제거 */
  }
  padding: 5px;
  & + & {
    @media (max-width: 768px) {
      margin: 0;
    }
    @media (min-width: 769px) {
      margin-top: 30px;
    }
  }
`;

type MenuTemplateProps = {
  menuList: commonTypes.menu[];
}

const MenuTemplate = ({menuList} : MenuTemplateProps) => {
  return (
    <MenuTemplateBlock>
      <h1>메뉴</h1>
      {menuList.map(menu => <StyledLink key={menu.menuSeq} to={menu.menuPath}>{menu.menuName}</StyledLink>)}
    </MenuTemplateBlock>
  );
};

export default MenuTemplate;
