import styled from "styled-components";
import Button from "../common/Button";
import { RightMenu } from "../common/RightMenu";
import LinkButton from "../common/LinkButton";
import MDEditor from "@uiw/react-md-editor";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";

const ArticleEduContentViewTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const ArticleTitleBox = styled.div`
  width: 85%;
  text-align: center;
`;

const ArticleContentBox = styled.div`
  width: 85%;
  text-align: center;
`;

const ArticleEduContentViewTemplate = () => {
  return (
    <ArticleEduContentViewTemplateBlock>
      <ArticleTitleBox>글 1</ArticleTitleBox>
      <ArticleContentBox>
        <MDEditor.Markdown
          style={{ padding: 10 }}
          source="# hi"/>
      </ArticleContentBox>
      <RightMenu>
        <Button>목록 보기</Button>
        <LinkButton text="수정" link="/article/write/1"/>
        <LinkButton text="수정" link="/edu/write/1"/>
        <Button>삭제</Button>
      </RightMenu>
    </ArticleEduContentViewTemplateBlock>
  );
};

export default ArticleEduContentViewTemplate;
