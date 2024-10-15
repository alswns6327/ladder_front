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
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: bookInfoType = Object.fromEntries(formData) as bookInfoType;
    const response = await api.bookInfoSave(data);
    console.log(response.data);
    console.log(response);
    return;
    if (response.data.masseg === "success") navigator("/");
    else alert("저장 실패");
  };

  return <BookInfoSaveUpdateTemplate handleBookInfoSave={handleBookInfoSave} />;
};

export default BookInfoSaveContainer;
