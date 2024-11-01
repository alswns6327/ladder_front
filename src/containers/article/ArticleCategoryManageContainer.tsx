import ArticleEduCategoryManageTemplate from '../../components/article_edu/ArticleEduCategoryManageTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";
import * as api from "../../lib/api/article";
import { useEffect, useState } from 'react';

const ArticleCategoryManageContainer = () => {
    const [articleCategoryList, setArticleCategoryList] = useState<commonTypes.categoryType[]>([]);
    useEffect(() => {
        const searchArticleCategoryList = async () => {
            const response = await api.searchArticleGroupList();

            if(response.data.msg === "success") setArticleCategoryList(response.data.data);
            else alert("목록 조회 실패");
        }
        searchArticleCategoryList();
    }, []);

    const handleSaveArticleCategory = async (category : commonTypes.categoryType) : Promise<number> => {
        if(typeof category.categorySeq === "string"){
            category.categorySeq = -1;
            const response = await api.saveCategory(category);
            if(response.data.msg === "success") return response.data.data.categorySeq;
            else return -1;
        }else{
            const response = await api.updateCategory(category);
            if(response.data.msg === "success") return response.data.data.categorySeq;
            else return -1;
        }
    }

    const handleSaveArticleSubCategory = async (subCategory : commonTypes.subCategoryType) : Promise<number> => {
        if(typeof subCategory.subCategorySeq === "string"){
            subCategory.subCategorySeq = -1;
            const response = await api.saveSubCategory(subCategory);
            if(response.data.msg === "success") return response.data.data.subCategorySeq;
            else return -1;
        }else{
            const response = await api.updateSubCategory(subCategory);
            if(response.data.msg === "success") return response.data.data.subCategorySeq;
            else return -1;
        }
    }

    return (
        <ArticleEduCategoryManageTemplate 
            categoryList={articleCategoryList}
            handleSaveCategory={handleSaveArticleCategory}
            handleSaveSubCategory={handleSaveArticleSubCategory}/>
    );
};

export default ArticleCategoryManageContainer;