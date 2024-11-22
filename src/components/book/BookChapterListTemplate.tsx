import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import LinkButton from "../common/LinkButton";
import BackHistoryButton from "../common/BackHistoryButton";
import { RightMenu } from "../common/RightMenu";
import * as bookTypes from "../../types/bookTypes";
import TemplateBox from "../common/TemplateBox";
import NoneDecoLink from "../common/NoneDecoLink";
import NoContent from "../common/NoContent";

const BookChapterListTemplateBlock = styled(TemplateBox)``;

const BookTopHeader = styled.div`
  width: calc(100% - 101px);
  display: flex;
  justify-content: flex-end;
`;

const BookChapterList = styled.div`
  @media (max-width: 768px) {
    width: calc(100%);
  }
  @media (min-width: 769px) {
    width: calc(100% - 140px);
  }
  display: flex;
  row-gap: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
      {!chapterList || chapterList.length === 0 ? <NoContent/> : 
        <BookChapterList>
          {chapterList?.map((chapter) => (
            <NoneDecoLink
              key={chapter.bookChapterInfoId}
              to={`/book/content/${chapter.bookChapterInfoId}`}
            >
              {chapter.bookChapterInfoTitle}
            </NoneDecoLink>
          ))}
        </BookChapterList>
      }
      <RightMenu>
        <BackHistoryButton>이전으로</BackHistoryButton>
      </RightMenu>
    </BookChapterListTemplateBlock>
  );
};

export default BookChapterListTemplate;
