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

export const ToastModal = styled.div<{$display : boolean, $messageType : string}>`
  z-index: 999;
  width: 150px;
  height: 70px;
  position: fixed;
  text-align: center;
  top: 35%;
  left: 50%;
  background-color: rgba(${props => props.$messageType === "success" ? 0 : 255}, ${props => ["success", "warning"].includes(props.$messageType) ? 255 : 0}, 0, 1);
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

export const AlertModal = styled.div<{$display : boolean, $width : number, $height : number}>`
  z-index: 999;
  width: ${props => props.$width + "px"};
  height: ${props => props.$height + "px"};
  position: fixed;
  top: 35%;
  left: 50%;
  background-color: white;
  display: ${props => props.$display ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  transform: translate(${props => props.$width * -0.5 + "px"}, ${props => props.$height * -0.5 + "px"});
  border-radius: 8px;
  border: 1px solid black;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
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

export const ConfirmModal = styled.div<{$display : boolean, $width : number, $height : number}>`
  z-index: 999;
  position: fixed;
  display: ${props => props.$display ? "block" : "none"};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .background{
    position: absolute;
    display: ${props => props.$display ? "block" : "none"};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
  }

  .conFirmModal{
    width: ${props => props.$width + "px"};
    height: ${props => props.$height + "px"};
    position: absolute;
    top: 35%;
    left: 50%;
    background-color: white;
    display: ${props => props.$display ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    transform: translate(${props => props.$width * -0.5 + "px"}, ${props => props.$height * -0.5 + "px"});
    border-radius: 8px;
    border: 1px solid black;
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
  }
`;