import ArticleEduCategoryManageTemplate from '../../components/article_edu/ArticleEduCategoryManageTemplate';
import * as authTypes from "../../types/authTypes";
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import * as api from "../../lib/api/edu";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const EduCategoryManageContainer = () => {
    const [eduCategoryList, setEduCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth : authTypes.authInitialStateType = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    useEffect(() => {
        const searchEduCategoryList = async () => {
            const response = await api.searchEduGroupList(auth.ladderAccountId);
            if(response.data.msg === "success") setEduCategoryList(response.data.data);
            else alert("목록 조회 실패");
        }
        searchEduCategoryList();
    }, []);

    const handleSaveEduCategory = async (category : commonTypes.categoryType) : Promise<number> => {
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

    const handleSaveEduSubCategory = async (subCategory : commonTypes.subCategoryType) : Promise<number> => {
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

    const handleRemoveEduCategory = async (categorySeq : number) : Promise<string> => {
        const response = await api.deleteCategory(categorySeq);
        return response.data.msg;
    }

    const handleRemoveEduSubCategory = async (subCategorySeq : number) : Promise<string> => {
        const response = await api.deleteSubCategory(subCategorySeq);
        return response.data.msg;
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