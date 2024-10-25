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

const BookChapterListContainer = () => {
  const { bookInfoId } = useParams();
  const [chapterList, setChapterList] = useState<chapterType[]>([]);
  const auth: initialStateType = useSelector(
    ({ auth }: { auth: initialStateType }) => auth
  );
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
      ladderAccountId={auth.ladderAccountId}
    />
  );
};

export default BookChapterListContainer;
