import styled from "styled-components";
import Button from "../common/Button";
import { RightMenu } from "../common/RightMenu";
import MDEditor from "@uiw/react-md-editor";
import { TitleInput } from "../common/TitleInput";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";

const ArticleEduContentWriteTemplateBlock = styled.div`
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

const ArticleEduContentWriteTemplate = () => {
  return (
    <ArticleEduContentWriteTemplateBlock>
      <ArticleTitleBox>
        <TitleInput
          name="bookChapterInfoTitle" 
          // onChange={handleChangeTitle} 
          // value={bookChapterInfo.bookChapterInfoTitle} 
          placeholder="챕터 제목" />
      </ArticleTitleBox>
      <ArticleContentBox>
        <MDEditor
          height={400} 
          // value={bookChapterInfo.bookChapterInfoContent}
          // onChange={handleChangeMdText} 
        />
      </ArticleContentBox>
      <RightMenu>
        <Button>목록 보기</Button>
        <Button>수정</Button>
        <Button>삭제</Button>
      </RightMenu>
    </ArticleEduContentWriteTemplateBlock>
  );
};

export default ArticleEduContentWriteTemplate;
