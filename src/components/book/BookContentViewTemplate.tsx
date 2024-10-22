import styled from "styled-components";
import Button from "../common/Button";

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

const BookContentViewTemplate = () => {
  return (
    <BookContentViewTemplateBlock>
      <BookTitleBox>title chapter 1</BookTitleBox>
      <BookContentBox>content 블라블라</BookContentBox>
      <BookRightMenu>
        <Button>목록 보기</Button>
        <Button>수정</Button>
        <Button>삭제</Button>
      </BookRightMenu>
    </BookContentViewTemplateBlock>
  );
};

export default BookContentViewTemplate;
