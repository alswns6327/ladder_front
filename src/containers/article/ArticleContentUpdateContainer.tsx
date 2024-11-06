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
    const [checkFirstRender, setCheckFirstRender] = useState<boolean>(true);
    const [articleCategoryList, setArticleCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth : authTypes.authInitialStateType = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    const navigator = useNavigate();
    const [articleForm, setArticleForm] = useState<commonTypes.article>({
        articleSeq : articleSeq,
        categorySeq : "",
        subCategorySeq : "",
        title : "",
        article : "",
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
            if(response.data.msg === "success") setArticleForm(response.data.data);
            else alert("조회 실패");
        }
        searchArticle();
    }, []);

    useEffect(() => {
        if(Number(articleForm.subCategorySeq) !== Number(subCategorySelectBoxRef.current?.value) && !checkFirstRender){
            const subCategorySeq = Number(subCategorySelectBoxRef.current?.value) as number
            setArticleForm({...articleForm, subCategorySeq : subCategorySeq})
        }
    }, [articleForm]);
    
    const handleChangeMdText = (value: string | undefined, e: ChangeEvent<HTMLTextAreaElement> | undefined) => {
        setArticleForm({...articleForm, article: value as string});
    };

    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        const {name, value} : {name : string, value : string} = e.target;
        setArticleForm({...articleForm, [name] : value});
    }

    const handleChangeSelectBox = (e : ChangeEvent<HTMLSelectElement>) => {
        const {name, value} : {name : string, value : string} = e.target;
        setArticleForm({...articleForm, [name] : value});
        setCheckFirstRender(!checkFirstRender);
    }

    const handleSave = async () => {
        const response = await api.updateArticle(articleForm);
        if(response.data.msg === "success") navigator("/article");
        else alert("저장 실패");
    }

    return (
        <ArticleEduContentWriteTemplate
            categoryList={articleCategoryList}
            articleForm={articleForm}
            handleChangeSelectBox={handleChangeSelectBox}
            handleChangeInput={handleChangeInput}
            handleChangeMdText={handleChangeMdText}
            handleSave={handleSave}
            subCategorySelectBoxRef={subCategorySelectBoxRef}/>
    );
};

export default ArticleContentUpdateContainer;