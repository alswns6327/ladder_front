import styled from "styled-components";

const ButtonBlock = styled.button`
  border-radius: 8px;
  width: 100px;
  background-color: white;
`;

const Button = (props: any) => {
  return <ButtonBlock {...props} />;
};

export default Button;
