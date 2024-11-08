import { useEffect, useState } from 'react';
import ArticleEduContentViewTemplate from '../../components/article_edu/ArticleEduContentViewTemplate';
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import * as api from "../../lib/api/edu";
import * as authApi from "../../lib/api/auth";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const EduContentViewContainer = () => {
    const { eduSeq } = useParams();
    const navigator = useNavigate();
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

    const handleRemoveEdu = async () => {
        const response = await api.deleteEdu(Number(eduSeq));
        if(response.data.msg === "success") {alert("삭제 성공"); navigator("/edu");}
        else alert("삭제 실패");
    }

    return (
        <ArticleEduContentViewTemplate
            handleRemove={handleRemoveEdu}
            menuType='edu'
            content={edu}/>
    );
};

export default EduContentViewContainer;