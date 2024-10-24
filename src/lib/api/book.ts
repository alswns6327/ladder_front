import apiClient from "./apiClient";

type bookInfo = {
  bookName: string;
  bookAuthorName: string;
  bookTranslatorName?: string;
  bookImgFile?: File;
};

type bookContentType = {
  bookInfoId: string | undefined;
  bookChapterInfoTitle: string;
  bookChapterInfoContent: string | undefined;
};

export const bookInfoSave = (bookInfo: bookInfo) =>
  apiClient.post("/book/info", bookInfo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateBookInfo = (bookInfo: bookInfo & { bookInfoId: string }) =>
  apiClient.put("/book/info", bookInfo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const searchBookInfoList = () => apiClient.get("/book/info/list");

export const searchBookInfo = (bookInfoId: string) =>
  apiClient.get(`/book/info/${bookInfoId}`);

export const saveBookContent = ({
  bookInfoId,
  bookChapterInfoTitle,
  bookChapterInfoContent,
}: bookContentType) =>
  apiClient.post("/book/chapter/content", {
    bookInfoId,
    bookChapterInfoTitle,
    bookChapterInfoContent,
  });

export const searchBookContentList = (bookInfoId: number) =>
  apiClient.get(`/book/chapter/list?bookInfoId=${bookInfoId}`);

export const searchBookContent = (bookChapterInfoId: number) =>
  apiClient.get(`/book/chapter/${bookChapterInfoId}`);
