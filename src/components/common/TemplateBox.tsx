import { ReactNode } from 'react';
import styled from 'styled-components';

const TemplateBoxBlock = styled.div<{$topMargin? : string}>`
  margin-top: ${props => props.$topMargin || '100px'};
  @media (min-width: 769px) {
    margin-left: 138px;
    width: calc(100% - 138px);
  }
  position: relative;
`;

const TemplateBox = ({children, topMargin} : {children : ReactNode, topMargin? : string}) => {
  return <TemplateBoxBlock $topMargin={topMargin}>{children}</TemplateBoxBlock>;
}

export default TemplateBox;
