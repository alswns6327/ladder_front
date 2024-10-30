import styled from "styled-components";
import Button from "../common/Button";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";

const ArticleEduGroupManageTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const ArticleEduGroupManageTopLine = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const ArticleEduGroupList = styled.div`
  display: flex;
  flex-direction: column;
  ul > li {
    margin-left: 10px;
  }
`;

type ArticleEduGroupManageTemplatePropsType = {
  menuType : string;
  categoryList : articleTypes.articleCategoryType[] | undefined;
}

const ArticleEduGroupManageTemplate = ({
  menuType,
  categoryList,
} : ArticleEduGroupManageTemplatePropsType) => {
  return (
    <ArticleEduGroupManageTemplateBlock>
      <ArticleEduGroupManageTopLine>
        <Button>추가</Button>
      </ArticleEduGroupManageTopLine>
      <ArticleEduGroupList>
        <ul>
          <li>
            group 1 <Button>추가</Button>
            <ul>
              <li>group 1-1</li>
              <li>group 1-2</li>
              <li>group 1-3</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            group 2 <Button>추가</Button>
            <ul>
              <li>group 2-1</li>
              <li>group 2-2</li>
              <li>group 2-3</li>
            </ul>
          </li>
        </ul>
      </ArticleEduGroupList>
    </ArticleEduGroupManageTemplateBlock>
  );
};

export default ArticleEduGroupManageTemplate;
