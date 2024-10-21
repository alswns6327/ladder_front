import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const BookListTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
`;

const BookTopHeader = styled.div`
  width: 85%;
  display: flex;
  justify-content: flex-end;
`;

const BookGridList = styled.div`
  width: 85%;
  display: grid;
  grid-row-gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const BookItem = styled.div`
  width: 130px;
  height: 150px;
  background-color: white;
  justify-self: end;
  position: relative;
`;

const BookItemImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: contain;
`;

const BookUpdateButton = styled(Button)`
  position: absolute;
  background-color: red;
  width: 50px;
  left: 0;
  bottom: 0;
`;

const BookDeleteButton = styled(Button)`
  position: absolute;
  background-color: red;
  width: 50px;
  bottom: 0;
  right: 0;
`;

type bookInfoType = {
  id: number;
  bookName: string;
  bookImgFile?: string;
  bookImgUrl?: string;
  bookImgFileExtension?: string;
};

type BookListTemplateProps = {
  bookInfoList: bookInfoType[];
};

const BookListTemplate = ({ bookInfoList }: BookListTemplateProps) => {
  return (
    <BookListTemplateBlock>
      <BookTopHeader>
        <Button>1</Button>
        <Button>2</Button>
      </BookTopHeader>
      <BookGridList>
        {bookInfoList?.map((bookInfo) => (
          <BookItem key={bookInfo.id}>
            <Link to={"/chapter"}>
              <BookItemImg
                src={
                  bookInfo.bookImgFile
                    ? `data:image/${bookInfo.bookImgFileExtension};base64,${bookInfo.bookImgFile}`
                    : `${process.env.PUBLIC_URL}/book.svg`
                }
              />
            </Link>
            <BookUpdateButton>수정</BookUpdateButton>
            <BookDeleteButton>삭제</BookDeleteButton>
          </BookItem>
        ))}
        <BookItem>
          <Link to={"/chapter"}>chapter</Link>
        </BookItem>
        <BookItem></BookItem>
        <BookItem></BookItem>
        <BookItem></BookItem>
        <BookItem></BookItem>
        <BookItem></BookItem>
        <BookItem></BookItem>
        <BookItem></BookItem>
        <BookItem></BookItem>
      </BookGridList>
      {" <   > "}
    </BookListTemplateBlock>
  );
};

export default BookListTemplate;
