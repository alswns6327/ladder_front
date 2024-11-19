import React, { useEffect, useState } from "react";
import BookChapterListTemplate from "../../components/book/BookChapterListTemplate";
import { useParams } from "react-router-dom";
import * as bookApiRequestParam from "../../lib/api/book";
import { useSelector } from "react-redux";
import * as authTypes from "../../types/authTypes";
import * as bookTypes from "../../types/bookTypes";
import { requestApiFn } from "../../lib/api/apiClient";
import useModal from "../../hooks/modal/useModal";

const BookChapterListContainer = () => {
  const { bookInfoId } = useParams();
  const modal = useModal();
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
      const resultData =  await requestApiFn<void, bookTypes.bookContentType[]>(
        bookApiRequestParam.searchBookContentList(Number(bookInfoId))
      );
      if (resultData.msg === "success") setChapterList(resultData.data);
      else modal.openToastModal(resultData.msg, "error");
    };
    searchChapterList();
  }, []);

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
