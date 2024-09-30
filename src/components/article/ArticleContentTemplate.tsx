import styled from "styled-components";
import Button from "../common/Button";

const ArticleContentTemplateBlock = styled.div`
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

const ArticleRightMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: aqua;
  display: flex;
  row-gap: 10px;
  flex-direction: column;
`;

const ArticleContentTemplate = () => {
  return (
    <ArticleContentTemplateBlock>
      <ArticleTitleBox>글 1</ArticleTitleBox>
      <ArticleContentBox>content 블라블라</ArticleContentBox>
      <ArticleRightMenu>
        <Button>목록 보기</Button>
        <Button>수정</Button>
        <Button>삭제</Button>
      </ArticleRightMenu>
    </ArticleContentTemplateBlock>
  );
};

export default ArticleContentTemplate;
