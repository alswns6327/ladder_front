import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import Button from "../common/Button";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";
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

const ArticleEduCategoryItemBox = styled.div`
  
`

const ArticleEduSubCategoryItemBox = styled(ArticleEduCategoryItemBox)`
  margin-left: 20px;
`

type ArticleEduCategoryManageTemplatePropsType = {
  menuType : string;
  categoryList : commonTypes.categoryType[];
}

const ArticleEduCategoryManageTemplate = ({
  categoryList,
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

  const handleRemoveCategory = (categorySeq : number | string) => {
    if(typeof categorySeq === 'string')
    setCategoryListImitate(
      categoryListImitate.filter(
        category => category.categorySeq !== categorySeq
      )
    );
  }

  const handleRemoveSubCategory = (categorySeq: number | string, subCategorySeq : number | string) => {
    if(typeof subCategorySeq === 'string')
    setCategoryListImitate(
      categoryListImitate.map(
        category => category.categorySeq === categorySeq ? 
          {...category, subCategories : category.subCategories.filter(subCategory => subCategory.subCategorySeq !== subCategorySeq)} 
          : category
      )
    );
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

  const handleSubCategoryChange = (categorySeq: number | string, e : ChangeEvent<HTMLInputElement>) => {
    const {name, value} : {name : string, value: string} = e.target;
    setCategoryListImitate(
      categoryListImitate.map(
        category => category.categorySeq === categorySeq ? 
          {...category, subCategories : category.subCategories.map(subCategory => ({...subCategory, [name] : value}))} 
          : category
      )
    );
  }

  const handleSaveCategory = async (category : commonTypes.categoryType) => {

  }

  const handleSaveSubCategory = async (subCategory : commonTypes.subCategoryType) => {

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
              onClick={() => handleSaveCategory(category)}>저장</Button>
            <Button 
              width={buttonWidth} 
              onClick={() => handleRemoveCategory(category.categorySeq)}>삭제</Button>
            {category.subCategories?.map(subCategory => (
              <ArticleEduSubCategoryItemBox key={subCategory.subCategorySeq}>
                <Input 
                  width={inputWidth} 
                  name="subCategoryName"
                  value={subCategory.subCategoryName}
                  onChange={(e : ChangeEvent<HTMLInputElement>) => handleSubCategoryChange(category.categorySeq, e)}/>
                <Button 
                  width={buttonWidth} 
                  onClick={() => handleRemoveSubCategory(category.categorySeq, subCategory.subCategorySeq)}>
                  삭제
                </Button>
                <Button 
                  width={buttonWidth} 
                  onClick={() => handleSaveSubCategory(subCategory)}>저장</Button>
              </ArticleEduSubCategoryItemBox>
            ))}
          </ArticleEduCategoryItemBox>
      ))}
    </ArticleEduCategoryManageTemplateBlock>
  );
};

export default ArticleEduCategoryManageTemplate;
