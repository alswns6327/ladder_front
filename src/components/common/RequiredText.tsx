import styled from 'styled-components';

const RequiredTextBlock = styled.div`
    color : red;
`;

const RequiredText = () => {
  return <RequiredTextBlock>필수</RequiredTextBlock>;
}

export default RequiredText;
