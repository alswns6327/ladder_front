import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import LinkButton from "../common/LinkButton";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";
import { ArticleEduCategoryItemBox, ArticleEduSubCategoryItemBox } from "./ArticleEduCategoryManageTemplate";

const ArticleEduListTemplateBlock = styled.div`
  width: 1150;
  margin-left: 150px;
  background-color: red;
  position: relative;
`;

const ArticleEduListHeader = styled.div`
  width: 85%;
  display: flex;
  justify-content: flex-end;
`;

const GroupList = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: aqua;
`;

const ArticleEduList = styled.div`
  width: 85%;
  display: flex;
  row-gap: 20px;
  align-items: center;
  flex-direction: column;
`;

type ArticleEduListTemplateProps = {
  menuType : string;
  list : commonTypes.article[];
  categoryList : commonTypes.categoryType[];
}

const ArticleEduListTemplate = ({
  menuType,
  list,
  categoryList
} : ArticleEduListTemplateProps) => {
  return (
    <ArticleEduListTemplateBlock>
      <ArticleEduListHeader>
        <LinkButton text="추가" link={`/${menuType}/write`}/>
      </ArticleEduListHeader>
      <ArticleEduList>
        {list.map(item => (
          <Link key={item.articleSeq} to={`/${menuType}/${item.articleSeq}`}>{item.title}</Link>
        ))}
      </ArticleEduList>
      <GroupList>
        {categoryList.map(category => (
          <ArticleEduCategoryItemBox 
            key={category.categorySeq}>
            {category.categoryName}
            {category.subCategories?.map(subCategory => (
              <ArticleEduSubCategoryItemBox 
                key={subCategory.subCategorySeq}>
                {subCategory.subCategoryName}
              </ArticleEduSubCategoryItemBox>
            ))}
          </ArticleEduCategoryItemBox>
        ))}
        <Link to={`/${menuType}/group`}>관리</Link>
      </GroupList>
    </ArticleEduListTemplateBlock>
  );
};

export default ArticleEduListTemplate;
