import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ArticleEduContentWriteTemplate from '../../components/article_edu/ArticleEduContentWriteTemplate';
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as eduApiRequestParam from "../../lib/api/edu";
import { requestApiFn } from '../../lib/api/apiClient';


const EduContentUpdateContainer = () => {
    
    const { eduSeq } = useParams();
    const [eduCategoryList, setEduCategoryList] = useState<commonTypes.categoryType[]>([]);
    const auth : authTypes.authInitialStateType = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);
    const navigator = useNavigate();
    const [eduForm, setEduForm] = useState<commonTypes.edu>({
        eduSeq : eduSeq,
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
            if(resultData.msg === "success") {
                setEduCategoryList(resultData.data);
            }
            else alert(resultData.msg);
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
            else alert(resultData.msg);
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

    const handleChangeSelectBox = (e : ChangeEvent<HTMLSelectElement>) => {
        const {name, value} : {name : string, value : string} = e.target;
        setEduForm({...eduForm, [name] : value, subCategorySeq : name === "categorySeq" ? "전체" : value});
    }

    const handleSave = async () => {
        if(!eduForm.content.trim() || !eduForm.title.trim()) return alert("필수값을 입력해주세요.");
        

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
        else alert(resultData.msg);
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

export default EduContentUpdateContainer;