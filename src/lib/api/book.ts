import apiClient from "./apiClient";

type bookInfo = {
  bookName: string;
  bookAuthorName: string;
  bookTranslatorName?: string;
  bookImgFile?: File;
};

export const bookInfoSave = (bookInfo: bookInfo) =>
  apiClient.post("/book/info", bookInfo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
