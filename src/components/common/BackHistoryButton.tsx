import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackHistoryButtonBlock = styled.button`
  border-radius: 8px;
  width: 100px;
  background-color: white;
`;

const BackHistoryButton = (props: any) => {
  const navigate = useNavigate();
  return <BackHistoryButtonBlock {...props} onClick={() => navigate(-1)} />;
};

export default BackHistoryButton;
