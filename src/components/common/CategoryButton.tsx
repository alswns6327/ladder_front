import styled from "styled-components";

const CategoryButtonBlock = styled.button<{width : string}>`
  border-radius: 8px;
  background-color: white;
  border: none;
  text-align: center;
  color: black;
  margin-top: 4px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const CategoryButton = (props: any) => {
  return <CategoryButtonBlock {...props} />;
};

export default CategoryButton;
