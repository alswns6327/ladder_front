import styled from "styled-components";
import Button from "../common/Button";
import { RightMenu } from "../common/RightMenu";
import MDEditor from "@uiw/react-md-editor";
import { TitleInput } from "../common/TitleInput";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import { ChangeEvent, useEffect, useState } from "react";
import BackHistoryButton from "../common/BackHistoryButton";
import RequiredText from "../common/RequiredText";
import TemplateBox from "../common/TemplateBox";

const ArticleEduContentWriteTemplateBlock = styled(TemplateBox)``;

const ArticleCategoryBox = styled.div`
  width: calc(100% - 101px);
  text-align: right;
  select {
    width: 150px;
    height: 35px;
    background-size: 20px;
    padding: 5px 30px 5px 10px;
    border-radius: 4px;
    outline: 0 none;
  }
  select option {    
    padding: 3px 0;
  }
`

const ArticleTitleBox = styled.div`
  width: calc(100% - 101px);
  text-align: center;
`;

const ArticleContentBox = styled.div`
  width: calc(100% - 101px);
  text-align: center;
`;

type ArticleEduContentWriteTemplateProps = {
  categoryList : commonTypes.categoryType[];
  contentForm : commonTypes.article | commonTypes.edu;
  handleChangeMdText : (value : string | undefined, e: ChangeEvent<HTMLTextAreaElement> | undefined) => void;
  handleChangeInput : (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelectBox : (e : ChangeEvent<HTMLSelectElement>) => void;
  handleSave : () => void;
  subCategorySelectBoxRef : React.ForwardedRef<HTMLSelectElement>;
}

const ArticleEduContentWriteTemplate = ({
  categoryList,
  contentForm,
  handleChangeMdText,
  handleChangeInput,
  handleChangeSelectBox,
  handleSave,
  subCategorySelectBoxRef,
} : ArticleEduContentWriteTemplateProps) => {

  const [subCategoryList, setCategorySubList] = useState<commonTypes.subCategoryType[]>([]);
  useEffect(() => {
    const category = categoryList.find(category => Number(category.categorySeq) === Number(contentForm.categorySeq));
    if(contentForm.categorySeq && category !== undefined) setCategorySubList([...category.subCategories])
    else if(categoryList.length > 0) setCategorySubList([...categoryList[0].subCategories]);
  }, [categoryList]);

  const handleChangeCategory = (e : ChangeEvent<HTMLSelectElement>) => {
    const {name, value} : {name : string, value : string} = e.target;
    const categoryIndex = categoryList.findIndex(category => category.categorySeq === Number(value));
    const subCategories = categoryList[categoryIndex]?.subCategories;
    setCategorySubList(subCategories ? [...subCategories] : []);
    handleChangeSelectBox(e);
  }

  return (
    <ArticleEduContentWriteTemplateBlock>
      <ArticleCategoryBox>
      <select 
        name="categorySeq"
        value={contentForm.categorySeq || categoryList[0]?.categorySeq}
        onChange={handleChangeCategory}>
        <option value={"전체"}>
          전체
        </option>
        {categoryList.map(category => (
          <option
            key={category.categorySeq} 
            value={category.categorySeq}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <select 
        name="subCategorySeq"
        value={contentForm.subCategorySeq || subCategoryList[0]?.subCategorySeq}
        onChange={handleChangeSelectBox}
        ref={subCategorySelectBoxRef}>
        <option value={"전체"}>
          전체
        </option>
        {subCategoryList.map(subCategory => (
          <option
            key={subCategory.subCategorySeq} 
            value={subCategory.subCategorySeq}>
            {subCategory.subCategoryName}
          </option>
        ))}
      </select>
      </ArticleCategoryBox>
      <ArticleTitleBox>
        <RequiredText/>
        <TitleInput
          name="title" 
          onChange={handleChangeInput} 
          value={contentForm.title} 
          placeholder="챕터 제목" />
      </ArticleTitleBox>
      <RequiredText/>
      <ArticleContentBox>
        <MDEditor
          height={400} 
          value={contentForm.content}
          onChange={handleChangeMdText} 
        />
      </ArticleContentBox>
      <RightMenu>
        <BackHistoryButton>이전으로</BackHistoryButton>
        <Button onClick={handleSave}>저장</Button>
      </RightMenu>
    </ArticleEduContentWriteTemplateBlock>
  );
};

export default ArticleEduContentWriteTemplate;
