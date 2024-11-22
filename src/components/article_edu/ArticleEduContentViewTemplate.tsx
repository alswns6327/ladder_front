import styled from "styled-components";
import Button from "../common/Button";
import { RightMenu } from "../common/RightMenu";
import LinkButton from "../common/LinkButton";
import MDEditor from "@uiw/react-md-editor";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";
import * as authTypes from "../../types/authTypes";
import * as commonTypes from "../../types/commonTypes";
import BackHistoryButton from "../common/BackHistoryButton";
import TemplateBox from "../common/TemplateBox";

const ArticleEduContentViewTemplateBlock = styled(TemplateBox)``;

const ArticleCategoryBox = styled.div`
  width: calc(100% - 105px);
  text-align: right;
`

const ArticleTitleBox = styled.div`
  width: calc(100% - 101px);
  text-align: center;
  h1{
    font-size: 2em;
    font-weight: bold;
  }
`;

const ArticleContentBox = styled.div`
  width: calc(100% - 101px);
  text-align: center;
`;

type ArticleEduContentViewTemplateProps = {
  menuType : string;
  content : commonTypes.article | commonTypes.edu;
  handleRemove : () => Promise<void>;
  ladderAccountId : string;
}

const ArticleEduContentViewTemplate = ({
  menuType,
  content,
  handleRemove,
  ladderAccountId,
} : ArticleEduContentViewTemplateProps) => {

  let updateLink = null;
  if("articleSeq" in content) updateLink = <LinkButton text="수정" link={`/${menuType}/write/${content.articleSeq}`}/>;
  else if("eduSeq" in content) updateLink = <LinkButton text="수정" link={`/${menuType}/write/${content.eduSeq}`}/>;

  return (
    <ArticleEduContentViewTemplateBlock>
      <ArticleCategoryBox>{content.categoryName?.concat(" > ")}{content.subCategoryName}</ArticleCategoryBox>
      <ArticleTitleBox><h1>{content.title}</h1></ArticleTitleBox>
      <hr/>
      <ArticleContentBox data-color-mode="light">
        <MDEditor.Markdown
          style={{ padding: 10 }}
          source={content.content}/>
      </ArticleContentBox>
      <RightMenu>
        <BackHistoryButton>이전으로</BackHistoryButton>
         {content.firstSaveUser === ladderAccountId && <>{updateLink}</>}
        {content.firstSaveUser === ladderAccountId && <Button onClick={handleRemove}>삭제</Button>}
      </RightMenu>
    </ArticleEduContentViewTemplateBlock>
  );
};

export default ArticleEduContentViewTemplate;
