import apiClient from "./apiClient";
import * as bookTypes from "../../types/bookTypes";

export const bookInfoSave = (bookInfo: bookTypes.bookInfo) =>
  apiClient.post("/book/info", bookInfo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateBookInfo = (bookInfo: bookTypes.bookInfo & { bookInfoId: string }) =>
  apiClient.put("/book/info", bookInfo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteBookInfo = (bookInfoId: number) =>
  apiClient.delete(`/book/info/${bookInfoId}`);

export const searchBookInfoList = () => apiClient.get("/book/info/list");

export const searchBookInfo = (bookInfoId: number) =>
  apiClient.get(`/book/info/${bookInfoId}`);

export const saveBookContent = ({
  bookInfoId,
  bookChapterInfoTitle,
  bookChapterInfoContent,
}: bookTypes.bookContentType) =>
  apiClient.post("/book/chapter/content", {
    bookInfoId,
    bookChapterInfoTitle,
    bookChapterInfoContent,
  });

export const updateBookContent = ({
  bookChapterInfoId,
  bookChapterInfoTitle,
  bookChapterInfoContent,
}: bookTypes.bookContentType) => apiClient.put("/book/chapter/content", {
  bookChapterInfoId,
  bookChapterInfoTitle,
  bookChapterInfoContent,
})

export const searchBookContentList = (bookInfoId: number) =>
  apiClient.get(`/book/chapter/list?bookInfoId=${bookInfoId}`);

export const searchBookContent = (bookChapterInfoId: number) =>
  apiClient.get(`/book/chapter/${bookChapterInfoId}`);

export const deleteBookChapter = (bookChapterInfoId: number) =>
  apiClient.delete(`/book/chapter/${bookChapterInfoId}`);
