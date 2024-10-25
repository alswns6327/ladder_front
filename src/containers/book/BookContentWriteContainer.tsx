import React, { ChangeEvent, useState } from "react";
import BookContentWriteTemplate from "../../components/book/BookContentWriteTemplate";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../lib/api/book";

type bookContentType = {
  bookInfoId: string | undefined;
  bookChapterInfoTitle: string;
  bookChapterInfoContent: string | undefined;
};

const BookContentWriteContainer = () => {
  const navigator = useNavigate();
  const { bookInfoId } = useParams();

  const [mdText, setMdText] = useState<string | undefined>("");
  const handleChangeMdText = (
    value: string | undefined,
    e: ChangeEvent<HTMLTextAreaElement> | undefined
  ) => {
    setMdText(value);
  };

  const handleSaveContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: bookContentType = Object.fromEntries(
      formData
    ) as bookContentType;
    data.bookChapterInfoContent = mdText;
    data.bookInfoId = bookInfoId;

    const response = await api.saveBookContent(data);
    if (response.data.msg === "success")
      navigator(`/book/chapter/${bookInfoId}`);
    else alert("저장 실패");
  };

  return (
    <BookContentWriteTemplate
      mdText={mdText}
      handleChangeMdText={handleChangeMdText}
      handleSaveContent={handleSaveContent}
    />
  );
};

export default BookContentWriteContainer;
