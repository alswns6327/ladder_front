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
  content : commonTypes.article | commonTypes.edu;
  handleRemove : () => Promise<void>;
}

const ArticleEduContentViewTemplate = ({
  menuType,
  content,
  handleRemove,
} : ArticleEduContentViewTemplateProps) => {

  let updateLink = null;
  if("articleSeq" in content) updateLink = <LinkButton text="수정" link={`/${menuType}/write/${content.articleSeq}`}/>;
  else if("eduSeq" in content) updateLink = <LinkButton text="수정" link={`/${menuType}/write/${content.eduSeq}`}/>;

  return (
    <ArticleEduContentViewTemplateBlock>
      <ArticleCategoryBox>{content.categoryName?.concat(" > ")}{content.subCategoryName}</ArticleCategoryBox>
      <ArticleTitleBox>{content.title}</ArticleTitleBox>
      <ArticleContentBox>
        <MDEditor.Markdown
          style={{ padding: 10 }}
          source={content.content}/>
      </ArticleContentBox>
      <RightMenu>
        <BackHistoryButton>이전으로</BackHistoryButton>
        {updateLink}
        <Button onClick={handleRemove}>삭제</Button>
      </RightMenu>
    </ArticleEduContentViewTemplateBlock>
  );
};

export default ArticleEduContentViewTemplate;
