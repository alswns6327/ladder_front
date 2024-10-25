import { link } from "fs";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkButtonBlock = styled(Link)`
  border-radius: 8px;
  display: inline-block;
  width: 100px;
  background-color: white;
  text-align: center;
  border: 2px solid black;
`;

type LinkButtonProps = {
  link: string;
  text: string;
};
const LinkButton = ({ link, text }: LinkButtonProps) => {
  return <LinkButtonBlock to={link}>{text}</LinkButtonBlock>;
};

export default LinkButton;
