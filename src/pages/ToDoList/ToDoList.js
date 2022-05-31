import styled from "styled-components";
import { useContext } from "react";
import { BsCardChecklist } from "react-icons/bs";
import { useTranslation } from "react-i18next";

import NewTask from "./components/NewTask";
import FilterBar from "./components/FilterBar";
import Tasks from "./components/Tasks";
import TodoContext from "../../context/TodoContext";
import LanguageSelector from "./components/LanguageSelector";

const ToDoList = () => {
  const { t } = useTranslation(["home"]);
  const { transition } = useContext(TodoContext);
  const title = t("title");
  return (
    <>
      <Container>
        <MainContent>
          <LanguageSelector />
          <Heading>
            <HeadingIcon />
            <Title className={title.length > 20 && "fontSmaller"}>
              {title}
            </Title>
          </Heading>
          <NewTask />
          <FilterBar />

          <Transition className={transition && "transition"}>
            <Tasks />
          </Transition>
        </MainContent>
        <Note>* {t("footNote")}</Note>
      </Container>
    </>
  );
};

export default ToDoList;
const Container = styled.div`
  margin: 2rem auto;
  width: 36rem;
  text-align: start;
  align-items: center;
`;
const MainContent = styled.div`
  padding: 2rem;
  border: 2px solid ${(props) => props.theme.colors.Primary};
  border-radius: 3px;
`;
const Heading = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${(props) => props.theme.colors.darkBlue};
`;
const HeadingIcon = styled(BsCardChecklist)`
  font-size: 2.5rem;
`;
const Title = styled.h1`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${(props) => props.theme.colors.darkBlue};
  &.fontSmaller {
    font-size: 1.7rem;
  }
`;

const Transition = styled.div`
  opacity: 1;
  transition: all 0.2s ease-in;
  &.transition {
    opacity: 0;
  }
`;
const Note = styled.span`
  opacity: 0.6;
`;
