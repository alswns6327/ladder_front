import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ArticleEduContentWriteTemplate from '../../components/article_edu/ArticleEduContentWriteTemplate';
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import * as authTypes from "../../types/authTypes";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from "../../lib/api/edu";


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
            const response = await api.searchEduGroupList(auth.ladderAccountId);
            if(response.data.msg === "success") {
                setEduCategoryList(response.data.data);
            }
            else alert("목록 조회 실패");
        }
        searchEduCategoryList();
    }, []);

    useEffect(() => {
        const searchEdu = async () => {
            const response = await api.searchEdu(Number(eduSeq));
            if(response.data.msg === "success") {
                const edu : commonTypes.edu = response.data.data as commonTypes.edu;
                setEduForm(
                    {
                        ...edu,
                        categorySeq : edu.categorySeq ? edu.categorySeq : "전체",
                        subCategorySeq : edu.subCategorySeq ? edu.subCategorySeq : "전체"
                    }
                );
            }
            else alert("조회 실패");
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
        

        const response = await api.updateEdu(
            {
                ...eduForm, 
                categorySeq : eduForm.categorySeq === "전체" ? null : eduForm.categorySeq, 
                subCategorySeq : eduForm.subCategorySeq === "전체" ? null : eduForm.subCategorySeq}
        );
        if(response.data.msg === "success") navigator("/edu");
        else alert("저장 실패");
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