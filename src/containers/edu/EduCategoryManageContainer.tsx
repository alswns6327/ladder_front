import ArticleEduCategoryManageTemplate from '../../components/article_edu/ArticleEduCategoryManageTemplate';
import * as authTypes from "../../types/authTypes";
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import * as eduApiRequestParam from "../../lib/api/edu";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { requestApiFn } from '../../lib/api/apiClient';
import useModal from "../../hooks/modal/useModal";

const EduCategoryManageContainer = () => {
    const modal = useModal();
    const [eduCategoryList, setEduCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth : authTypes.authInitialStateType = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    useEffect(() => {
        const searchEduCategoryList = async () => {
            const resultData =  await requestApiFn<void, commonTypes.categoryType[]>(
                eduApiRequestParam.searchEduGroupList(auth.ladderAccountId)
            );
            if(resultData.msg === "success") setEduCategoryList(resultData.data);
            else modal.openToastModal(resultData.msg, "error");
        }
        searchEduCategoryList();
    }, []);

    const handleSaveEduCategory = async (category : commonTypes.categoryType) : Promise<number> => {
        if(typeof category.categorySeq === "string"){
            const resultData =  await requestApiFn<commonTypes.categoryType, commonTypes.categoryType>(
                eduApiRequestParam.saveCategory({...category, categorySeq : -1})
            );
            if(resultData.msg === "success") return Number(resultData.data.categorySeq);
            else return -1;
        }else{
            const resultData =  await requestApiFn<commonTypes.categoryType, commonTypes.categoryType>(
                eduApiRequestParam.updateCategory(category)
            );
            if(resultData.msg === "success") return Number(resultData.data.categorySeq);
            else return -1;
        }
    }

    const handleSaveEduSubCategory = async (subCategory : commonTypes.subCategoryType) : Promise<number> => {
        if(typeof subCategory.subCategorySeq === "string"){
            const resultData =  await requestApiFn<commonTypes.subCategoryType, commonTypes.subCategoryType>(
                eduApiRequestParam.saveSubCategory({...subCategory, subCategorySeq : -1})
            );
            if(resultData.msg === "success") return Number(resultData.data.subCategorySeq);
            else return -1;
        }else{
            const resultData =  await requestApiFn<commonTypes.subCategoryType, commonTypes.subCategoryType>(
                await eduApiRequestParam.updateSubCategory(subCategory)
            );
            if(resultData.msg === "success") return Number(resultData.data.subCategorySeq);
            else return -1;
        }
    }

    const handleRemoveEduCategory = async (categorySeq : number) : Promise<string> => {
        const resultData =  await requestApiFn<void, commonTypes.categoryType>(
            await eduApiRequestParam.deleteCategory(categorySeq)
        );
        return resultData.msg;
    }

    const handleRemoveEduSubCategory = async (subCategorySeq : number) : Promise<string> => {
        const resultData =  await requestApiFn<void, commonTypes.subCategoryType>(
            eduApiRequestParam.deleteSubCategory(subCategorySeq)
        );
        return resultData.msg;
    }

    return (
        <ArticleEduCategoryManageTemplate 
            categoryList={eduCategoryList}
            handleSaveCategory={handleSaveEduCategory}
            handleSaveSubCategory={handleSaveEduSubCategory}
            handleRemoveCategory={handleRemoveEduCategory}
            handleRemoveSubCategory={handleRemoveEduSubCategory}/>
    );
};

export default EduCategoryManageContainer;