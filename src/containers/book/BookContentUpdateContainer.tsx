import React, { ChangeEvent, useEffect, useState } from 'react';
import BookContentWriteTemplate from '../../components/book/BookContentWriteTemplate';
import { useNavigate, useParams } from 'react-router-dom';
import * as bookTypes from "../../types/bookTypes";
import * as bookApiRequestParam from "../../lib/api/book";
import { requestApiFn } from '../../lib/api/apiClient';

const BookContentUpdateContainer = () => {
    const navigator = useNavigate();
    const { bookChapterInfoId } = useParams();
    const [bookChapterInfo, setBookChapterInfo] = useState<bookTypes.bookContentType>(
        {
            bookChapterInfoId: Number(bookChapterInfoId),
            bookChapterInfoTitle: "",
            bookChapterInfoContent: "",
        }
    );
    
    useEffect(() => {
        const searchBookChapterInfo = async () => {
            const resultData =  await requestApiFn<void, bookTypes.bookContentType>(
                bookApiRequestParam.searchBookContent(Number(bookChapterInfoId))
            );
            if(resultData.msg === "success") setBookChapterInfo(resultData.data);
            else alert(resultData.msg);
        }
        searchBookChapterInfo();
    }, []);

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value}= e.target;
        setBookChapterInfo({...bookChapterInfo, [name] : value});
    }

    const handleChangeMdText = (
      value: string | undefined,
      e: ChangeEvent<HTMLTextAreaElement> | undefined
    ) => {
        setBookChapterInfo({...bookChapterInfo, bookChapterInfoContent : value});
    };
  
    const handleUpdateContent = async () => {
      if(!bookChapterInfo.bookChapterInfoTitle.trim() || !bookChapterInfo.bookChapterInfoContent?.trim()) return alert("필수값을 입력해주세요.");
      
      const resultData =  await requestApiFn<bookTypes.bookContentType, bookTypes.bookContentType>(
        bookApiRequestParam.updateBookContent(bookChapterInfo)
      );
      if (resultData.msg === "success") navigator(`/book/chapter/${resultData.data.bookInfoId}`);
      else alert(resultData.msg);
    };

    return (
        <BookContentWriteTemplate 
            bookChapterInfo={bookChapterInfo as bookTypes.bookContentType}
            handleChangeTitle={handleChangeTitle}
            handleChangeMdText={handleChangeMdText}
            handleUpdateContent={handleUpdateContent}
        />
    );
};

export default BookContentUpdateContainer;