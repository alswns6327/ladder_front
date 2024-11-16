import styled from "styled-components";

const ButtonBlock = styled.button<{width : string}>`
  border-radius: 8px;
  width: ${props => props.width || '100px'};
  background-color: white;
  border: 2px solid black;
  text-align: center;
  color: black;
`;

const Button = (props: any) => {
  return <ButtonBlock {...props} />;
};

export default Button;
