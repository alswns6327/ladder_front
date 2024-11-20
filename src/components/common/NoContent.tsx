import styled from 'styled-components';

const NoContentBlock = styled.div`
  width: calc(100% - 135px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoContent = () => {
  return <NoContentBlock>목록이 없습니다.</NoContentBlock>;
}

export default NoContent;
