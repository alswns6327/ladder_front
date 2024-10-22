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

type BookChanterListTemplateProps = {
  bookInfoId: string | undefined;
};

const BookChapterListTemplate = ({
  bookInfoId,
}: BookChanterListTemplateProps) => {
  return (
    <BookChapterListTemplateBlock>
      <BookTopHeader>
        <LinkButton text={"추가"} link={`/book/chapter/write/${bookInfoId}`} />
      </BookTopHeader>
      <BookChapterList>
        <Link to={"/book/content"}>chapter 1</Link>
        <Link to={"/book/content"}>chapter 2</Link>
        <Link to={"/book/content"}>chapter 3</Link>
        <Link to={"/book/content"}>chapter 4</Link>
        <Link to={"/book/content"}>chapter 5</Link>
      </BookChapterList>
      <BookRightMenu>
        <Button>이전으로</Button>
      </BookRightMenu>
    </BookChapterListTemplateBlock>
  );
};

export default BookChapterListTemplate;
