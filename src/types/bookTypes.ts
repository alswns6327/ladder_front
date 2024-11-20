export type bookContentType = {
    bookInfoId?: number | string | undefined;
    bookChapterInfoId?: number | string | undefined;
    bookChapterInfoTitle: string;
    bookChapterInfoContent: string | undefined;
    firstSaveUser?: string | undefined;
  };

export type bookInfoType = {
    bookInfoId?: string | number;
    bookName: string;
    bookAuthorName?: string;
    bookTranslatorName?: string;
    bookImgFile?: File;
    bookDescription? : string;
  };

export type bookInfoFileStringType = {
  bookInfoId: number;
  bookName: string;
  bookAuthorName?: string;
  bookTranslatorName?: string;
  bookImgFile?: string;
  bookImgUrl?: string;
  bookImgFileExtension?: string;
  bookDescription? : string;
  firstSaveUser: string;
}