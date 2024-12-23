import React, { useEffect, useState } from "react";
import BookContentViewTemplate from "../../components/book/BookContentViewTemplate";
import { useNavigate, useParams } from "react-router-dom";
import * as bookApiRequestParam from "../../lib/api/book";
import { useSelector } from "react-redux";
import * as authTypes from "../../types/authTypes";
import * as bookTypes from "../../types/bookTypes";
import { requestApiFn } from "../../lib/api/apiClient";
import useModal from "../../hooks/modal/useModal";

const BookContentViewContainer = () => {
  const { bookChapterInfoId } = useParams();
  const navigator = useNavigate();
  const modal = useModal();
  const [bookChapterInfo, setBookChapterInfo] = useState<bookTypes.bookContentType>({
    bookInfoId: "",
    bookChapterInfoId: "",
    bookChapterInfoTitle: "",
    bookChapterInfoContent: "",
    firstSaveUser: "",
  });
  const auth: authTypes.authInitialStateType = useSelector(
    ({ auth }: { auth: authTypes.authInitialStateType }) => auth
  );
  useEffect(() => {
    const searchBookChapterInfo = async () => {
      const resultData =  await requestApiFn<void, bookTypes.bookContentType>(
        bookApiRequestParam.searchBookContent(
          Number(bookChapterInfoId) as number
        )
      );
      if (resultData.msg === "success")
        setBookChapterInfo(resultData.data);
      else modal.openToastModal(resultData.msg, "error");
    };
    searchBookChapterInfo();
  }, []);

  const handleDeleteChapter = async (bookChapterInfoId: number) => {
    const resultData =  await requestApiFn<void, bookTypes.bookContentType>(
      bookApiRequestParam.deleteBookChapter(bookChapterInfoId)
    );
    if (resultData.msg === "success")
      navigator(`/book/chapter/${bookChapterInfo?.bookInfoId}`);
    else modal.openToastModal(resultData.msg, "error");
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
