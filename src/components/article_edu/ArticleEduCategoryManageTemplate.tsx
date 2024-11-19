import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import * as commonTypes from "../../types/commonTypes";
import Input from "../common/Input";
import { RightMenu } from "../common/RightMenu";
import BackHistoryButton from "../common/BackHistoryButton";
import RequiredText from "../common/RequiredText";
import TemplateBox from "../common/TemplateBox";
import useModal from "../../hooks/modal/useModal";

const ArticleEduCategoryManageTemplateBlock = styled(TemplateBox)``;

const ArticleEduCategoryManageTopLine = styled.div`
  position: absolute;
  left: 0px;
  top: -30px;
`;

export const ArticleEduCategoryItemBox = styled.div`
  
`

export const ArticleEduSubCategoryItemBox = styled(ArticleEduCategoryItemBox)`
  margin-left: 20px;
`

type ArticleEduCategoryManageTemplatePropsType = {
  categoryList : commonTypes.categoryType[];
  handleSaveCategory : (category : commonTypes.categoryType) => Promise<number>;
  handleSaveSubCategory : (subCategory : commonTypes.subCategoryType) => Promise<number>;
  handleRemoveCategory : (categorySeq : number) => Promise<string>;
  handleRemoveSubCategory : (subCategorySeq : number) => Promise<string>;
}

const ArticleEduCategoryManageTemplate = ({
  categoryList,
  handleSaveCategory,
  handleSaveSubCategory,
  handleRemoveCategory,
  handleRemoveSubCategory
} : ArticleEduCategoryManageTemplatePropsType) => {

  const [categoryListImitate, setCategoryListImitate] = useState<commonTypes.categoryType[]>([]);
  const newCategoryKey = useRef<number>(0);
  const buttonWidth : string = '50px';
  const inputWidth : string = '100px';
  const modal = useModal();

  useEffect(() => {
    setCategoryListImitate(categoryList);
  }, [categoryList]);

  const handleAddCategory = () => {
    const emptyCategory : commonTypes.categoryType = {
      categorySeq : `new${newCategoryKey.current++}`,
      categoryName : 'new 관점',
      subCategories: [],
    }
    setCategoryListImitate([...categoryListImitate, emptyCategory]);
  }

  const handleAddSubCategory = (categorySeq : number | string) => {

    if(typeof categorySeq === 'string') return modal.openToastModal("상위 카테고리를 저장해주세요.", "warning");

    const emptyCategory : commonTypes.subCategoryType = {
      subCategorySeq : `new${newCategoryKey.current++}`,
      categorySeq : categorySeq,
      subCategoryName: 'new 관점-1',
    }

    setCategoryListImitate(
      categoryListImitate.map(
        category => category.categorySeq === categorySeq ? 
          {...category, subCategories : [...category.subCategories, emptyCategory]} 
          : category
      )
    );
  }

  const handleRemoveCategoryWrapper = async (categorySeq : number | string) => {
    let checkDelete = false;
    if(typeof categorySeq === 'string') checkDelete = !checkDelete;
    else checkDelete = (await handleRemoveCategory(categorySeq)) === "success" ? true : false;

    if(checkDelete){
      modal.openToastModal("삭제 성공", "success");
      setCategoryListImitate(
        categoryListImitate.filter(
          category => category.categorySeq !== categorySeq
        )
      )
    }else{
      modal.openToastModal("삭제 실패", "error");
    }
  }

  const handleRemoveSubCategoryWrapper = async (categorySeq: number | string, subCategorySeq : number | string) => {
    let checkDelete = false
    if(typeof subCategorySeq === 'string') checkDelete = !checkDelete;
    else checkDelete = (await handleRemoveSubCategory(subCategorySeq)) === "success" ? true : false;

    if(checkDelete){
      modal.openToastModal("삭제 성공", "success");
      setCategoryListImitate(
        categoryListImitate.map(
          category => category.categorySeq === categorySeq ? 
            {...category, subCategories : category.subCategories.filter(subCategory => subCategory.subCategorySeq !== subCategorySeq)} 
            : category
        )
      )
    }else{
      modal.openToastModal("삭제 실패", "error");
    }
  }

  const handleCategoryChange = (categorySeq: number | string, e : ChangeEvent<HTMLInputElement>) => {
    const {name, value} : {name : string, value: string} = e.target;
    setCategoryListImitate(
      categoryListImitate.map(
        category => category.categorySeq === categorySeq ? 
          {...category, [name] : value} 
          : category
      )
    );

  }

  const handleSubCategoryChange = (categorySeq: number | string, subCategorySeq: number | string, e : ChangeEvent<HTMLInputElement>) => {
    const {name, value} : {name : string, value: string} = e.target;
    setCategoryListImitate(
      categoryListImitate.map(
        category => category.categorySeq === categorySeq ? 
          {...category, subCategories : category.subCategories.map(subCategory => subCategory.subCategorySeq === subCategorySeq ? ({...subCategory, [name] : value}) : subCategory)} 
          : category
      )
    );
  }

  const handleSaveCategoryWrapper = async (category : commonTypes.categoryType) => {
      if(!category.categoryName.trim()) return modal.openToastModal("카테고리 명을 입력해주세요.", "warning");
      const responseCategorySeq = await handleSaveCategory(category);
      if(responseCategorySeq === -1) return modal.openToastModal("저장 실패", "error");

      if(typeof category.categorySeq === 'string')
        setCategoryListImitate(
          categoryListImitate.map(
            c => c.categorySeq === category.categorySeq ? {...c, categorySeq : responseCategorySeq} : c
          )
        )
      
      modal.openToastModal("저장 성공", "success");
  }

  const handleSaveSubCategoryWrapper = async (subCategory : commonTypes.subCategoryType) => {
    if(!subCategory.subCategoryName.trim()) return modal.openToastModal("카테고리 명을 입력해주세요.", "warning");
    
    const responseSubCategorySeq = await handleSaveSubCategory(subCategory);
    if(responseSubCategorySeq === -1) return modal.openToastModal("저장 실패", "error");
    
    if(typeof subCategory.subCategorySeq === 'string')
      setCategoryListImitate(
        categoryListImitate.map(
          c => c.categorySeq === subCategory.categorySeq ? 
            {...c, subCategories : c.subCategories.map(sc => sc.subCategorySeq === subCategory.subCategorySeq ? ({...sc, subCategorySeq : responseSubCategorySeq}) : sc)}
            : c
        )
      )
    
    modal.openToastModal("저장 성공", "success");
  }

  return (
    <ArticleEduCategoryManageTemplateBlock topMargin="120px">
      <ArticleEduCategoryManageTopLine>
        <Button onClick={handleAddCategory}>추가</Button>
      </ArticleEduCategoryManageTopLine>
      {categoryListImitate?.map(category => (
          <ArticleEduCategoryItemBox 
            key={category.categorySeq}>
            <Input 
              width={inputWidth} 
              name="categoryName"
              value={category.categoryName}
              onChange={(e : ChangeEvent<HTMLInputElement>) => handleCategoryChange(category.categorySeq, e)}/>
            <Button 
              width={buttonWidth} 
              onClick={() => handleAddSubCategory(category.categorySeq)}>추가</Button>
            <Button 
              width={buttonWidth} 
              onClick={() => handleSaveCategoryWrapper(category)}>저장</Button>
            <Button 
              width={buttonWidth} 
              onClick={() => handleRemoveCategoryWrapper(category.categorySeq)}>삭제</Button>
            {category.subCategories?.map(subCategory => (
              <ArticleEduSubCategoryItemBox key={subCategory.subCategorySeq}>
                <Input 
                  width={inputWidth} 
                  name="subCategoryName"
                  value={subCategory.subCategoryName}
                  onChange={(e : ChangeEvent<HTMLInputElement>) => handleSubCategoryChange(category.categorySeq, subCategory.subCategorySeq, e)}/>
                <Button 
                  width={buttonWidth} 
                  onClick={() => handleRemoveSubCategoryWrapper(category.categorySeq, subCategory.subCategorySeq)}>
                  삭제
                </Button>
                <Button 
                  width={buttonWidth} 
                  onClick={() => handleSaveSubCategoryWrapper(subCategory)}>저장</Button>
              </ArticleEduSubCategoryItemBox>
            ))}
            <hr/>
          </ArticleEduCategoryItemBox>
      ))}
      <RightMenu>
        <BackHistoryButton>이전으로</BackHistoryButton>
      </RightMenu>
    </ArticleEduCategoryManageTemplateBlock>
  );
};

export default ArticleEduCategoryManageTemplate;
