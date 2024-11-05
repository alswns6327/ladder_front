import { useEffect, useState } from 'react';
import ArticleEduContentViewTemplate from '../../components/article_edu/ArticleEduContentViewTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import * as api from "../../lib/api/article";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ArticleContentViewContainer = () => {
    const { articleSeq } = useParams();
    const [article, setArticle] = useState<commonTypes.article>({
        articleSeq : "",
        categorySeq : "",
        subCategorySeq : "",
        title : "",
        article : "",
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

    return (
        <ArticleEduContentViewTemplate
            menuType='article'
            article={article}/>
    );
};

export default ArticleContentViewContainer;