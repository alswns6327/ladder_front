import styled from "styled-components";
import Button from "../common/Button";
import { useEffect, useState } from "react";
import Input from "../common/Input";

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

const BookInfoInputBox = styled.div`
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
    object-fit: contain;
  }
  span {
    width: 100%;
    text-align: center;
  }
`;

const FileComponent = styled.div`
  display: flex;
  input[type="file"] {
    display: none;
    /* width: 0;
    height: 0;
    overflow: hidden; */
  }
  label {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #999;
    border-radius: 3px;
    color: #fff;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  span {
    padding: 0 5px 0 10px;
    margin-left: 5px;
    display: block;
    width: 120px;
    min-height: 30px;
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    line-height: 30px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
  }
`;

type bookInfoType = {
  bookInfoId?: number;
  bookName: string;
  bookAuthorName: string;
  bookTranslatorName: string;
  bookImgFile?: string;
  bookImgUrl?: string;
  bookImgFileExtension?: string;
};

type bookInfoFormType = {
  bookName: string;
  bookAuthorName: string;
  bookTranslatorName?: string;
  bookImgFile?: File;
};

type BookInfoSaveUpdateTemplatePropsType = {
  handleBookInfoSave?: (bookInfoForm: bookInfoFormType) => Promise<void>;
  handleBookInfoUpdate?: (bookInfoForm: bookInfoFormType) => Promise<void>;
  bookInfo?: bookInfoType;
};

const BookInfoSaveUpdateTemplate = ({
  handleBookInfoSave,
  handleBookInfoUpdate,
  bookInfo,
}: BookInfoSaveUpdateTemplatePropsType) => {
  const [bookInfoForm, setBookInfoForm] = useState<bookInfoFormType>({
    bookName: "",
    bookAuthorName: "",
    bookTranslatorName: "",
    bookImgFile: undefined,
  });

  useEffect(() => {
    if (bookInfo) {
      setBookInfoForm({
        ...bookInfoForm,
        bookName: bookInfo?.bookName,
        bookAuthorName: bookInfo?.bookAuthorName,
        bookTranslatorName: bookInfo?.bookTranslatorName,
      });
    }
  }, [bookInfo]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const file: File = (target.files as FileList)[0];
    if (file === undefined) return;
    setBookInfoForm({ ...bookInfoForm, bookImgFile: file });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    setBookInfoForm({ ...bookInfoForm, [name]: value });
  };
  return (
    <BookInfoSaveUpdateTemplateBlock>
      <BookInfoBox>
        <BookInfoInputBox>
          <Input
            onChange={onChangeInput}
            value={bookInfoForm?.bookName}
            name="bookName"
            placeholder="책 이름"
          />
          <Input
            onChange={onChangeInput}
            value={bookInfoForm?.bookAuthorName}
            name="bookAuthorName"
            placeholder="저자명"
          />
          <Input
            onChange={onChangeInput}
            value={bookInfoForm?.bookTranslatorName}
            name="bookTranslatorName"
            placeholder="옮긴이명"
          />
          <FileComponent>
            <label>
              <Input
                name="bookImgFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              책 이미지
            </label>
            <span>
              {bookInfoForm?.bookImgFile
                ? bookInfoForm.bookImgFile.name
                : "선택된 파일이 없습니다."}
            </span>
          </FileComponent>
          <Button
            onClick={() => {
              if (handleBookInfoSave) handleBookInfoSave(bookInfoForm);
              if (handleBookInfoUpdate) handleBookInfoUpdate(bookInfoForm);
            }}
          >
            submit
          </Button>
        </BookInfoInputBox>
        <BookInfoImgPreview>
          <img
            src={
              bookInfoForm.bookImgFile
                ? URL.createObjectURL(bookInfoForm.bookImgFile)
                : bookInfo?.bookImgFile
                ? `data:image/${bookInfo.bookImgFileExtension};base64,${bookInfo.bookImgFile}`
                : `${process.env.PUBLIC_URL}/book.svg`
            }
            alt="book img"
          />
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
