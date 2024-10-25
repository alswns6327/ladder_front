import React, { useEffect, useState } from "react";
import BookListTemplate from "../../components/book/BookListTemplate";
import * as api from "../../lib/api/book";
import { useSelector } from "react-redux";
import { initialStateType } from "../../modules/auth";

type bookInfoType = {
  bookInfoId: number;
  bookName: string;
  bookImgFile?: string;
  bookImgUrl?: string;
  bookImgFileExtension?: string;
  firstSaveUser: string;
};

const BookListContainer = () => {
  const [bookInfoList, setBookInfoList] = useState<bookInfoType[]>([]);
  const auth: initialStateType = useSelector(
    ({ auth }: { auth: initialStateType }) => auth
  );
  useEffect(() => {
    const getBookInfoList = async () => {
      const response = await api.searchBookInfoList();
      if (response.data.msg === "success") setBookInfoList(response.data.data);
      else alert("조회 실패");
    };

    getBookInfoList();
  }, []);

  const handleDeleteBookItem = async (bookInfoId: number) => {
    const response = await api.deleteBookInfo(bookInfoId);
    if (response.data.msg === "success")
      setBookInfoList(
        bookInfoList.filter((bookInfo) => bookInfo.bookInfoId !== bookInfoId)
      );
    else alert("조회 실패");
  };

  return (
    <BookListTemplate
      ladderAccountId={auth?.ladderAccountId}
      bookInfoList={bookInfoList}
      handleDeleteBookItem={handleDeleteBookItem}
    />
  );
};

export default BookListContainer;
