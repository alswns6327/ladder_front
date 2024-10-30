import ArticleEduGroupManageTemplate from '../../components/article_edu/ArticleEduGroupManageTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as api from "../../lib/api/article";
import { useEffect, useState } from 'react';

const ArticleGroupManageContainer = () => {
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
        <ArticleEduGroupManageTemplate 
            menuType={"article"} 
            categoryList={articleCategoryList}/>
    );
};

export default ArticleGroupManageContainer;