import React, { useEffect, useState } from "react";
import BookChapterListTemplate from "../../components/book/BookChapterListTemplate";
import { useParams } from "react-router-dom";
import * as api from "../../lib/api/book";
import { useSelector } from "react-redux";
import * as authTypes from "../../types/authTypes";
import * as bookTypes from "../../types/bookTypes";

const BookChapterListContainer = () => {
  const { bookInfoId } = useParams();
  const [chapterList, setChapterList] = useState<bookTypes.bookContentType[]>([]);
  const [bookInfo, setBookInfo] = useState<bookTypes.bookInfoFileStringType>({
    bookInfoId: Number(bookInfoId),
    bookName: "",
    bookImgFile: "",
    bookImgUrl: "",
    bookImgFileExtension: "",
    firstSaveUser: "",
  });
  const auth: authTypes.authInitialStateType = useSelector(
    ({ auth }: { auth: authTypes.authInitialStateType }) => auth
  );
  useEffect(() => {
    const searchChapterList = async () => {
      const response = await api.searchBookContentList(Number(bookInfoId));
      if (response.data.msg === "success") setChapterList(response.data.data);
      else alert("저장 실패");
    };
    searchChapterList();
  }, []);

  useEffect(() => {
    const searchBookInfo = async () => {
      const response = await api.searchBookInfo(Number(bookInfoId));
      if (response.data.msg === "success") setBookInfo(response.data.data);
      else alert("저장 실패");
    };
    searchBookInfo();
  }, []);
  return (
    <BookChapterListTemplate
      chapterList={chapterList}
      bookInfoId={bookInfoId}
      ladderAccountId={auth.ladderAccountId}
      bookInfo={bookInfo}
    />
  );
};

export default BookChapterListContainer;
