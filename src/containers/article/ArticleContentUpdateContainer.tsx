import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ArticleEduContentWriteTemplate from '../../components/article_edu/ArticleEduContentWriteTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from "../../lib/api/article";

const ArticleContentUpdateContainer = () => {

    const { articleSeq } = useParams();
    const [articleCategoryList, setArticleCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth : authTypes.authInitialStateType = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    const navigator = useNavigate();
    const [articleForm, setArticleForm] = useState<commonTypes.article>({
        articleSeq : articleSeq,
        categorySeq : "전체",
        subCategorySeq : "전체",
        title : "",
        content : "",
    });
    const subCategorySelectBoxRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const searchArticleCategoryList = async () => {
            const response = await api.searchArticleGroupList(auth.ladderAccountId);
            if(response.data.msg === "success") {
                setArticleCategoryList(response.data.data);
            }
            else alert("목록 조회 실패");
        }
        searchArticleCategoryList();
    }, []);

    useEffect(() => {
        const searchArticle = async () => {
            const response = await api.searchArticle(Number(articleSeq));
            if(response.data.msg === "success") {
                const article : commonTypes.article = response.data.data as commonTypes.article;
                setArticleForm(
                    {
                        ...article,
                        categorySeq : article.categorySeq ? article.categorySeq : "전체",
                        subCategorySeq : article.subCategorySeq ? article.subCategorySeq : "전체"
                    }
                );
            }
            else alert("조회 실패");
        }
        searchArticle();
    }, []);
    
    const handleChangeMdText = (value: string | undefined, e: ChangeEvent<HTMLTextAreaElement> | undefined) => {
        setArticleForm({...articleForm, content: value as string});
    };

    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        const {name, value} : {name : string, value : string} = e.target;
        setArticleForm({...articleForm, [name] : value});
    }

    const handleChangeSelectBox = (e : ChangeEvent<HTMLSelectElement>) => {
        const {name, value} : {name : string, value : string} = e.target;
        setArticleForm({...articleForm, [name] : value, subCategorySeq : name === "categorySeq" ? "전체" : value});
    }

    const handleSave = async () => {
        const response = await api.updateArticle(
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

export default ArticleContentUpdateContainer;