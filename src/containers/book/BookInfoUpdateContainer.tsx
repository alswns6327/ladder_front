import React, { useEffect, useState } from "react";
import BookInfoSaveUpdateTemplate from "../../components/book/BookInfoSaveUpdateTemplate";
import { useNavigate, useParams } from "react-router-dom";
import * as bookApiRequestParam from "../../lib/api/book";
import * as bookTypes from "../../types/bookTypes";
import { requestApiFn } from "../../lib/api/apiClient";
import useModal from "../../hooks/modal/useModal";

const BookInfoUpdateContainer = () => {
  const { bookInfoId } = useParams();
  const navigator = useNavigate();
  const modal = useModal();

  const [bookInfo, setBookInfo] = useState<bookTypes.bookInfoFileStringType>();

  useEffect(() => {
    const searchBookInfo = async () => {
      const resultData =  await requestApiFn<void, bookTypes.bookInfoFileStringType>(
        bookApiRequestParam.searchBookInfo(Number(bookInfoId))
      );
      if (resultData.msg === "success") setBookInfo(resultData.data);
      else modal.openToastModal(resultData.msg, "error");
    };
    searchBookInfo();
  }, []);
  const handleBookInfoUpdate = async (bookInfoForm: bookTypes.bookInfoType) => {
    if(!bookInfoForm.bookName.trim()) return modal.openToastModal("책 제목을 입력해주세요.", "warning");

    const data: bookTypes.bookInfoType = Object.assign(bookInfoForm, {
      bookInfoId: bookInfoId,
    }) as bookTypes.bookInfoType;
    const resultData =  await requestApiFn<bookTypes.bookInfoType, bookTypes.bookInfoType>(
      bookApiRequestParam.updateBookInfo(data)
    );
    if (resultData.msg === "success") navigator("/");
    else modal.openToastModal(resultData.msg, "error");
  };
  return (
    <BookInfoSaveUpdateTemplate
      handleBookInfoUpdate={handleBookInfoUpdate}
      bookInfo={bookInfo}
    />
  );
};

export default BookInfoUpdateContainer;
