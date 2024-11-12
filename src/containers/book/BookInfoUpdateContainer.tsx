import React, { useEffect, useState } from "react";
import BookInfoSaveUpdateTemplate from "../../components/book/BookInfoSaveUpdateTemplate";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../lib/api/book";
import * as bookTypes from "../../types/bookTypes";

const BookInfoUpdateContainer = () => {
  const { bookInfoId } = useParams();
  const navigator = useNavigate();

  const [bookInfo, setBookInfo] = useState<bookTypes.bookInfoFileStringType>();

  useEffect(() => {
    const searchBookInfo = async () => {
      const response = await api.searchBookInfo(Number(bookInfoId));
      if (response.data.msg === "success") setBookInfo(response.data.data);
      else alert("저장 실패");
    };
    searchBookInfo();
  }, []);
  const handleBookInfoUpdate = async (bookInfoForm: bookTypes.bookInfoType) => {
    if(!bookInfoForm.bookName.trim()) return alert("책 제목을 입력해주세요.");

    const data: bookTypes.bookInfoType = Object.assign(bookInfoForm, {
      bookInfoId: bookInfoId,
    }) as bookTypes.bookInfoType;
    console.log(data);
    const response = await api.updateBookInfo(data);
    console.log(response);
    if (response.data.msg === "success") navigator("/");
    else alert("저장 실패");
  };
  return (
    <BookInfoSaveUpdateTemplate
      handleBookInfoUpdate={handleBookInfoUpdate}
      bookInfo={bookInfo}
    />
  );
};

export default BookInfoUpdateContainer;
