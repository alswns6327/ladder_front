import styled from "styled-components";
import Button from "../common/Button";
import Input from "../common/Input";
import MDEditor from "@uiw/react-md-editor";
import { ChangeEvent, useState } from "react";

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

const BookRightMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: aqua;
  display: flex;
  row-gap: 10px;
  flex-direction: column;
`;

const TitleInput = styled(Input)`
  width: 85%;
  text-align: center;
`;

type BookContentWriteTemplateProps = {
  mdText: string | undefined;
  handleChangeMdText: (
    value: string | undefined,
    e: ChangeEvent<HTMLTextAreaElement> | undefined
  ) => void;
  handleSaveContent: (e: React.FormEvent<HTMLFormElement>) => void;
};

const BookContentWriteTemplate = ({
  mdText,
  handleChangeMdText,
  handleSaveContent,
}: BookContentWriteTemplateProps) => {
  return (
    <BookContentWriteTemplateBlock>
      <form id="bookContentForm" onSubmit={handleSaveContent}>
        <BookTitleBox>
          <TitleInput name="bookChapterInfoTitle" placeholder="챕터 제목" />
        </BookTitleBox>
        <BookContentBox /*data-color-mode="light"*/ data-color-mode="dark">
          <MDEditor height={400} value={mdText} onChange={handleChangeMdText} />
        </BookContentBox>
      </form>
      <BookRightMenu>
        <Button>목록 보기</Button>
        <Button type="submit" form="bookContentForm">
          저장
        </Button>
        <Button>삭제</Button>
      </BookRightMenu>
    </BookContentWriteTemplateBlock>
  );
};

export default BookContentWriteTemplate;
