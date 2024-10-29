import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import LinkButton from "../common/LinkButton";
import BackHistoryButton from "../common/BackHistoryButton";
import { RightMenu } from "../common/RightMenu";
import * as bookTypes from "../../types/bookTypes";
const BookChapterListTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const BookTopHeader = styled.div`
  width: 85%;
  display: flex;
  justify-content: flex-end;
`;

const BookChapterList = styled.div`
  margin-left: 7.5%;
  width: 85%;
  display: flex;
  row-gap: 20px;
  align-items: center;
  flex-direction: column;
`;

const ChapterLink = styled(Link)`
  width: 450px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type BookChanterListTemplateProps = {
  bookInfoId: string | undefined;
  chapterList: bookTypes.bookContentType[];
  ladderAccountId: string;
  bookInfo: bookTypes.bookInfoFileStringType;
};

const BookChapterListTemplate = ({
  bookInfoId,
  chapterList,
  ladderAccountId,
  bookInfo,
}: BookChanterListTemplateProps) => {
  return (
    <BookChapterListTemplateBlock>
      <BookTopHeader>
        {ladderAccountId === bookInfo.firstSaveUser && (
          <LinkButton
            text={"추가"}
            link={`/book/chapter/write/${bookInfoId}`}
          />
        )}
      </BookTopHeader>
      <BookChapterList>
        {chapterList?.map((chapter) => (
          <ChapterLink
            key={chapter.bookChapterInfoId}
            to={`/book/content/${chapter.bookChapterInfoId}`}
          >
            {chapter.bookChapterInfoTitle}
          </ChapterLink>
        ))}
      </BookChapterList>
      <RightMenu>
        <BackHistoryButton>이전으로</BackHistoryButton>
      </RightMenu>
    </BookChapterListTemplateBlock>
  );
};

export default BookChapterListTemplate;
