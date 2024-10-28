export type bookContentType = {
    bookInfoId?: number | string | undefined;
    bookChapterInfoId?: number | string | undefined;
    bookChapterInfoTitle: string;
    bookChapterInfoContent: string | undefined;
    firstSaveUser?: string | undefined;
  };

export type bookInfo = {
    bookName: string;
    bookAuthorName: string;
    bookTranslatorName?: string;
    bookImgFile?: File;
  };