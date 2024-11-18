import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

export const ToastModal = styled.div<{$display : boolean, $type : string}>`
  width: 100px;
  height: 34px;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  background-color: rgba(${props => props.$type === "success" ? 0 : 255}, ${props => props.$type === "success" ? 255 : 0}, 0, 1);
  display: ${props => props.$display ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  transform: translate(-50px, -17px);
  border-radius: 5px;
  animation: ${fadeOut} 3s ease both;
  button {
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    &::after {
      content : "\\00d7";
      font-size: 15px;
    }
  }
`;

export const AlertModal = styled.div<{$display : boolean, $width : string, $height : string}>`
  width: ${props => props.$width.concat("px")};
  height: ${props => props.$height.concat("px")};
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: green;
  display: ${props => props.$display ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  transform: translate(${props => (Number(props.$width) * -0.5) + "px"}, ${props => (Number(props.$height) * -0.5) + "px"});
  border-radius: 8px;
  button {
    position: absolute;
    bottom: 5px;
    right: 5px;
    border-radius: 8px;
    width: 40px;
    font-size: 12px;
    background-color: white;
    border: 1px solid black;
    text-align: center;
    color: black;
  }
`;

export const ConfirmModal = styled.div<{$display : boolean, $width : string, $height : string}>`
  width: ${props => props.$width.concat("px")};
  height: ${props => props.$height.concat("px")};
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: green;
  display: ${props => props.$display ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  transform: translate(${props => (Number(props.$width) * -0.5) + "px"}, ${props => (Number(props.$height) * -0.5) + "px"});
  border-radius: 8px;
  div {
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
  button {
    border-radius: 8px;
    width: 40px;
    font-size: 12px;
    background-color: white;
    border: 1px solid black;
    text-align: center;
    color: black;
  }
`;