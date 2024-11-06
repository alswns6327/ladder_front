import { useState } from 'react';
import ArticleEduCategoryManageTemplate from '../../components/article_edu/ArticleEduCategoryManageTemplate';
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";

const EduCategoryManageContainer = () => {

    const [eduCategoryList, setEduCategoryList] = useState<eduTypes.eduCategoryType[]>([]);

    const handleSaveEduCategory = async (category : commonTypes.categoryType) : Promise<number> => {
        return 1;
    }
    const handleSaveEduSubCategory = async (subCategory : commonTypes.subCategoryType) : Promise<number> => {
        return 1;
    }

    return (
        // <ArticleEduCategoryManageTemplate 
        //     categoryList={eduCategoryList}
        //     handleSaveCategory={handleSaveEduCategory}
        //     handleSaveSubCategory={handleSaveEduSubCategory}/>
        <div></div>
    );
};

export default EduCategoryManageContainer;