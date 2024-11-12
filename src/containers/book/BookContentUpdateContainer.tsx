import React, { ChangeEvent, useEffect, useState } from 'react';
import BookContentWriteTemplate from '../../components/book/BookContentWriteTemplate';
import { useNavigate, useParams } from 'react-router-dom';
import * as bookTypes from "../../types/bookTypes";
import * as api from "../../lib/api/book";

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
            const response = await api.searchBookContent(Number(bookChapterInfoId));
            if(response.data.msg === "success") setBookChapterInfo(response.data.data);
            else alert("챕터 정보가 없습니다.");
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
      
      const response = await api.updateBookContent(bookChapterInfo);
      if (response.data.msg === "success") navigator(`/book/chapter/${response.data.data.bookInfoId}`);
      else alert(response.data.msg);
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