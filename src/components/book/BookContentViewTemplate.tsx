import styled from "styled-components";
import Button from "../common/Button";
import MDEditor from "@uiw/react-md-editor";
import LinkButton from "../common/LinkButton";
import * as bookTypes from "../../types/bookTypes";
import BackHistoryButton from "../common/BackHistoryButton";

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

type BookContentViewTemplatePropsType = {
  bookChapterInfo: bookTypes.bookContentType;
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
      <BackHistoryButton>이전으로</BackHistoryButton>  
      {bookChapterInfo?.firstSaveUser === ladderAccountId && (
        <>
          <LinkButton text="수정" link={`/book/chapter/update/${bookChapterInfo.bookChapterInfoId}`}/>
          <Button
            onClick={() =>
              handleDeleteChapter(Number(bookChapterInfo.bookChapterInfoId))
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
