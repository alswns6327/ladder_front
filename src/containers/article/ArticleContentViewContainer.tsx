import { useEffect, useState } from 'react';
import ArticleEduContentViewTemplate from '../../components/article_edu/ArticleEduContentViewTemplate';
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import * as articleApiRequestParam from "../../lib/api/article";
import * as authApiRequestParam from "../../lib/api/auth";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { requestApiFn } from '../../lib/api/apiClient';
import useModal from "../../hooks/modal/useModal";

const ArticleContentViewContainer = () => {
    const modal = useModal();
    const { articleSeq } = useParams();
    const navigator = useNavigate();
    const auth = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    const [article, setArticle] = useState<commonTypes.article>({
        articleSeq : "",
        categorySeq : "",
        subCategorySeq : "",
        title : "",
        content : "",
        categoryName : "",
        subCategoryName : "",
        firstSaveUser : "",
    });

    useEffect(() => {
        const searchArticle = async () => {
            const resultData =  await requestApiFn<void, commonTypes.article>(
                articleApiRequestParam.searchArticle(Number(articleSeq))
            )
            if(resultData.msg === "success") setArticle(resultData.data);
            else modal.openToastModal(resultData.msg, "error");
        }
        searchArticle();
    }, []);

    const handleRemoveArticle = async () => {
        const resultData =  await requestApiFn<void, commonTypes.article>(
            articleApiRequestParam.deleteArticle(Number(articleSeq))
        );
        if(resultData.msg === "success") navigator("/article");
        else modal.openToastModal(resultData.msg, "error");
    }

    return (
        <ArticleEduContentViewTemplate
            handleRemove={handleRemoveArticle}
            menuType='article'
            content={article}
            ladderAccountId={auth.ladderAccountId}/>
    );
};

export default ArticleContentViewContainer;