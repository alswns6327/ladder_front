import React, { useEffect, useState } from "react";
import BookContentViewTemplate from "../../components/book/BookContentViewTemplate";
import { useParams } from "react-router-dom";
import * as api from "../../lib/api/book";

type bookChapterInfoType = {
  bookInfoId: number;
  bookChapterInfoId: number;
  bookChapterInfoTitle: string;
  bookChapterInfoContent: string;
};

const BookContentViewContainer = () => {
  const { bookChapterInfoId } = useParams();
  const [bookChapterInfo, setBookChapterInfo] = useState<bookChapterInfoType>();
  useEffect(() => {
    const searchBookChapterInfo = async () => {
      const response = await api.searchBookContent(
        Number(bookChapterInfoId) as number
      );
      if (response.data.msg === "success")
        setBookChapterInfo(response.data.data);
      else alert("저장 실패");
    };
    searchBookChapterInfo();
  }, []);

  return <BookContentViewTemplate bookChapterInfo={bookChapterInfo} />;
};

export default BookContentViewContainer;
