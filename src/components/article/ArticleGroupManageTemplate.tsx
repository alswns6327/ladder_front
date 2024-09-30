import styled from "styled-components";
import Button from "../common/Button";

const ArticleGroupManageTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const ArticleGroupManageTopLine = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const ArticleGroupList = styled.div`
  display: flex;
  flex-direction: column;
  ul > li {
    margin-left: 10px;
  }
`;

const ArticleGroupManageTemplate = () => {
  return (
    <ArticleGroupManageTemplateBlock>
      <ArticleGroupManageTopLine>
        <Button>추가</Button>
      </ArticleGroupManageTopLine>
      <ArticleGroupList>
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
      </ArticleGroupList>
    </ArticleGroupManageTemplateBlock>
  );
};

export default ArticleGroupManageTemplate;
