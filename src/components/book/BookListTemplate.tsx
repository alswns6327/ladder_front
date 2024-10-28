import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import LinkButton from "../common/LinkButton";

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
  height: 180px;
  background-color: white;
  justify-self: end;
  position: relative;
  perspective: 1000px;
  &:hover > .firstPage {
    z-index: 0;
    transform: rotateY(-180deg);
  }
  &:hover > .firstPageBack {
    z-index: 1;
    transform: rotateY(-180deg);
  }
`;

const BookItemPage = styled.div`
  width: 100%;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  /* box-shadow: 0 2px 0 rgba(0, 0, 0, 0.3); */
`;

const BookItemFirstPage = styled(BookItemPage)`
  z-index: 1;
  transform-origin: left center;
  transition-duration: 1s;
  background-color: white;
`;

const BookItemFirstPageBack = styled(BookItemFirstPage)`
  z-index: 0;
  transform-origin: left center;
  transition-duration: 1s;
  background-color: white;
`;

const BookItemSecondPage = styled(BookItemPage)`
  z-index: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const BookItemImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: contain;
`;

const BookUpdateLink = styled(Link)`
  position: absolute;
  background-color: red;
  border: 2px solid black;
  width: 50px;
  left: 0;
  bottom: 0;
  border-radius: 8px;
  text-align: center;
`;

const BookDeleteButton = styled(Button)`
  position: absolute;
  background-color: red;
  width: 50px;
  bottom: 0;
  right: 0;
`;

type bookInfoType = {
  bookInfoId: number;
  bookName: string;
  bookImgFile?: string;
  bookImgUrl?: string;
  bookImgFileExtension?: string;
  firstSaveUser: string;
};

type BookListTemplateProps = {
  bookInfoList: bookInfoType[];
  ladderAccountId: string;
  handleDeleteBookItem: (bookInfoId: number) => void;
};

const BookListTemplate = ({
  bookInfoList,
  ladderAccountId,
  handleDeleteBookItem,
}: BookListTemplateProps) => {
  return (
    <BookListTemplateBlock>
      <BookTopHeader>
        {ladderAccountId && <LinkButton text={"추가"} link={"/book/info"} />}
        <Button>2</Button>
      </BookTopHeader>
      <BookGridList>
        {bookInfoList?.map((bookInfo) => (
          <BookItem key={bookInfo.bookInfoId}>
            <BookItemFirstPage className="firstPage">
              <BookItemImg
                src={
                  bookInfo.bookImgFile
                    ? `data:image/${bookInfo.bookImgFileExtension};base64,${bookInfo.bookImgFile}`
                    : `${process.env.PUBLIC_URL}/book.svg`
                }
              />
            </BookItemFirstPage>
            <BookItemFirstPageBack className="firstPageBack" />
            <Link to={`/book/chapter/${bookInfo.bookInfoId}`}>
              <BookItemSecondPage>
                <span>chapter1</span>
                <span>chapter2</span>
                <span>chapter3</span>
              </BookItemSecondPage>
            </Link>
            {ladderAccountId === bookInfo.firstSaveUser && (
              <>
                <BookUpdateLink to={`/book/info/${bookInfo.bookInfoId}`}>
                  수정
                </BookUpdateLink>
                <BookDeleteButton
                  onClick={() => handleDeleteBookItem(bookInfo.bookInfoId)}
                >
                  삭제
                </BookDeleteButton>
              </>
            )}
          </BookItem>
        ))}
        {[...new Array(10 - bookInfoList.length)].map((_, i) => (
          <BookItem key={`empty_${i}`}>
            <BookItemImg src={`${process.env.PUBLIC_URL}/book.svg`} />
          </BookItem>
        ))}
      </BookGridList>
      {" <   > "}
    </BookListTemplateBlock>
  );
};

export default BookListTemplate;
