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
  width: 100px;
  height: 100px;
  background-color: white;
  justify-self: end;
  position: relative;
`;

const BookUpdateButton = styled(Button)`
  position: absolute;
  background-color: red;
  width: 50px;
  bottom: 0;
`;

const BookDeleteButton = styled(Button)`
  position: absolute;
  background-color: red;
  width: 50px;
  bottom: 0;
  right: 0;
`;

const BookListTemplate = () => {
  return (
    <BookListTemplateBlock>
      <BookTopHeader>
        <Button>1</Button>
        <Button>2</Button>
      </BookTopHeader>
      <BookGridList>
        <BookItem>
          <BookUpdateButton>수정</BookUpdateButton>
          <BookDeleteButton>삭제</BookDeleteButton>
        </BookItem>
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
