import styled from "styled-components";
import Button from "../common/Button";
import MDEditor from "@uiw/react-md-editor";
import LinkButton from "../common/LinkButton";

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
  firstSaveUser: string;
};

type BookContentViewTemplatePropsType = {
  bookChapterInfo: bookChapterInfoType | undefined;
  ladderAccountId: string;
  handleDeleteChapter: (bookChapterInfoId: number) => void;
};

const BookContentViewTemplate = ({
  bookChapterInfo,
  ladderAccountId,
  handleDeleteChapter,
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
        <LinkButton
          text={"이전으로"}
          link={`/book/chapter/${bookChapterInfo?.bookInfoId}`}
        />
        {bookChapterInfo?.firstSaveUser === ladderAccountId && (
          <>
            <Button>수정</Button>
            <Button
              onClick={() =>
                handleDeleteChapter(bookChapterInfo.bookChapterInfoId)
              }
            >
              삭제
            </Button>
          </>
        )}
      </BookRightMenu>
    </BookContentViewTemplateBlock>
  );
};

export default BookContentViewTemplate;
