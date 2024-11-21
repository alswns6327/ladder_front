import React, { ChangeEvent, useEffect, useState } from "react";
import BookListTemplate from "../../components/book/BookListTemplate";
import * as bookApiRequestParam from "../../lib/api/book";
import * as authApiRequestParam from "../../lib/api/auth";
import { useSelector } from "react-redux";
import * as authTypes from "../../types/authTypes";
import * as bookTypes from "../../types/bookTypes";
import { requestApiFn } from "../../lib/api/apiClient";
import useModal from "../../hooks/modal/useModal";

const BookListContainer = () => {
  const modal = useModal();
  const auth: authTypes.authInitialStateType = useSelector(
    ({ auth }: { auth: authTypes.authInitialStateType }) => auth
  );
  const [bookInfoList, setBookInfoList] = useState<bookTypes.bookInfoFileStringType[]>([]);
  const [userList, setUserList] = useState<authTypes.ladderUserSelectType[]>([]);
  const [ladderAccountId, setLadderAccountId] = useState<string>(auth.ladderAccountId);
  
  useEffect(() => {
    const searchUsers = async () => {
        const resultData =  await requestApiFn<void, authTypes.ladderUserSelectType[]>(
          authApiRequestParam.searchUsers()
        );
        if(resultData.msg === "success") setUserList(resultData.data);
        else modal.openToastModal(resultData.msg, "error");
    }
    searchUsers();
  }, []);

  useEffect(() => {
    const initLadderAccountId = ladderAccountId ? ladderAccountId :  userList[0]?.ladderAccountId;
    setLadderAccountId(initLadderAccountId);
  }, [userList]);

  useEffect(() => {
    const getBookInfoList = async () => {
      const resultData =  await requestApiFn<void, bookTypes.bookInfoFileStringType[]>(
        bookApiRequestParam.searchBookInfoList(ladderAccountId)
      );
      if (resultData.msg === "success") setBookInfoList(resultData.data);
      else modal.openToastModal(resultData.msg, "error");
    };
    if(ladderAccountId) getBookInfoList();
  }, [ladderAccountId]);

  const handleDeleteBookItem = async (bookInfoId: number) => {
    const resultData =  await requestApiFn<void, bookTypes.bookInfoFileStringType[]>(
      bookApiRequestParam.deleteBookInfo(bookInfoId)
    );
    if (resultData.msg === "success")
      setBookInfoList(
        bookInfoList.filter((bookInfo) => bookInfo.bookInfoId !== bookInfoId)
      );
    else modal.openToastModal(resultData.msg, "error");
  };
  const handleSelectBoxChange = (ladderAccountId : string) => {
    setLadderAccountId(ladderAccountId);
  }
  return (
    <BookListTemplate
      userList={userList}
      ladderAccountId={ladderAccountId}
      bookInfoList={bookInfoList}
      handleDeleteBookItem={handleDeleteBookItem}
      handleSelectBoxChange={handleSelectBoxChange}
    />
  );
};

export default BookListContainer;
