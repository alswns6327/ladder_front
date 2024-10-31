import styled from "styled-components";

const ButtonBlock = styled.button<{width : string}>`
  border-radius: 8px;
  width: ${props => props.width || '100px'};
  background-color: white;
`;

const Button = (props: any) => {
  return <ButtonBlock {...props} />;
};

export default Button;
