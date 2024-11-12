import React from "react";
import BookInfoSaveUpdateTemplate from "../../components/book/BookInfoSaveUpdateTemplate";
import * as api from "../../lib/api/book";
import { useNavigate } from "react-router-dom";
import * as bookTypes from "../../types/bookTypes";

const BookInfoSaveContainer = () => {
  const navigator = useNavigate();
  const handleBookInfoSave = async (
    bookInfoForm: bookTypes.bookInfoType
  ): Promise<void> => {
    if(!bookInfoForm.bookName.trim()) return alert("책 제목을 입력해주세요.");

    const response = await api.bookInfoSave(bookInfoForm);
    if (response.data.msg === "success") navigator("/");
    else alert("저장 실패");
  };

  return <BookInfoSaveUpdateTemplate handleBookInfoSave={handleBookInfoSave} />;
};

export default BookInfoSaveContainer;
