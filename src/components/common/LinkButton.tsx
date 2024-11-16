import { link } from "fs";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkButtonBlock = styled(Link)`
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  background-color: white;
  text-align: center;
  border: 2px solid black;
  padding: 1px 6px;
  color: black;
  &:link, &:visited, &:hover, &:active {
    color: black;
    text-decoration: none;
  }
`;

type LinkButtonProps = {
  link: string;
  text: string;
};
const LinkButton = ({ link, text }: LinkButtonProps) => {
  return <LinkButtonBlock to={link}>{text}</LinkButtonBlock>;
};

export default LinkButton;
