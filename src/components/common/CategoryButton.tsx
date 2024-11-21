import styled from "styled-components";

const CategoryButtonBlock = styled.button`
  border-radius: 8px;
  background-color: inherit;
  border: none;
  text-align: center;
  color: black;
  margin-top: 4px;
  cursor: pointer;
  color: white;
  &:hover {
    color: red;
  }
  width: 90px;
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden; /* 초과 내용 숨김 */
  text-overflow: ellipsis; /* 말 줄임표 표시 */
`;

const CategoryButton = (props: any) => {
  return <CategoryButtonBlock {...props} />;
};

export default CategoryButton;
