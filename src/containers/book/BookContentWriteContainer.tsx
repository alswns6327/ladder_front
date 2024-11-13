import React, { ChangeEvent, useState } from "react";
import BookContentWriteTemplate from "../../components/book/BookContentWriteTemplate";
import { useNavigate, useParams } from "react-router-dom";
import * as bookApiRequestParam from "../../lib/api/book";
import * as bookTypes from "../../types/bookTypes";
import { requestApiFn } from "../../lib/api/apiClient";

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
    if(!bookChapterInfo.bookChapterInfoTitle.trim() || !bookChapterInfo.bookChapterInfoContent?.trim()) return alert("필수값을 입력해주세요.");
    
    const resultData =  await requestApiFn<bookTypes.bookContentType, bookTypes.bookContentType>(
      bookApiRequestParam.saveBookContent(bookChapterInfo)
    );
    if (resultData.msg === "success") navigator(`/book/chapter/${bookInfoId}`);
    else alert(resultData.msg);
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
