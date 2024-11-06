import styled from "styled-components";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import LinkButton from "../common/LinkButton";
import * as articleTypes from "../../types/articleTypes";
import * as eduTypes from "../../types/eduTypes";
import * as authTypes from "../../types/authTypes";
import * as commonTypes from "../../types/commonTypes";
import { ArticleEduCategoryButton, ArticleEduCategoryItemBox, ArticleEduSubCategoryItemBox } from "./ArticleEduCategoryManageTemplate";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";

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
      <ArticleEduList>
        {list.map(item => (
          <Link key={item.articleSeq} to={`/${menuType}/${item.articleSeq}`}>{item.title}</Link>
        ))}
      </ArticleEduList>
      <GroupList>
        <ArticleEduCategoryButton
          onClick={() => handleClickCategory(null, null)}>
          전체
        </ArticleEduCategoryButton>
        {categoryList.map(category => (
          <ArticleEduCategoryItemBox 
            key={category.categorySeq}>
            <ArticleEduCategoryButton
              onClick={() => handleClickCategory(Number(category.categorySeq), null)}>
              {category.categoryName}
            </ArticleEduCategoryButton>
            {category.subCategories?.map(subCategory => (
              <ArticleEduSubCategoryItemBox 
                key={subCategory.subCategorySeq}>
                <ArticleEduCategoryButton
                  onClick={() => handleClickCategory(null, Number(subCategory.subCategorySeq))}>
                  {subCategory.subCategoryName}
                </ArticleEduCategoryButton>
              </ArticleEduSubCategoryItemBox>
            ))}
          </ArticleEduCategoryItemBox>
        ))}
        {ladderAccountId === auth.ladderAccountId && <Link to={`/${menuType}/group`}>관리</Link>}
      </GroupList>
    </ArticleEduListTemplateBlock>
  );
};

export default ArticleEduListTemplate;
