import { useEffect, useState } from 'react';
import ArticleEduContentViewTemplate from '../../components/article_edu/ArticleEduContentViewTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import * as api from "../../lib/api/article";
import * as authApi from "../../lib/api/auth";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ArticleContentViewContainer = () => {
    const { articleSeq } = useParams();
    const navigator = useNavigate();
    const [article, setArticle] = useState<commonTypes.article>({
        articleSeq : "",
        categorySeq : "",
        subCategorySeq : "",
        title : "",
        content : "",
        categoryName : "",
        subCategoryName : "",
    });

    useEffect(() => {
        const searchArticle = async () => {
            const response = await api.searchArticle(Number(articleSeq));
            if(response.data.msg === "success") setArticle(response.data.data);
            else alert("조회 실패");
        }
        searchArticle();
    }, []);

    const handleRemoveArticle = async () => {
        const response = await api.deleteArticle(Number(articleSeq));
        if(response.data.msg === "success") {alert("삭제 완료"); navigator("/article");}
        else alert("삭제 실패");
    }

    return (
        <ArticleEduContentViewTemplate
            handleRemove={handleRemoveArticle}
            menuType='article'
            content={article}/>
    );
};

export default ArticleContentViewContainer;