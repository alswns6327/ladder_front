import React, { useEffect, useState } from "react";
import BookListTemplate from "../../components/book/BookListTemplate";
import * as api from "../../lib/api/book";

type bookInfoType = {
  id: number;
  bookName: string;
  bookImgFile?: string;
  bookImgUrl?: string;
  bookImgFileExtension?: string;
};

const BookListContainer = () => {
  const [bookInfoList, setBookInfoList] = useState<bookInfoType[]>([]);

  useEffect(() => {
    const getBookInfoList = async () => {
      const response = await api.bookInfoList();
      if (response.data.msg === "success") setBookInfoList(response.data.data);
    };

    getBookInfoList();
  }, []);

  return <BookListTemplate bookInfoList={bookInfoList} />;
};

export default BookListContainer;
