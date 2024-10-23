import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import LinkButton from "../common/LinkButton";

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

const BookRightMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: aqua;
`;

const ChapterLink = styled(Link)`
  width: 450px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type chapterType = {
  bookInfoId: number;
  bookChapterInfoId: number;
  bookChapterInfoTitle: string;
  bookChapterInfoContent: string;
};

type BookChanterListTemplateProps = {
  bookInfoId: string | undefined;
  chapterList: chapterType[];
};

const BookChapterListTemplate = ({
  bookInfoId,
  chapterList,
}: BookChanterListTemplateProps) => {
  return (
    <BookChapterListTemplateBlock>
      <BookTopHeader>
        <LinkButton text={"추가"} link={`/book/chapter/write/${bookInfoId}`} />
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
      <BookRightMenu>
        <Button>이전으로</Button>
      </BookRightMenu>
    </BookChapterListTemplateBlock>
  );
};

export default BookChapterListTemplate;
