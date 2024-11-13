import React, { useEffect, useState } from "react";
import BookInfoSaveUpdateTemplate from "../../components/book/BookInfoSaveUpdateTemplate";
import { useNavigate, useParams } from "react-router-dom";
import * as bookApiRequestParam from "../../lib/api/book";
import * as bookTypes from "../../types/bookTypes";
import { requestApiFn } from "../../lib/api/apiClient";

const BookInfoUpdateContainer = () => {
  const { bookInfoId } = useParams();
  const navigator = useNavigate();

  const [bookInfo, setBookInfo] = useState<bookTypes.bookInfoFileStringType>();

  useEffect(() => {
    const searchBookInfo = async () => {
      const resultData =  await requestApiFn<void, bookTypes.bookInfoFileStringType>(
        bookApiRequestParam.searchBookInfo(Number(bookInfoId))
      );
      if (resultData.msg === "success") setBookInfo(resultData.data);
      else alert(resultData.msg);
    };
    searchBookInfo();
  }, []);
  const handleBookInfoUpdate = async (bookInfoForm: bookTypes.bookInfoType) => {
    if(!bookInfoForm.bookName.trim()) return alert("책 제목을 입력해주세요.");

    const data: bookTypes.bookInfoType = Object.assign(bookInfoForm, {
      bookInfoId: bookInfoId,
    }) as bookTypes.bookInfoType;
    const resultData =  await requestApiFn<bookTypes.bookInfoType, bookTypes.bookInfoType>(
      bookApiRequestParam.updateBookInfo(data)
    );
    if (resultData.msg === "success") navigator("/");
    else alert(resultData.msg);
  };
  return (
    <BookInfoSaveUpdateTemplate
      handleBookInfoUpdate={handleBookInfoUpdate}
      bookInfo={bookInfo}
    />
  );
};

export default BookInfoUpdateContainer;
