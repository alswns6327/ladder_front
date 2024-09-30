import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const ArticleListTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const ArticleListHeader = styled.div`
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

const ArticleList = styled.div`
  width: 85%;
  display: flex;
  row-gap: 20px;
  align-items: center;
  flex-direction: column;
`;

const ArticleListTemplate = () => {
  return (
    <ArticleListTemplateBlock>
      <ArticleListHeader>
        <Button>1</Button>
      </ArticleListHeader>
      <ArticleList>
        <Link to={"/text/content"}>글 1</Link>
        <Link to={"/text/content"}>글 2</Link>
        <Link to={"/text/content"}>글 3</Link>
        <Link to={"/text/content"}>글 4</Link>
        <Link to={"/text/content"}>글 5</Link>
      </ArticleList>
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
        <Link to={"/group/manage"}>관리</Link>
      </GroupList>
    </ArticleListTemplateBlock>
  );
};

export default ArticleListTemplate;
