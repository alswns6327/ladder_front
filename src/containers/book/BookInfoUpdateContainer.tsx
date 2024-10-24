import React, { useEffect, useState } from "react";
import BookInfoSaveUpdateTemplate from "../../components/book/BookInfoSaveUpdateTemplate";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../lib/api/book";

type bookInfoResponseType = {
  bookInfoId: number;
  bookName: string;
  bookAuthorName: string;
  bookTranslatorName: string;
  bookImgFile?: string;
  bookImgUrl?: string;
  bookImgFileExtension?: string;
};

type bookInfoType = {
  bookInfoId: string;
  bookName: string;
  bookAuthorName: string;
  bookTranslatorName?: string;
  bookImgFile?: File;
};

type bookInfoFormType = {
  bookName: string;
  bookAuthorName: string;
  bookTranslatorName?: string;
  bookImgFile?: File;
};

const BookInfoUpdateContainer = () => {
  const { bookInfoId } = useParams();
  const navigator = useNavigate();

  const [bookInfo, setBookInfo] = useState<bookInfoResponseType>();

  useEffect(() => {
    const searchBookInfo = async () => {
      const response = await api.searchBookInfo(bookInfoId as string);
      if (response.data.msg === "success") setBookInfo(response.data.data);
      else alert("저장 실패");
    };
    searchBookInfo();
  }, []);
  const handleBookInfoUpdate = async (bookInfoForm: bookInfoFormType) => {
    const data: bookInfoType = Object.assign(bookInfoForm, {
      bookInfoId: bookInfoId,
    }) as bookInfoType;
    const response = await api.updateBookInfo(data);
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
