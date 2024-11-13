import React from "react";
import BookInfoSaveUpdateTemplate from "../../components/book/BookInfoSaveUpdateTemplate";
import * as bookApiRequestParam from "../../lib/api/book";
import { useNavigate } from "react-router-dom";
import * as bookTypes from "../../types/bookTypes";
import { requestApiFn } from "../../lib/api/apiClient";

const BookInfoSaveContainer = () => {
  const navigator = useNavigate();
  const handleBookInfoSave = async (
    bookInfoForm: bookTypes.bookInfoType
  ): Promise<void> => {
    if(!bookInfoForm.bookName.trim()) return alert("책 제목을 입력해주세요.");

    const resultData =  await requestApiFn<bookTypes.bookInfoType, bookTypes.bookInfoType>(
      bookApiRequestParam.bookInfoSave(bookInfoForm)
    );
    if (resultData.msg === "success") navigator("/");
    else alert(resultData.msg);
  };

  return <BookInfoSaveUpdateTemplate handleBookInfoSave={handleBookInfoSave} />;
};

export default BookInfoSaveContainer;
