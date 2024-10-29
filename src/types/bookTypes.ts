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
  };

export type bookInfoFileStringType = {
  bookInfoId: number;
  bookName: string;
  bookAuthorName?: string;
  bookTranslatorName?: string;
  bookImgFile?: string;
  bookImgUrl?: string;
  bookImgFileExtension?: string;
  firstSaveUser: string;
}