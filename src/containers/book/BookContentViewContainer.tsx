import React, { useEffect, useState } from "react";
import BookContentViewTemplate from "../../components/book/BookContentViewTemplate";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../lib/api/book";
import { useSelector } from "react-redux";
import { initialStateType } from "../../modules/auth";
import * as bookTypes from "../../types/bookTypes";

const BookContentViewContainer = () => {
  const { bookChapterInfoId } = useParams();
  const navigator = useNavigate();
  const [bookChapterInfo, setBookChapterInfo] = useState<bookTypes.bookContentType>({
    bookInfoId: "",
    bookChapterInfoId: "",
    bookChapterInfoTitle: "",
    bookChapterInfoContent: "",
    firstSaveUser: "",
  });
  const auth: initialStateType = useSelector(
    ({ auth }: { auth: initialStateType }) => auth
  );
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

  const handleDeleteChapter = async (bookChapterInfoId: number) => {
    const response = await api.deleteBookChapter(bookChapterInfoId);
    if (response.data.msg === "success")
      navigator(`/book/chapter/${bookChapterInfo?.bookInfoId}`);
    else alert("삭제 실패");
  };
  return (
    <BookContentViewTemplate
      bookChapterInfo={bookChapterInfo}
      ladderAccountId={auth.ladderAccountId}
      handleDeleteChapter={handleDeleteChapter}
    />
  );
};

export default BookContentViewContainer;
