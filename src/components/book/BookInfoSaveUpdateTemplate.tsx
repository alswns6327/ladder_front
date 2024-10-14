import styled from "styled-components";
import Button from "../common/Button";
import DefaultBookImg from "./book.svg";

const BookInfoSaveUpdateTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
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

const BookInfoBox = styled.div`
  display: flex;
`;

const BookInfoForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  gap: 50px;
`;

const BookInfoImgPreview = styled.div`
  width: calc(100% - 50% - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  img {
    width: 200px;
    height: 150px;
  }
  span {
    width: 100%;
    text-align: center;
  }
`;

const BookInfoSaveUpdateTemplate = () => {
  return (
    <BookInfoSaveUpdateTemplateBlock>
      <BookInfoBox>
        <BookInfoForm>
          <input placeholder="책 이름" />
          <input placeholder="저자명" />
          <input placeholder="옮긴이명" />
          <input placeholder="책 이미지" type="file" accept="image/*" />
        </BookInfoForm>
        <BookInfoImgPreview>
          <img src={DefaultBookImg} alt="book img" />
          <span>책 이미지</span>
        </BookInfoImgPreview>
      </BookInfoBox>
      <BookRightMenu>
        <Button>저장</Button>
        <Button>초기화</Button>
        <Button>목록으로</Button>
      </BookRightMenu>
    </BookInfoSaveUpdateTemplateBlock>
  );
};

export default BookInfoSaveUpdateTemplate;
