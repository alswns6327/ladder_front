import React from "react";
import BookChapterListTemplate from "../../components/book/BookChapterListTemplate";
import { useParams } from "react-router-dom";

const BookChapterListContainer = () => {
  const { bookInfoId } = useParams();
  return <BookChapterListTemplate bookInfoId={bookInfoId} />;
};

export default BookChapterListContainer;
