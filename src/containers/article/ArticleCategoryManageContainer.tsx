import ArticleEduCategoryManageTemplate from '../../components/article_edu/ArticleEduCategoryManageTemplate';
import * as authTypes from "../../types/authTypes";
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";
import * as api from "../../lib/api/article";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ArticleCategoryManageContainer = () => {
    const [articleCategoryList, setArticleCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth : authTypes.authInitialStateType = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    useEffect(() => {
        const searchArticleCategoryList = async () => {
            const response = await api.searchArticleGroupList(auth.ladderAccountId);
            if(response.data.msg === "success") setArticleCategoryList(response.data.data);
            else alert("목록 조회 실패");
        }
        searchArticleCategoryList();
    }, []);

    const handleSaveArticleCategory = async (category : commonTypes.categoryType) : Promise<number> => {
        if(typeof category.categorySeq === "string"){
            const response = await api.saveCategory({...category, categorySeq : -1});
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
            const response = await api.saveSubCategory({...subCategory, subCategorySeq : -1});
            if(response.data.msg === "success") return response.data.data.subCategorySeq;
            else return -1;
        }else{
            const response = await api.updateSubCategory(subCategory);
            if(response.data.msg === "success") return response.data.data.subCategorySeq;
            else return -1;
        }
    }

    const handleRemoveArticleCategory = async (categorySeq : number) : Promise<string> => {
        const response = await api.deleteCategory(categorySeq);
        return response.data.msg;
    }

    const handleRemoveArticleSubCategory = async (subCategorySeq : number) : Promise<string> => {
        const response = await api.deleteSubCategory(subCategorySeq);
        return response.data.msg;
    }

    return (
        <ArticleEduCategoryManageTemplate 
            categoryList={articleCategoryList}
            handleSaveCategory={handleSaveArticleCategory}
            handleSaveSubCategory={handleSaveArticleSubCategory}
            handleRemoveCategory={handleRemoveArticleCategory}
            handleRemoveSubCategory={handleRemoveArticleSubCategory}/>
    );
};

export default ArticleCategoryManageContainer;