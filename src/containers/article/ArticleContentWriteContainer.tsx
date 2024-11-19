import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ArticleEduContentWriteTemplate from '../../components/article_edu/ArticleEduContentWriteTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as authTypes from "../../types/authTypes";
import * as commonTypes from "../../types/commonTypes";
import { useSelector } from 'react-redux';
import * as articleApiRequestParam from "../../lib/api/article";
import { useNavigate } from 'react-router-dom';
import { requestApiFn } from '../../lib/api/apiClient';
import useModal from "../../hooks/modal/useModal";

const ArticleContentWriteContainer = () => {
    const modal = useModal();
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
            const resultData =  await requestApiFn<void, commonTypes.categoryType[]>(
                articleApiRequestParam.searchArticleGroupList(auth.ladderAccountId)
            );
            if(resultData.msg === "success") setArticleCategoryList(resultData.data);
            else modal.openToastModal(resultData.msg, "error");
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
            return modal.openToastModal("필수값을 입력해주세요.", "warning");
        }
        const resultData =  await requestApiFn<commonTypes.article, commonTypes.article>(
            articleApiRequestParam.saveArticle(
                {
                    ...articleForm, 
                    categorySeq : articleForm.categorySeq === "전체" ? null : articleForm.categorySeq, 
                    subCategorySeq : articleForm.subCategorySeq === "전체" ? null : articleForm.subCategorySeq
                }
            )
        );
        if(resultData.msg === "success") navigator("/article");
        else modal.openToastModal(resultData.msg, "error");
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