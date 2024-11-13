import { useEffect, useState } from 'react';
import ArticleEduContentViewTemplate from '../../components/article_edu/ArticleEduContentViewTemplate';
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import * as eduApiRequestParam from "../../lib/api/edu";
import * as authApiRequestParam from "../../lib/api/auth";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { requestApiFn } from '../../lib/api/apiClient';

const EduContentViewContainer = () => {
    const { eduSeq } = useParams();
    const navigator = useNavigate();
    const auth = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    const [edu, setEdu] = useState<commonTypes.edu>({
        eduSeq : "",
        categorySeq : "",
        subCategorySeq : "",
        title : "",
        content : "",
        categoryName : "",
        subCategoryName : "",
        firstSaveUser : "",
    });

    useEffect(() => {
        const searchEdu = async () => {
            const resultData =  await requestApiFn<void, commonTypes.edu>(
                eduApiRequestParam.searchEdu(Number(eduSeq))
            );
            if(resultData.msg === "success") setEdu(resultData.data);
            else alert(resultData.msg);
        }
        searchEdu();
    }, []);

    const handleRemoveEdu = async () => {
        const resultData =  await requestApiFn<void, commonTypes.edu>(
            eduApiRequestParam.deleteEdu(Number(eduSeq))
        );
        if(resultData.msg === "success") {alert("삭제 성공"); navigator("/edu");}
        else alert(resultData.msg);
    }

    return (
        <ArticleEduContentViewTemplate
            handleRemove={handleRemoveEdu}
            menuType='edu'
            content={edu}
            ladderAccountId={auth.ladderAccountId}/>
    );
};

export default EduContentViewContainer;