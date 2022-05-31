import React, { useContext, useEffect } from "react";
import TodoContext from "../../../context/TodoContext";
import Task from "./Task";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Tasks = () => {
  const { displayList, transition, setTransition, showFinishedTasks } =
    useContext(TodoContext);

  const { t } = useTranslation(["common"]);

  useEffect(() => {
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
    }, 500);
    //eslint-disable-next-line
  }, [showFinishedTasks]);

  return (
    <>
      {displayList.length === 0 ? (
        <MainList className={transition && "transition"}>
          {!transition && (
            <Message>
              {showFinishedTasks
                ? t("noFinishedTasks")
                : t("noTasksToFinished")}
            </Message>
          )}
        </MainList>
      ) : (
        <MainList className={transition && "transition"}>
          {!transition &&
            displayList.map((task) => <Task key={task.id} task={task} />)}
        </MainList>
      )}
    </>
  );
};

export default Tasks;

const MainList = styled.div`
  padding-top: 1rem;
  opacity: 1;
  font-size: large;
  text-align: center;

  &.transition {
    opacity: 0;
    transition: all 0.2s ease-in;
  }
`;
const Message = styled.span`
  color: ${(props) => props.theme.colors.secondary};
  opacity: 0.6;
`;
