import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import Button from "../common/Button";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";

const ArticleEduCategoryManageTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const ArticleEduCategoryManageTopLine = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const ArticleEduCategoryListBox = styled.div`
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
  menuType,
  categoryList,
} : ArticleEduCategoryManageTemplatePropsType) => {

  const [categoryListImitate, setCategoryListImitate] = useState<commonTypes.categoryType[]>([]);
  const newCategoryKey = useRef<number>(0);

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

  return (
    <ArticleEduCategoryManageTemplateBlock>
      <ArticleEduCategoryManageTopLine>
        <Button onClick={handleAddCategory}>추가</Button>
      </ArticleEduCategoryManageTopLine>
      {categoryListImitate?.map((category, i) => (
          <ArticleEduCategoryItemBox 
            key={category.categorySeq}>
            {category.categoryName}<Button onClick={() => handleAddSubCategory(category.categorySeq)}>추가</Button>
            {category.subCategories?.map(subCategory => (
              <ArticleEduSubCategoryItemBox key={subCategory.subCategorySeq}>
                {subCategory.subCategoryName}
              </ArticleEduSubCategoryItemBox>
            ))}
          </ArticleEduCategoryItemBox>
      ))}
    </ArticleEduCategoryManageTemplateBlock>
  );
};

export default ArticleEduCategoryManageTemplate;
