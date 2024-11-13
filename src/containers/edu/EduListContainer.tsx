import { ChangeEvent, useEffect, useState } from 'react';
import ArticleEduListTemplate from '../../components/article_edu/ArticleEduListTemplate';
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import * as eduApiRequestParam from "../../lib/api/edu";
import * as authApiRequestParam from "../../lib/api/auth";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestApiFn } from '../../lib/api/apiClient';

const EduListContainer = () => {

    const navigator = useNavigate();

    const [eduList, setEduList] = useState<commonTypes.edu[]>([]);
    const [eduCategoryList, setEduCategoryList] = useState<commonTypes.categoryType[]>([]);
    const [userList, setUserList] = useState<authTypes.ladderUserSelectType[]>([]);
    const auth = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    const [ladderAccountId, setLadderAccountId] = useState<string>(auth.ladderAccountId);
    useEffect(() => {
        if(!["STUDENT", "ADMIN"].includes(auth.ladderAccountAuth)) {
            alert("권한 없음");
            return navigator("/");
        }
        const searchEduCategoryList = async () => {
            const resultData =  await requestApiFn<void, commonTypes.categoryType[]>(
                eduApiRequestParam.searchEduGroupList(ladderAccountId)
            );
            if(resultData.msg === "success") setEduCategoryList(resultData.data);
            else alert(resultData.msg);
        }
        searchEduCategoryList();
    }, [ladderAccountId]);

    useEffect(() => {
        if(["STUDENT", "ADMIN"].includes(auth.ladderAccountAuth)){
            const searchEduList = async () => {
                const resultData =  await requestApiFn<void, commonTypes.edu[]>(
                    eduApiRequestParam.searchEduList(encodeURIComponent(`{"ladderAccountId":"${ladderAccountId}","categorySeq":${null},"subCategorySeq":${null}}`))
                );
                if(resultData.msg === "success") setEduList(resultData.data);
                else alert(resultData.msg);
            }
            searchEduList();
        }
    }, [ladderAccountId]);

    useEffect(() => {
        const searchUsers = async () => {
            const resultData =  await requestApiFn<void, authTypes.ladderUserSelectType[]>(
                authApiRequestParam.searchUsers()
            );
            if(resultData.msg === "success") setUserList(resultData.data);
            else alert(resultData.msg);
        }
        searchUsers();
    }, []);

    const handleSelectBoxChange = (e : ChangeEvent<HTMLSelectElement>) => {
        setLadderAccountId(e.target.value);
    }

    const handleClickCategory = async (categorySeq : number | null, subCategorySeq : number | null) => {
        const resultData =  await requestApiFn<void, commonTypes.edu[]>(
            eduApiRequestParam.searchEduList(encodeURIComponent(`{"ladderAccountId":"${ladderAccountId}","categorySeq":${categorySeq},"subCategorySeq":${subCategorySeq}}`))
        );
        if(resultData.msg === "success") setEduList(resultData.data);
        else alert(resultData.msg);
    }

    return (
        <ArticleEduListTemplate
            menuType={"edu"}
            list={eduList}
            categoryList={eduCategoryList}
            userList={userList}
            ladderAccountId={ladderAccountId}
            handleSelectBoxChange={handleSelectBoxChange}
            handleClickCategory={handleClickCategory}/>
    );
};

export default EduListContainer;

