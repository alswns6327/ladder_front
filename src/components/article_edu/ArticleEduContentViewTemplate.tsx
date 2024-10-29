import styled from "styled-components";
import Button from "../common/Button";
import { RightMenu } from "../common/RightMenu";

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
      <ArticleContentBox>content 블라블라</ArticleContentBox>
      <RightMenu>
        <Button>목록 보기</Button>
        <Button>수정</Button>
        <Button>삭제</Button>
      </RightMenu>
    </ArticleEduContentViewTemplateBlock>
  );
};

export default ArticleEduContentViewTemplate;
