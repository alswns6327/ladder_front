import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import * as commonTypes from "../../types/commonTypes";
import Input from "../common/Input";

const ArticleEduCategoryManageTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

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

export const ArticleEduCategoryButton = styled.button`
  
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

    if(typeof categorySeq === 'string') return alert("상위 카테고리를 저장해주세요.");

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

    if(checkDelete)
      setCategoryListImitate(
        categoryListImitate.filter(
          category => category.categorySeq !== categorySeq
        )
      )
  }

  const handleRemoveSubCategoryWrapper = async (categorySeq: number | string, subCategorySeq : number | string) => {
    let checkDelete = false
    if(typeof subCategorySeq === 'string') checkDelete = !checkDelete;
    else checkDelete = (await handleRemoveSubCategory(subCategorySeq)) === "success" ? true : false;

    if(checkDelete)
      setCategoryListImitate(
        categoryListImitate.map(
          category => category.categorySeq === categorySeq ? 
            {...category, subCategories : category.subCategories.filter(subCategory => subCategory.subCategorySeq !== subCategorySeq)} 
            : category
        )
      )
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
      const responseCategorySeq = await handleSaveCategory(category);
      if(responseCategorySeq === -1) return alert("저장 실패");

      if(typeof category.categorySeq === 'string')
        setCategoryListImitate(
          categoryListImitate.map(
            c => c.categorySeq === category.categorySeq ? {...c, categorySeq : responseCategorySeq} : c
          )
        )
      alert("저장 성공");
  }

  const handleSaveSubCategoryWrapper = async (subCategory : commonTypes.subCategoryType) => {
    const responseSubCategorySeq = await handleSaveSubCategory(subCategory);
      if(responseSubCategorySeq === -1) return alert("저장 실패");
      
      if(typeof subCategory.subCategorySeq === 'string')
        setCategoryListImitate(
          categoryListImitate.map(
            c => c.categorySeq === subCategory.categorySeq ? 
              {...c, subCategories : c.subCategories.map(sc => sc.subCategorySeq === subCategory.subCategorySeq ? ({...sc, subCategorySeq : responseSubCategorySeq}) : sc)}
              : c
          )
        )
      
      alert("저장 성공");
  }

  return (
    <ArticleEduCategoryManageTemplateBlock>
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
          </ArticleEduCategoryItemBox>
      ))}
    </ArticleEduCategoryManageTemplateBlock>
  );
};

export default ArticleEduCategoryManageTemplate;
