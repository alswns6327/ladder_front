import apiClient, { httpMethods } from "./apiClient";
import * as commonTypes from "../../types/commonTypes";
import * as bookTypes from "../../types/bookTypes";

export const bookInfoSave = (bookInfo: bookTypes.bookInfoType) : commonTypes.apiRequestInfo<bookTypes.bookInfoType> =>
  ({uri : "/book/info", httpMethod : httpMethods.POST, param : bookInfo, headers: {"Content-Type": "multipart/form-data",}});

export const updateBookInfo = (bookInfo: bookTypes.bookInfoType) : commonTypes.apiRequestInfo<bookTypes.bookInfoType> =>
  ({uri : "/book/info", httpMethod : httpMethods.PUT, param : bookInfo, headers: {"Content-Type": "multipart/form-data",}});

export const deleteBookInfo = (bookInfoId: number) : commonTypes.apiRequestInfo<void> =>
  ({uri : `/book/info/${bookInfoId}`, httpMethod : httpMethods.DELETE});

export const searchBookInfoList = (ladderAccountId : string) : commonTypes.apiRequestInfo<void> => 
  ({uri : `/book/info/list?ladderAccountId=${ladderAccountId}`, httpMethod : httpMethods.GET});

export const searchBookInfo = (bookInfoId: number) : commonTypes.apiRequestInfo<void> =>
  ({uri : `/book/info/${bookInfoId}`, httpMethod : httpMethods.GET});

export const saveBookContent = (bookContentInfo: bookTypes.bookContentType) : commonTypes.apiRequestInfo<bookTypes.bookContentType> =>
  ({uri : "/book/chapter/content", httpMethod : httpMethods.POST, param : bookContentInfo});

export const updateBookContent = (bookContentInfo: bookTypes.bookContentType) : commonTypes.apiRequestInfo<bookTypes.bookContentType> => 
  ({uri : "/book/chapter/content", httpMethod : httpMethods.PUT, param : bookContentInfo});

export const searchBookContentList = (bookInfoId: number) : commonTypes.apiRequestInfo<void> =>
  ({uri : `/book/chapter/list?bookInfoId=${bookInfoId}`, httpMethod : httpMethods.GET});

export const searchBookContent = (bookChapterInfoId: number) : commonTypes.apiRequestInfo<void> =>
  ({uri : `/book/chapter/${bookChapterInfoId}`, httpMethod : httpMethods.GET});

export const deleteBookChapter = (bookChapterInfoId: number) : commonTypes.apiRequestInfo<void> =>
  ({uri : `/book/chapter/${bookChapterInfoId}`, httpMethod : httpMethods.DELETE});
