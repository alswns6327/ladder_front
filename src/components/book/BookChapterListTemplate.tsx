import styled from "styled-components";
import Button from "../common/Button";

const BookChapterListTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
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

const BookChapterListTemplate = () => {
  return (
    <BookChapterListTemplateBlock>
      <BookTopHeader>
        <Button>1</Button>
      </BookTopHeader>
      <BookChapterList>
        <div>chapter 1</div>
        <div>chapter 2</div>
        <div>chapter 3</div>
        <div>chapter 4</div>
        <div>chapter 5</div>
      </BookChapterList>
    </BookChapterListTemplateBlock>
  );
};

export default BookChapterListTemplate;
