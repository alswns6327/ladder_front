import { ChangeEvent, useEffect, useState } from 'react';
import ArticleEduListTemplate from '../../components/article_edu/ArticleEduListTemplate';
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import * as api from "../../lib/api/edu";
import * as authApi from "../../lib/api/auth";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
            const response = await api.searchEduGroupList(ladderAccountId);
            if(response.data.msg === "success") setEduCategoryList(response.data.data);
            else alert("목록 조회 실패");
        }
        searchEduCategoryList();
    }, [ladderAccountId]);

    useEffect(() => {
        if(["STUDENT", "ADMIN"].includes(auth.ladderAccountAuth)){
            const searchEduList = async () => {
                const response = await api.searchEduList(encodeURIComponent(`{"ladderAccountId":"${ladderAccountId}","categorySeq":${null},"subCategorySeq":${null}}`));
                if(response.data.msg === "success") setEduList(response.data.data);
                else alert("조회 실패");
            }
            searchEduList();
        }
    }, [ladderAccountId]);

    useEffect(() => {
        const searchUsers = async () => {
            const response = await authApi.searchUsers();
            if(response.data.msg === "success") setUserList(response.data.data);
            else alert("조회 실패");
        }
        searchUsers();
    }, []);

    const handleSelectBoxChange = (e : ChangeEvent<HTMLSelectElement>) => {
        setLadderAccountId(e.target.value);
    }

    const handleClickCategory = async (categorySeq : number | null, subCategorySeq : number | null) => {
        const response = await api.searchEduList(encodeURIComponent(`{"ladderAccountId":"${ladderAccountId}","categorySeq":${categorySeq},"subCategorySeq":${subCategorySeq}}`));
        if(response.data.msg === "success") setEduList(response.data.data);
        else alert("조회 실패");
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

