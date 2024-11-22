import styled from "styled-components";
import Button from "../common/Button";
import MDEditor from "@uiw/react-md-editor";
import LinkButton from "../common/LinkButton";
import * as bookTypes from "../../types/bookTypes";
import BackHistoryButton from "../common/BackHistoryButton";
import { RightMenu } from "../common/RightMenu";
import TemplateBox from "../common/TemplateBox";

const BookContentViewTemplateBlock = styled(TemplateBox)``;

const BookTitleBox = styled.div`
  width: calc(100% - 101px);
  text-align: center;
  h1 {
    font-size: 2em;
    font-weight: bold;
  }
`;

const BookContentBox = styled.div`
  width: calc(100% - 101px);
  text-align: center;
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
      <BookTitleBox><h1>{bookChapterInfo?.bookChapterInfoTitle}</h1></BookTitleBox>
      <BookContentBox data-color-mode="light">
        <hr/>
        <MDEditor.Markdown
          style={{ padding: 10 }}
          source={bookChapterInfo?.bookChapterInfoContent}
        />
      </BookContentBox>
      <RightMenu>
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
      </RightMenu>
    </BookContentViewTemplateBlock>
  );
};

export default BookContentViewTemplate;
