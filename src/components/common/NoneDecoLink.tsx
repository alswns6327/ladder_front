import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoneDecoLinkBlock = styled(Link)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
  &:link, &:visited, &:hover, &:active {
    color: black;
    text-decoration: none;
  }
  &:hover {
    color: red;
  }
`;

const NoneDecoLink = (props : any) => {
  return <NoneDecoLinkBlock {...props}></NoneDecoLinkBlock>;
}

export default NoneDecoLink;
