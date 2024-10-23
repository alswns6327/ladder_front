import styled from "styled-components";
import Button from "../common/Button";
import MDEditor from "@uiw/react-md-editor";

const BookContentViewTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const BookTitleBox = styled.div`
  width: 85%;
  text-align: center;
`;

const BookContentBox = styled.div`
  width: 85%;
  text-align: center;
`;

const BookRightMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: aqua;
  display: flex;
  row-gap: 10px;
  flex-direction: column;
`;

type bookChapterInfoType = {
  bookInfoId: number;
  bookChapterInfoId: number;
  bookChapterInfoTitle: string;
  bookChapterInfoContent: string;
};

type BookContentViewTemplatePropsType = {
  bookChapterInfo: bookChapterInfoType | undefined;
};

const BookContentViewTemplate = ({
  bookChapterInfo,
}: BookContentViewTemplatePropsType) => {
  return (
    <BookContentViewTemplateBlock>
      <BookTitleBox>{bookChapterInfo?.bookChapterInfoTitle}</BookTitleBox>
      <BookContentBox>
        <MDEditor.Markdown
          style={{ padding: 10 }}
          source={bookChapterInfo?.bookChapterInfoContent}
        />
      </BookContentBox>
      <BookRightMenu>
        <Button>목록 보기</Button>
        <Button>수정</Button>
        <Button>삭제</Button>
      </BookRightMenu>
    </BookContentViewTemplateBlock>
  );
};

export default BookContentViewTemplate;
