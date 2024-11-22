import styled from 'styled-components';

const RequiredTextBlock = styled.div`
  width: 130px;
  text-align: left;
  color : red;
`;

const RequiredText = () => {
  return <RequiredTextBlock>필수</RequiredTextBlock>;
}

export default RequiredText;
