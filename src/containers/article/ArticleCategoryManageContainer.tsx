import ArticleEduCategoryManageTemplate from '../../components/article_edu/ArticleEduCategoryManageTemplate';
import * as authTypes from "../../types/authTypes";
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";
import * as articleApiRequestParam from "../../lib/api/article";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { requestApiFn } from '../../lib/api/apiClient';
import useModal from "../../hooks/modal/useModal";

const ArticleCategoryManageContainer = () => {
    const modal = useModal();
    const [articleCategoryList, setArticleCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth : authTypes.authInitialStateType = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    useEffect(() => {
        const searchArticleCategoryList = async () => {
            const resultData = await requestApiFn<void, commonTypes.categoryType[]>(
                articleApiRequestParam.searchArticleGroupList(auth.ladderAccountId)
            );
            if(resultData.msg === "success") setArticleCategoryList(resultData.data);
            else modal.openToastModal(resultData.msg, "error");
        }
        searchArticleCategoryList();
    }, []);

    const handleSaveArticleCategory = async (category : commonTypes.categoryType) : Promise<number> => {
        if(typeof category.categorySeq === "string"){
            const resultData = 
                await requestApiFn<commonTypes.categoryType, commonTypes.categoryType>(
                    articleApiRequestParam.saveCategory({...category, categorySeq : -1})
                );
            if(resultData.msg === "success") return Number(resultData.data.categorySeq);
            else return -1;
        }else{
            const resultData = 
                await requestApiFn<commonTypes.categoryType, commonTypes.categoryType>(
                    articleApiRequestParam.updateCategory(category)
                );
            if(resultData.msg === "success") return Number(resultData.data.categorySeq);
            else return -1;
        }
    }

    const handleSaveArticleSubCategory = async (subCategory : commonTypes.subCategoryType) : Promise<number> => {
        if(typeof subCategory.subCategorySeq === "string"){
            const resultData = await requestApiFn<commonTypes.subCategoryType, commonTypes.subCategoryType>(
                articleApiRequestParam.saveSubCategory({...subCategory, subCategorySeq : -1})
            )
            if(resultData.msg === "success") return Number(resultData.data.subCategorySeq);
            else return -1;
        }else{
            const resultData = await requestApiFn<commonTypes.subCategoryType, commonTypes.subCategoryType>(
                articleApiRequestParam.updateSubCategory(subCategory)
            )
            if(resultData.msg === "success") return Number(resultData.data.subCategorySeq);
            else return -1;
        }
    }

    const handleRemoveArticleCategory = async (categorySeq : number) : Promise<string> => {
        const resultData = await requestApiFn<void, commonTypes.categoryType>(
            articleApiRequestParam.deleteCategory(categorySeq)
        )
        return resultData.msg;
    }

    const handleRemoveArticleSubCategory = async (subCategorySeq : number) : Promise<string> => {
        const resultData = await requestApiFn<void, commonTypes.subCategoryType>(
            articleApiRequestParam.deleteSubCategory(subCategorySeq)
        )
        return resultData.msg;
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