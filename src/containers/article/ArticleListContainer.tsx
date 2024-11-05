import { useEffect, useState } from 'react';
import ArticleEduListTemplate from '../../components/article_edu/ArticleEduListTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import * as api from "../../lib/api/article";
import { useSelector } from 'react-redux';

const ArticleListContainer = () => {

    const [articleList, setArticleList] = useState<commonTypes.article[]>([]);
    const [articleCategoryList, setArticleCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);


    useEffect(() => {
        const searchArticleCategoryList = async () => {
            const response = await api.searchArticleGroupList(auth.ladderAccountId);
            if(response.data.msg === "success") setArticleCategoryList(response.data.data);
            else alert("목록 조회 실패");
        }
        searchArticleCategoryList();
    }, []);

    useEffect(() => {
        const searchArticleList = async () => {
            const response = await api.searchArticleList(auth.ladderAccountId);
            if(response.data.msg === "success") setArticleList(response.data.data);
            else alert("조회 실패");
        }
        searchArticleList();
    }, []);

    return (
        <ArticleEduListTemplate
            menuType={"article"}
            list={articleList}
            categoryList={articleCategoryList}/>
    );
};

export default ArticleListContainer;