import React from "react";
import BookInfoSaveUpdateTemplate from "../../components/book/BookInfoSaveUpdateTemplate";
import * as bookApiRequestParam from "../../lib/api/book";
import { useNavigate } from "react-router-dom";
import * as bookTypes from "../../types/bookTypes";
import { requestApiFn } from "../../lib/api/apiClient";
import useModal from "../../hooks/modal/useModal";

const BookInfoSaveContainer = () => {
  const navigator = useNavigate();
  const modal = useModal();
  const handleBookInfoSave = async (
    bookInfoForm: bookTypes.bookInfoType
  ): Promise<void> => {
    if(!bookInfoForm.bookName.trim()) return modal.openToastModal("책 제목을 입력해주세요.", "warning");
    
    const resultData =  await requestApiFn<bookTypes.bookInfoType, bookTypes.bookInfoType>(
      bookApiRequestParam.bookInfoSave(bookInfoForm)
    );
    if (resultData.msg === "success") navigator("/");
    else modal.openToastModal(resultData.msg, "error");
  };

  return <BookInfoSaveUpdateTemplate handleBookInfoSave={handleBookInfoSave} />;
};

export default BookInfoSaveContainer;
