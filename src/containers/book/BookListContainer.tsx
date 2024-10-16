import React, { useEffect, useState } from "react";
import BookItemTemplate from "../../components/book/BookListTemplate";
import * as api from "../../lib/api/book";

type bookInfoType = {
  bookName: string;
  bookImgFile?: File;
  bookImgUrl?: string;
};

const BookListContainer = () => {
  const [bookInfoList, setBookInfoList] = useState<bookInfoType[]>([]);

  useEffect(() => {
    const getBookInfoList = async () => {
      const response = await api.bookInfoList();
      if (response.data.msg === "success") setBookInfoList(response.data.data);
    };

    getBookInfoList();
    console.log(bookInfoList);
  }, []);

  return <BookItemTemplate />;
};

export default BookListContainer;
