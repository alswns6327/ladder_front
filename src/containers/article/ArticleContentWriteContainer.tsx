import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ArticleEduContentWriteTemplate from '../../components/article_edu/ArticleEduContentWriteTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as authTypes from "../../types/authTypes";
import * as commonTypes from "../../types/commonTypes";
import { useSelector } from 'react-redux';
import * as api from "../../lib/api/article";
import { useNavigate } from 'react-router-dom';

const ArticleContentWriteContainer = () => {

    const [articleCategoryList, setArticleCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth : authTypes.authInitialStateType = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    const navigator = useNavigate();
    const [articleForm, setArticleForm] = useState<commonTypes.article>({
        categorySeq : "전체",
        subCategorySeq : "전체",
        title : "",
        content : "",
    });
    const subCategorySelectBoxRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const searchArticleCategoryList = async () => {
            const response = await api.searchArticleGroupList(auth.ladderAccountId);
            if(response.data.msg === "success") setArticleCategoryList(response.data.data);
            else alert("목록 조회 실패");
        }
        searchArticleCategoryList();
    }, []);

    useEffect(() => {
        if(subCategorySelectBoxRef.current?.value === "전체" && articleForm.subCategorySeq !== subCategorySelectBoxRef.current?.value) 
            setArticleForm({...articleForm, subCategorySeq : "전체"});
    }, [articleForm]);

    const handleChangeMdText = (value: string | undefined, e: ChangeEvent<HTMLTextAreaElement> | undefined) => {
        setArticleForm({...articleForm, content: value as string});
    };

    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        const {name, value} : {name : string, value : string} = e.target;
        setArticleForm({...articleForm, [name] : value});
    }

    const handleChangeSelectBox = (e : ChangeEvent<HTMLSelectElement>) => {
        const {name, value} : {name : string, value : string} = e.target;        
        setArticleForm({...articleForm, [name] : value});
    }

    const handleSave = async () => {
        if(!articleForm.content.trim() || !articleForm.title.trim()){
            return alert("필수값을 입력해주세요.");
        }
        const response = await api.saveArticle(
            {
                ...articleForm, 
                categorySeq : articleForm.categorySeq === "전체" ? null : articleForm.categorySeq, 
                subCategorySeq : articleForm.subCategorySeq === "전체" ? null : articleForm.subCategorySeq}
        );
        if(response.data.msg === "success") navigator("/article");
        else alert("저장 실패");
    }

    return (
        <ArticleEduContentWriteTemplate
            categoryList={articleCategoryList}
            contentForm={articleForm}
            handleChangeSelectBox={handleChangeSelectBox}
            handleChangeInput={handleChangeInput}
            handleChangeMdText={handleChangeMdText}
            handleSave={handleSave}
            subCategorySelectBoxRef={subCategorySelectBoxRef}/>
    );
};

export default ArticleContentWriteContainer;