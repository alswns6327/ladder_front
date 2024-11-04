import styled from "styled-components";
import Button from "../common/Button";
import Input from "../common/Input";
import MDEditor from "@uiw/react-md-editor";
import { ChangeEvent } from "react";
import * as bookTypes from "../../types/bookTypes";
import BackHistoryButton from "../common/BackHistoryButton";
import { TitleInput } from "../common/TitleInput";
import { RightMenu } from "../common/RightMenu";

const BookContentWriteTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const BookTitleBox = styled.div`
  width: 85%;
  text-align: center;
  margin-bottom: 30px;
`;

const BookContentBox = styled.div`
  width: 85%;
`;

type BookContentWriteTemplateProps = {
  bookChapterInfo: bookTypes.bookContentType;
  handleChangeTitle : (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeMdText: (
    value: string | undefined,
    e: ChangeEvent<HTMLTextAreaElement> | undefined
  ) => void;
  handleSaveContent?: () => void;
  handleUpdateContent? : () => void;
};

const BookContentWriteTemplate = ({
  bookChapterInfo,
  handleChangeTitle,
  handleChangeMdText,
  handleSaveContent,
  handleUpdateContent,
}: BookContentWriteTemplateProps) => {
  const onSubmit = handleSaveContent ? handleSaveContent : handleUpdateContent;
  return (
    <BookContentWriteTemplateBlock>
      <BookTitleBox>
        <TitleInput 
          name="bookChapterInfoTitle" 
          onChange={handleChangeTitle} 
          value={bookChapterInfo.bookChapterInfoTitle} 
          placeholder="챕터 제목" />
      </BookTitleBox>
      <BookContentBox /*data-color-mode="light"*/ data-color-mode="dark">
        <MDEditor 
          height={400} 
          value={bookChapterInfo.bookChapterInfoContent}
          onChange={handleChangeMdText} />
      </BookContentBox>
      <RightMenu>
        <BackHistoryButton>이전으로</BackHistoryButton>
        <Button
          onClick={onSubmit}>
          저장
        </Button>
      </RightMenu>
    </BookContentWriteTemplateBlock>
  );
};

export default BookContentWriteTemplate;
