import styled from "styled-components";

const InputBlock = styled.input`
  width: 200px;
  height: 30px;
  padding: 0 5px 0 10px;
  margin-left: 5px;
  border: none;
  border-radius: 8px;
  line-height: 30px;
`;

const Input = (props: any) => {
  return <InputBlock {...props} />;
};

export default Input;
