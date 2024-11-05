import styled from "styled-components";
import Button from "../common/Button";
import { RightMenu } from "../common/RightMenu";
import LinkButton from "../common/LinkButton";
import MDEditor from "@uiw/react-md-editor";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";

const ArticleEduContentViewTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const ArticleCategoryBox = styled.div`
  width: 85%;
  text-align: right;
`

const ArticleTitleBox = styled.div`
  width: 85%;
  text-align: center;
`;

const ArticleContentBox = styled.div`
  width: 85%;
  text-align: center;
`;

type ArticleEduContentViewTemplateProps = {
  menuType : string;
  article : commonTypes.article;
}

const ArticleEduContentViewTemplate = ({
  menuType,
  article,
} : ArticleEduContentViewTemplateProps) => {
  return (
    <ArticleEduContentViewTemplateBlock>
      <ArticleCategoryBox>{article.categoryName?.concat(" > ")}{article.subCategoryName}</ArticleCategoryBox>
      <ArticleTitleBox>{article.title}</ArticleTitleBox>
      <ArticleContentBox>
        <MDEditor.Markdown
          style={{ padding: 10 }}
          source={article.article}/>
      </ArticleContentBox>
      <RightMenu>
        <Button>목록 보기</Button>
        <LinkButton text="수정" link={`/${menuType}/write/${article.articleSeq}`}/>
        <Button>삭제</Button>
      </RightMenu>
    </ArticleEduContentViewTemplateBlock>
  );
};

export default ArticleEduContentViewTemplate;
