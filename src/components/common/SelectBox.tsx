import styled from "styled-components";

export const SelectBoxContainer = styled.div`
  z-index: 100;
  position: relative;
  display: inline-block;
`

export const DropdownBtn = styled.div`
  border: 1px solid black;
  background-color: white;
  display: flex;
  align-items: center;
  width: 130px;
  height: 100%;
  height: 35px;
  border-radius: 4px;
  padding: 0px 10px;
  .text {
    white-space: nowrap; /* 한 줄로 표시 */
    overflow: hidden; /* 초과 내용 숨김 */
    text-overflow: ellipsis; /* 말 줄임표 표시 */
    text-align: left;
    width: 130px;
  }
  .btn {
    padding-left: 10px;
    width: 20px;
  }
`

export const DropdownList = styled.ul`
  position: absolute;
  top: 101%;
  left: 0;
  margin: 0;
  max-height: 150px;
  background-color: white;
  border: 1px solid black;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  display: block;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
`

export const DropdownItem = styled.li`
  cursor: pointer;
  width: 130px;
  padding: 6px 10px;
  text-align: left;
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden; /* 초과 내용 숨김 */
  text-overflow: ellipsis; /* 말 줄임표 표시 */
  &:hover {
    background-color: gray;
  }
  border-top: 0;
`