import styled from "styled-components";

const AlertWindow = ({ children, title, message }) => {
  return (
    <Container>
      <Alert>
        <Title>{title}</Title>
        <AlertMessage>{message}</AlertMessage>
        <ActionButtons>{children}</ActionButtons>
      </Alert>
    </Container>
  );
};

export default AlertWindow;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(46, 126, 57, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Alert = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: whitesmoke;
  height: 15rem;
  min-width: fit-content;
  padding: 1rem 3rem;
  height: fit-content;
  border-radius: 5px;
`;
const Title = styled.h3`
  margin: 0.5rem;
  text-align: center;
  font-size: 1.6rem;
  color: teal;
  font-weight: 600;
`;
const AlertMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  padding-bottom: 0.3rem;
`;
const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
