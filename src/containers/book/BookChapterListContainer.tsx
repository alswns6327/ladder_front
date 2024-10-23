import React, { useEffect, useState } from "react";
import BookChapterListTemplate from "../../components/book/BookChapterListTemplate";
import { useParams } from "react-router-dom";
import * as api from "../../lib/api/book";

type chapterType = {
  bookInfoId: number;
  bookChapterInfoId: number;
  bookChapterInfoTitle: string;
  bookChapterInfoContent: string;
};

const BookChapterListContainer = () => {
  const { bookInfoId } = useParams();
  const [chapterList, setChapterList] = useState<chapterType[]>([]);

  useEffect(() => {
    const searchChapterList = async () => {
      const response = await api.searchBookContentList(
        Number(bookInfoId) as number
      );
      if (response.data.msg === "success") setChapterList(response.data.data);
      else alert("저장 실패");
    };
    searchChapterList();
  }, []);

  return (
    <BookChapterListTemplate
      chapterList={chapterList}
      bookInfoId={bookInfoId}
    />
  );
};

export default BookChapterListContainer;
