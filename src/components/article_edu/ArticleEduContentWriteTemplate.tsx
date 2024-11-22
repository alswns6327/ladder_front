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
import * as SelectStyle from "../common/SelectBox";
import Outside from "../common/Outside";

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
  handleChangeSelectBox : (category : commonTypes.categoryType | commonTypes.subCategoryType) => void;
  handleSave : () => void;
}

const ArticleEduContentWriteTemplate = ({
  categoryList,
  contentForm,
  handleChangeMdText,
  handleChangeInput,
  handleChangeSelectBox,
  handleSave,
} : ArticleEduContentWriteTemplateProps) => {

  const [subCategoryList, setCategorySubList] = useState<commonTypes.subCategoryType[]>([]);
  useEffect(() => {
    const category = categoryList.find(category => Number(category.categorySeq) === Number(contentForm.categorySeq));
    if(contentForm.categorySeq && category !== undefined) setCategorySubList([...category.subCategories])
    else if(categoryList.length > 0) setCategorySubList([...categoryList[0].subCategories]);
  }, [categoryList]);

  const handleChangeCategory = (category : commonTypes.categoryType) => {
    setCategorySubList(category.subCategories);
    handleChangeSelectBox(category);
  }
  const [toggleSelectBox, setToggleSelectBox] = useState<boolean>(false);
  const [toggleSubSelectBox, setToggleSubSelectBox] = useState<boolean>(false);
  
  return (
    <ArticleEduContentWriteTemplateBlock>
      <ArticleCategoryBox>
      <SelectStyle.SelectBoxContainer>
        <SelectStyle.DropdownBtn onClick={() => setToggleSelectBox(!toggleSelectBox)}>
          <div className="text">{contentForm.categoryName || categoryList[0]?.categoryName}</div>
          <div className="btn">▼</div>
        </SelectStyle.DropdownBtn>

        <Outside close={() => setToggleSelectBox(false)} $display={toggleSelectBox}>
          <SelectStyle.DropdownList>
            <SelectStyle.DropdownItem
              onClick={() => handleChangeCategory({categorySeq : "전체", categoryName : "전체", subCategories : []})}>
              전체
            </SelectStyle.DropdownItem>
            {categoryList.map(category => (
              <SelectStyle.DropdownItem key={category.categorySeq}
                onClick={() => handleChangeCategory(category)}>
                {category.categoryName}
              </SelectStyle.DropdownItem>
            ))}
          </SelectStyle.DropdownList>
        </Outside>
      </SelectStyle.SelectBoxContainer>

      <SelectStyle.SelectBoxContainer>
        <SelectStyle.DropdownBtn onClick={() => setToggleSubSelectBox(!toggleSubSelectBox)}>
          <div className="text">{contentForm.subCategoryName || subCategoryList[0]?.subCategoryName}</div>
          <div className="btn">▼</div>
        </SelectStyle.DropdownBtn>
        
        <Outside close={() => setToggleSubSelectBox(false)} $display={toggleSubSelectBox}>
          <SelectStyle.DropdownList>
            <SelectStyle.DropdownItem
              onClick={() => handleChangeSelectBox({subCategorySeq : "전체", subCategoryName : "전체", categorySeq : contentForm.categorySeq ?? "전체"})}>
              전체
            </SelectStyle.DropdownItem>
            {subCategoryList.map(subCategory => (
              <SelectStyle.DropdownItem key={subCategory.subCategorySeq}
                onClick={() => handleChangeSelectBox(subCategory)}>
                {subCategory.subCategoryName}
              </SelectStyle.DropdownItem>
            ))}
          </SelectStyle.DropdownList>
        </Outside>
      </SelectStyle.SelectBoxContainer>
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
          data-color-mode="light"
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
