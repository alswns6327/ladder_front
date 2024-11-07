import { useEffect, useState } from 'react';
import ArticleEduContentViewTemplate from '../../components/article_edu/ArticleEduContentViewTemplate';
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import * as api from "../../lib/api/edu";
import * as authApi from "../../lib/api/auth";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const EduContentViewContainer = () => {
    const { eduSeq } = useParams();
    const [edu, setEdu] = useState<commonTypes.edu>({
        eduSeq : "",
        categorySeq : "",
        subCategorySeq : "",
        title : "",
        content : "",
        categoryName : "",
        subCategoryName : "",
    });

    useEffect(() => {
        const searchEdu = async () => {
            const response = await api.searchEdu(Number(eduSeq));
            if(response.data.msg === "success") setEdu(response.data.data);
            else alert("조회 실패");
        }
        searchEdu();
    }, []);

    return (
        <ArticleEduContentViewTemplate
            menuType='edu'
            content={edu}/>
    );
};

export default EduContentViewContainer;