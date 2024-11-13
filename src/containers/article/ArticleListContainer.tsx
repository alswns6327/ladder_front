import { ChangeEvent, useEffect, useState } from 'react';
import ArticleEduListTemplate from '../../components/article_edu/ArticleEduListTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import * as articleApiRequestParam from "../../lib/api/article";
import * as authApiRequestParam from "../../lib/api/auth";
import { useSelector } from 'react-redux';
import { requestApiFn } from '../../lib/api/apiClient';

const ArticleListContainer = () => {

    const [articleList, setArticleList] = useState<commonTypes.article[]>([]);
    const [articleCategoryList, setArticleCategoryList] = useState<commonTypes.categoryType[]>([]);
    const [userList, setUserList] = useState<authTypes.ladderUserSelectType[]>([]);
    const auth = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    const [ladderAccountId, setLadderAccountId] = useState<string>(auth.ladderAccountId);
    
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

    useEffect(() => {
        const initLadderAccountId = ladderAccountId ? ladderAccountId :  userList[0]?.ladderAccountId;
        setLadderAccountId(initLadderAccountId);
    }, [userList]);

    useEffect(() => {
        const searchArticleCategoryList = async () => {
            const resultData =  await requestApiFn<void, commonTypes.categoryType[]>(
                articleApiRequestParam.searchArticleGroupList(ladderAccountId)
            )
            if(resultData.msg === "success") setArticleCategoryList(resultData.data);
            else alert(resultData.msg);
        }
        searchArticleCategoryList();
    }, [ladderAccountId]);

    useEffect(() => {
        const searchArticleList = async () => {
            const resultData =  await requestApiFn<void, commonTypes.article[]>(
                articleApiRequestParam.searchArticleList(encodeURIComponent(`{"ladderAccountId":"${ladderAccountId}","categorySeq":${null},"subCategorySeq":${null}}`))
            );
            if(resultData.msg === "success") setArticleList(resultData.data);
            else alert(resultData.msg);
        }
        searchArticleList();
    }, [ladderAccountId]);

    const handleSelectBoxChange = (e : ChangeEvent<HTMLSelectElement>) => {
        setLadderAccountId(e.target.value);
    }

    const handleClickCategory = async (categorySeq : number | null, subCategorySeq : number | null) => {
        const resultData =  await requestApiFn<void, commonTypes.article[]>(
            articleApiRequestParam.searchArticleList(encodeURIComponent(`{"ladderAccountId":"${ladderAccountId}","categorySeq":${categorySeq},"subCategorySeq":${subCategorySeq}}`))
        );
        if(resultData.msg === "success") setArticleList(resultData.data);
        else alert(resultData.msg);
    }

    return (
        <ArticleEduListTemplate
            menuType={"article"}
            list={articleList}
            categoryList={articleCategoryList}
            userList={userList}
            ladderAccountId={ladderAccountId}
            handleSelectBoxChange={handleSelectBoxChange}
            handleClickCategory={handleClickCategory}/>
    );
};

export default ArticleListContainer;