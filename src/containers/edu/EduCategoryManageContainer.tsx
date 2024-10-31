import { useState } from 'react';
import ArticleEduCategoryManageTemplate from '../../components/article_edu/ArticleEduCategoryManageTemplate';
import * as eduTypes from "../../types/eduTypes";

const EduCategoryManageContainer = () => {

    const [eduCategoryList, setEduCategoryList] = useState<eduTypes.eduCategoryType[]>([]);

    return (
        <ArticleEduCategoryManageTemplate menuType='1' categoryList={eduCategoryList}/>
    );
};

export default EduCategoryManageContainer;