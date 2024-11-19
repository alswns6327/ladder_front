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
import useModal from "../../hooks/modal/useModal";

const EduContentViewContainer = () => {
    const { eduSeq } = useParams();
    const navigator = useNavigate();
    const modal = useModal();
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
            else modal.openToastModal(resultData.msg, "error");
        }
        searchEdu();
    }, []);

    const handleRemoveEdu = async () => {
        const resultData =  await requestApiFn<void, commonTypes.edu>(
            eduApiRequestParam.deleteEdu(Number(eduSeq))
        );
        if(resultData.msg === "success") {modal.openToastModal("삭제 성공", "success"); navigator("/edu");}
        else modal.openToastModal(resultData.msg, "error");
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