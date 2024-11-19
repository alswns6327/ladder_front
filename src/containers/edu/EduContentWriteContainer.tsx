import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ArticleEduContentWriteTemplate from '../../components/article_edu/ArticleEduContentWriteTemplate';
import * as eduTypes from "../../types/eduTypes";
import * as authTypes from "../../types/authTypes";
import * as commonTypes from "../../types/commonTypes";
import { useSelector } from 'react-redux';
import * as eduApiRequestParam from "../../lib/api/edu";
import { useNavigate } from 'react-router-dom';
import { requestApiFn } from '../../lib/api/apiClient';
import useModal from "../../hooks/modal/useModal";

const EduContentWriteContainer = () => {
    const modal = useModal();
    const [eduCategoryList, setEduCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth : authTypes.authInitialStateType = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    const navigator = useNavigate();
    const [eduForm, setEduForm] = useState<commonTypes.edu>({
        categorySeq : "전체",
        subCategorySeq : "전체",
        title : "",
        content : "",
    });
    const subCategorySelectBoxRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const searchEduCategoryList = async () => {
            const resultData =  await requestApiFn<void, commonTypes.categoryType[]>(
                eduApiRequestParam.searchEduGroupList(auth.ladderAccountId)
            );
            if(resultData.msg === "success") setEduCategoryList(resultData.data);
            else modal.openToastModal(resultData.msg, "error");
        }
        searchEduCategoryList();
    }, []);

    useEffect(() => {
        if(subCategorySelectBoxRef.current?.value === "전체" && eduForm.subCategorySeq !== subCategorySelectBoxRef.current?.value) 
            setEduForm({...eduForm, subCategorySeq : "전체"});
    }, [eduForm]);

    const handleChangeMdText = (value: string | undefined, e: ChangeEvent<HTMLTextAreaElement> | undefined) => {
        setEduForm({...eduForm, content: value as string});
    };

    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        const {name, value} : {name : string, value : string} = e.target;
        setEduForm({...eduForm, [name] : value});
    }

    const handleChangeSelectBox = (e : ChangeEvent<HTMLSelectElement>) => {
        const {name, value} : {name : string, value : string} = e.target;
        setEduForm({...eduForm, [name] : value});
    }

    const handleSave = async () => {
        if(!eduForm.content.trim() || !eduForm.title.trim()) return modal.openToastModal("필수값을 입력해주세요.", "warning");
        
        const resultData =  await requestApiFn<commonTypes.edu, commonTypes.edu>(
            eduApiRequestParam.saveEdu(
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
            handleSave={handleSave}
            subCategorySelectBoxRef={subCategorySelectBoxRef}/>
    );
};

export default EduContentWriteContainer;