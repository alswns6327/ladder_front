import ArticleEduCategoryManageTemplate from '../../components/article_edu/ArticleEduCategoryManageTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as api from "../../lib/api/article";
import { useEffect, useState } from 'react';

const ArticleCategoryManageContainer = () => {
    const [articleCategoryList, setArticleCategoryList] = useState<articleTypes.articleCategoryType[]>([]);
    useEffect(() => {
        const searchArticleCategoryList = async () => {
            const response = await api.searchArticleGroupList();

            if(response.data.msg === "success") setArticleCategoryList(response.data.data);
            else alert("목록 조회 실패");
        }
        searchArticleCategoryList();
    }, []);
    return (
        <ArticleEduCategoryManageTemplate 
            menuType={"article"} 
            categoryList={articleCategoryList}/>
    );
};

export default ArticleCategoryManageContainer;