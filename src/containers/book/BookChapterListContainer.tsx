import React, { useEffect, useState } from "react";
import BookChapterListTemplate from "../../components/book/BookChapterListTemplate";
import { useParams } from "react-router-dom";
import * as api from "../../lib/api/book";
import { useSelector } from "react-redux";
import { initialStateType } from "../../modules/auth";

type chapterType = {
  bookInfoId: number;
  bookChapterInfoId: number;
  bookChapterInfoTitle: string;
  bookChapterInfoContent: string;
};

type bookInfoType = {
  bookInfoId: number;
  bookName: string;
  bookImgFile?: string;
  bookImgUrl?: string;
  bookImgFileExtension?: string;
  firstSaveUser: string;
};
const BookChapterListContainer = () => {
  const { bookInfoId } = useParams();
  const [chapterList, setChapterList] = useState<chapterType[]>([]);
  const [bookInfo, setBookInfo] = useState<bookInfoType>({
    bookInfoId: Number(bookInfoId),
    bookName: "",
    bookImgFile: "",
    bookImgUrl: "",
    bookImgFileExtension: "",
    firstSaveUser: "",
  });
  const auth: initialStateType = useSelector(
    ({ auth }: { auth: initialStateType }) => auth
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
