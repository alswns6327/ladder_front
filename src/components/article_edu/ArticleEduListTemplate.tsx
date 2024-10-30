import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import LinkButton from "../common/LinkButton";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";

const ArticleEduListTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const ArticleEduListHeader = styled.div`
  width: 85%;
  display: flex;
  justify-content: flex-end;
`;

const GroupList = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  ul > li {
    margin-left: 10px;
  }
`;

const ArticleEduList = styled.div`
  width: 85%;
  display: flex;
  row-gap: 20px;
  align-items: center;
  flex-direction: column;
`;

const ArticleEduListTemplate = () => {
  return (
    <ArticleEduListTemplateBlock>
      <ArticleEduListHeader>
        <LinkButton text="추가" link="/article/write"/>
        <LinkButton text="추가" link="/edu/write"/>
      </ArticleEduListHeader>
      <ArticleEduList>
        <Link to={"/article/1"}>글 1</Link>
        <Link to={"/edu/1"}>글 2</Link>
        <Link to={"/text/content"}>글 3</Link>
        <Link to={"/text/content"}>글 4</Link>
        <Link to={"/text/content"}>글 5</Link>
      </ArticleEduList>
      <GroupList>
        <ul>
          <li>
            group 1
            <ul>
              <li>group 1-1</li>
              <li>group 1-2</li>
              <li>group 1-3</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            group 2
            <ul>
              <li>group 2-1</li>
              <li>group 2-2</li>
              <li>group 2-3</li>
            </ul>
          </li>
        </ul>
        <Link to={"/article/group"}>관리</Link>
        <Link to={"/edu/group"}>관리</Link>
      </GroupList>
    </ArticleEduListTemplateBlock>
  );
};

export default ArticleEduListTemplate;
