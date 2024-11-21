import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ArticleEduContentWriteTemplate from '../../components/article_edu/ArticleEduContentWriteTemplate';
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as eduApiRequestParam from "../../lib/api/edu";
import { requestApiFn } from '../../lib/api/apiClient';
import useModal from "../../hooks/modal/useModal";

const EduContentUpdateContainer = () => {
    
    const { eduSeq } = useParams();
    const modal = useModal();
    const [eduCategoryList, setEduCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth : authTypes.authInitialStateType = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    const navigator = useNavigate();
    const [eduForm, setEduForm] = useState<commonTypes.edu>({
        eduSeq : eduSeq,
        categorySeq : "전체",
        categoryName : "전체",
        subCategorySeq : "전체",
        subCategoryName : "전체",
        title : "",
        content : "",
    });

    useEffect(() => {
        const searchEduCategoryList = async () => {
            const resultData =  await requestApiFn<void, commonTypes.categoryType[]>(
                eduApiRequestParam.searchEduGroupList(auth.ladderAccountId)
            );
            if(resultData.msg === "success") {
                setEduCategoryList(resultData.data);
            }
            else modal.openToastModal(resultData.msg, "error");
        }
        searchEduCategoryList();
    }, []);

    useEffect(() => {
        const searchEdu = async () => {
            const resultData =  await requestApiFn<void, commonTypes.edu>(
                eduApiRequestParam.searchEdu(Number(eduSeq))
            );
            if(resultData.msg === "success") {
                const edu : commonTypes.edu = resultData.data;
                setEduForm(
                    {
                        ...edu,
                        categorySeq : edu.categorySeq ? edu.categorySeq : "전체",
                        subCategorySeq : edu.subCategorySeq ? edu.subCategorySeq : "전체"
                    }
                );
            }
            else modal.openToastModal(resultData.msg, "error");
        }
        searchEdu();
    }, []);
    
    const handleChangeMdText = (value: string | undefined, e: ChangeEvent<HTMLTextAreaElement> | undefined) => {
        setEduForm({...eduForm, content: value as string});
    };

    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        const {name, value} : {name : string, value : string} = e.target;
        setEduForm({...eduForm, [name] : value});
    }

    const handleChangeSelectBox = (category : commonTypes.categoryType | commonTypes.subCategoryType) => {
        if("categoryName" in category) setEduForm({...eduForm, categorySeq : category.categorySeq, categoryName : category.categoryName, subCategorySeq : "전체", subCategoryName : "전체"});
        if("subCategorySeq" in category) setEduForm({...eduForm, subCategorySeq : category.subCategorySeq, subCategoryName : category.subCategoryName});
    }

    const handleSave = async () => {
        if(!eduForm.content.trim() || !eduForm.title.trim()) return modal.openToastModal("필수값을 입력해주세요.", "warning");
        

        const resultData =  await requestApiFn<commonTypes.edu, commonTypes.edu>(
            eduApiRequestParam.updateEdu(
                {
                    ...eduForm, 
                    categorySeq : eduForm.categorySeq === "전체" ? null : eduForm.categorySeq, 
                    subCategorySeq : eduForm.subCategorySeq === "전체" ? null : eduForm.subCategorySeq
                }
            )
        );
        if(resultData.msg === "success") navigator("/edu");
        else modal.openToastModal(resultData.msg, "error");
    }

    return (
        <ArticleEduContentWriteTemplate
            categoryList={eduCategoryList}
            contentForm={eduForm}
            handleChangeSelectBox={handleChangeSelectBox}
            handleChangeInput={handleChangeInput}
            handleChangeMdText={handleChangeMdText}
            handleSave={handleSave}/>
    );
};

export default EduContentUpdateContainer;