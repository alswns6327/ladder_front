import React, { ChangeEvent, useState } from "react";
import BookContentWriteTemplate from "../../components/book/BookContentWriteTemplate";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../lib/api/book";
import * as bookTypes from "../../types/bookTypes";

const BookContentWriteContainer = () => {
  const navigator = useNavigate();
  const { bookInfoId } = useParams();
  const [bookChapterInfo, setBookChapterInfo] = useState<bookTypes.bookContentType>({
    bookInfoId: bookInfoId,
    bookChapterInfoTitle: "",
    bookChapterInfoContent: "",
  });
  const handleChangeMdText = (
    value: string | undefined,
    e: ChangeEvent<HTMLTextAreaElement> | undefined
  ) => {
    setBookChapterInfo({...bookChapterInfo, bookChapterInfoContent: value});
  };
  
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value}= e.target;
    setBookChapterInfo({...bookChapterInfo, [name] : value});
  }

  const handleSaveContent = async () => {
    const response = await api.saveBookContent(bookChapterInfo);
    if (response.data.msg === "success") navigator(`/book/chapter/${bookInfoId}`);
    else alert("저장 실패");
  };

  return (
    <BookContentWriteTemplate
      bookChapterInfo={bookChapterInfo as bookTypes.bookContentType}
      handleChangeTitle={handleChangeTitle}
      handleChangeMdText={handleChangeMdText}
      handleSaveContent={handleSaveContent}
    />
  );
};

export default BookContentWriteContainer;
