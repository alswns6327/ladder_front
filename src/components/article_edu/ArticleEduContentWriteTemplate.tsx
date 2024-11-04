import styled from "styled-components";
import Button from "../common/Button";
import { RightMenu } from "../common/RightMenu";
import MDEditor from "@uiw/react-md-editor";
import { TitleInput } from "../common/TitleInput";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import { ChangeEvent, useEffect, useState } from "react";

const ArticleEduContentWriteTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const ArticleCategoryBox = styled.div`
  width: 85%;
  text-align: right;
  select {
    width: 150px;
    height: 35px;
    background: white;
    background-size: 20px;
    padding: 5px 30px 5px 10px;
    border-radius: 4px;
    outline: 0 none;
  }
  select option {    
    background: white;
    color: black;
    padding: 3px 0;
  }
`

const ArticleTitleBox = styled.div`
  width: 85%;
  text-align: center;
`;

const ArticleContentBox = styled.div`
  width: 85%;
  text-align: center;
`;

type ArticleEduContentWriteTemplateProps = {
  categoryList : commonTypes.categoryType[];
  articleForm : commonTypes.article;
  handleChangeMdText : (value : string | undefined, e: ChangeEvent<HTMLTextAreaElement> | undefined) => void;
  handleChangeInput : (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelectBox : (e : ChangeEvent<HTMLSelectElement>) => void;
  handleSave : () => void;
  subCategorySelectBoxRef : React.ForwardedRef<HTMLSelectElement>;
}

const ArticleEduContentWriteTemplate = ({
  categoryList,
  articleForm,
  handleChangeMdText,
  handleChangeInput,
  handleChangeSelectBox,
  handleSave,
  subCategorySelectBoxRef,
} : ArticleEduContentWriteTemplateProps) => {

  const [categorySubList, setCategorySubList] = useState<commonTypes.subCategoryType[]>([]);

  useEffect(() => {
    if(categoryList.length > 0){
      setCategorySubList([...categoryList[0].subCategories]);
    }
  }, [categoryList]);

  const handleChangeCategory = (e : ChangeEvent<HTMLSelectElement>) => {
    const {name, value} : {name : string, value : string} = e.target;
    const categoryIndex = categoryList.findIndex(category => category.categorySeq === Number(value));
    setCategorySubList([...categoryList[categoryIndex].subCategories]);
    handleChangeSelectBox(e);
  }

  return (
    <ArticleEduContentWriteTemplateBlock>
      <ArticleCategoryBox>
      <select 
        name="categorySeq"
        onChange={handleChangeCategory}>
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
        onChange={handleChangeSelectBox}
        ref={subCategorySelectBoxRef}>
        {categorySubList.map(subCategory => (
          <option 
            key={subCategory.subCategorySeq} 
            value={subCategory.subCategorySeq}>
            {subCategory.subCategoryName}
          </option>
        ))}
      </select>
      </ArticleCategoryBox>
      <ArticleTitleBox>
        <TitleInput
          name="title" 
          onChange={handleChangeInput} 
          value={articleForm.title} 
          placeholder="챕터 제목" />
      </ArticleTitleBox>
      <ArticleContentBox>
        <MDEditor
          height={400} 
          value={articleForm.article}
          onChange={handleChangeMdText} 
        />
      </ArticleContentBox>
      <RightMenu>
        <Button>목록 보기</Button>
        <Button onClick={handleSave}>저장</Button>
      </RightMenu>
    </ArticleEduContentWriteTemplateBlock>
  );
};

export default ArticleEduContentWriteTemplate;
