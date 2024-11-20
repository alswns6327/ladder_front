import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import LinkButton from "../common/LinkButton";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";
import * as authTypes from "../../types/authTypes";
import * as commonTypes from "../../types/commonTypes";
import { ArticleEduCategoryItemBox, ArticleEduSubCategoryItemBox } from "./ArticleEduCategoryManageTemplate";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import TemplateBox from "../common/TemplateBox";
import CategoryButton from "../common/CategoryButton";
import NoneDecoLink from "../common/NoneDecoLink";
import NoContent from "../common/NoContent";

const ArticleEduListTemplateBlock = styled(TemplateBox)``;

const ArticleEduListHeader = styled.div`
  width: calc(100% - 101px);
  display: flex;
  justify-content: flex-end;
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
`;
const GroupList = styled.div`
  width: 100px;
  position: absolute;
  top: 0;
  right: 0;
  button {
    font-size: 9px;
    text-align: left;
  }
  background-color: black;
  border-radius: 8px;
  h4 {
    padding-top: 5px;
    padding-left: 5px;
    color: white;
    margin-bottom: 10px;
  }
`;

const ArticleEduList = styled.div`
  @media (max-width: 768px) {
    width: calc(100% - 101px);
  }
  @media (min-width: 769px) {
    width: calc(100% - 140px);
  }
  display: flex;
  row-gap: 20px;
  align-items: center;
  flex-direction: column;
`;

type ArticleEduListTemplateProps = {
  menuType : string;
  list : commonTypes.article[] | commonTypes.edu[];
  categoryList : commonTypes.categoryType[];
  userList : authTypes.ladderUserSelectType[];
  ladderAccountId : string;
  handleSelectBoxChange : (e : ChangeEvent<HTMLSelectElement>) => void;
  handleClickCategory : (categorySeq : number | null, subCategorySeq : number | null) => void;
}

const ArticleEduListTemplate = ({
  menuType,
  list,
  categoryList,
  userList,
  ladderAccountId,
  handleSelectBoxChange,
  handleClickCategory
} : ArticleEduListTemplateProps) => {

  const auth = useSelector(({auth} : {auth : authTypes.authInitialStateType}) => auth);

  return (
    <ArticleEduListTemplateBlock>
      <ArticleEduListHeader>
        {ladderAccountId === auth.ladderAccountId && <LinkButton text="추가" link={`/${menuType}/write`}/>}
        <select 
          value={ladderAccountId}
          onChange={handleSelectBoxChange}>
          {userList.map(user => (
            <option 
              value={user.ladderAccountId}
              key={user.ladderAccountSeq}>
              {user.ladderAccountId}
            </option>
          ))}
        </select>
      </ArticleEduListHeader>
      {!list || list.length === 0 ? <NoContent/> :
        <ArticleEduList>
          {list.map(item => {
            if("articleSeq" in item) return <NoneDecoLink key={item.articleSeq} to={`/${menuType}/${item.articleSeq}`}>{item.title}</NoneDecoLink>
            else if("eduSeq" in item) return <NoneDecoLink key={item.eduSeq} to={`/${menuType}/${item.eduSeq}`}>{item.title}</NoneDecoLink>
            }
          )}
        </ArticleEduList>
      }
      <GroupList>
        <h4>카테고리</h4>
        <CategoryButton
          onClick={() => handleClickCategory(null, null)}>
          전체
        </CategoryButton>
        {categoryList.map(category => (
          <ArticleEduCategoryItemBox 
            key={category.categorySeq}>
            <CategoryButton
              onClick={() => handleClickCategory(Number(category.categorySeq), null)}>
              {category.categoryName}
            </CategoryButton>
            {category.subCategories?.map(subCategory => (
              <ArticleEduSubCategoryItemBox 
                key={subCategory.subCategorySeq}>
                <CategoryButton
                  onClick={() => handleClickCategory(null, Number(subCategory.subCategorySeq))}>
                  {subCategory.subCategoryName}
                </CategoryButton>
              </ArticleEduSubCategoryItemBox>
            ))}
          </ArticleEduCategoryItemBox>
        ))}
        {ladderAccountId === auth.ladderAccountId && (<><br/><LinkButton text="카테고리 관리" link={`/${menuType}/group`}/></>)}
      </GroupList>
    </ArticleEduListTemplateBlock>
  );
};

export default ArticleEduListTemplate;
