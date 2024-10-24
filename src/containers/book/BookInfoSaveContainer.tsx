import React from "react";
import BookInfoSaveUpdateTemplate from "../../components/book/BookInfoSaveUpdateTemplate";
import * as api from "../../lib/api/book";
import { useNavigate } from "react-router-dom";

type bookInfoType = {
  bookName: string;
  bookAuthorName: string;
  bookTranslatorName?: string;
  bookImgFile?: File;
};

const BookInfoSaveContainer = () => {
  const navigator = useNavigate();
  const handleBookInfoSave = async (
    bookInfoForm: bookInfoType
  ): Promise<void> => {
    const response = await api.bookInfoSave(bookInfoForm);
    if (response.data.msg === "success") navigator("/");
    else alert("저장 실패");
  };

  return <BookInfoSaveUpdateTemplate handleBookInfoSave={handleBookInfoSave} />;
};

export default BookInfoSaveContainer;
