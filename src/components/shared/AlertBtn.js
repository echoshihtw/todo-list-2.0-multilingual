import styled from "styled-components";

const AlertBtn = ({ version, title, onClick }) => {
  const TypeOfButton = version === "confirm" ? Confirm : Cancel;
  return <TypeOfButton onClick={onClick}>{title}</TypeOfButton>;
};

export default AlertBtn;

const ButtonElement = styled.div`
  padding: 10px;
  border-radius: 5px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
`;

const Confirm = styled(ButtonElement)`
  border: 1px solid ${(props) => props.theme.green};
  color: ${(props) => props.theme.green};
  &:hover {
    background-color: ${(props) => props.theme.green};
    color: whitesmoke;
  }
`;
const Cancel = styled(ButtonElement)`
  border: 1px solid ${(props) => props.theme.red};
  color: ${(props) => props.theme.red};
  &:hover {
    background-color: ${(props) => props.theme.red};
    color: whitesmoke;
  }
`;
