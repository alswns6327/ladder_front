import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoneDecoLinkBlock = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:link, &:visited, &:hover, &:active {
    color: black;
    text-decoration: none;
  }
`;

const NoneDecoLink = (props : any) => {
  return <NoneDecoLinkBlock {...props}></NoneDecoLinkBlock>;
}

export default NoneDecoLink;
