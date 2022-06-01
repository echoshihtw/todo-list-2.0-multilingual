import styled from "styled-components";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TailSpin } from "react-loader-spinner";
import { useContext } from "react";

import TodoContext from "../../../context/TodoContext";
import { useTranslation } from "react-i18next";
const moment = require("moment");
moment.locale("zh-tw");

const NewTask = () => {
  const { t } = useTranslation(["task"]);
  const { addTask } = useContext(TodoContext);
  const dateTimeTodayFormattedForInput = moment().format("yyyy-MM-DDThh:mm");
  const [newTask, setNewTask] = useState({
    title: "",
    dateTime: "",
    reminder: false,
  });
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (newTask.title === "") {
      setErrMsg("! " + t("errorMessage"));
      return;
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        addTask({
          id: uuidv4(),
          title: newTask.title,
          dateTime: newTask?.dateTime,
          finished: false,
          reminder: newTask?.reminder,
        });
        setNewTask({
          title: "",
          dateTime: "",
        });
      }, 1500);
    }
  };

  return (
    <>
      <Container onSubmit={onSubmit}>
        <InputGroup>
          <TaskInput
            value={newTask.title}
            className={`${errMsg && "err"} ${loading && "disabled-input"}`}
            type="text"
            onChange={(e) => {
              setNewTask({ ...newTask, title: e.target.value });
              setErrMsg("");
            }}
            placeholder={t("taskInputPlaceholder") + "..."}
            disabled={loading && "disabled"}
          />
          <TaskInput
            type="datetime-local"
            className={`
           
            ${loading && "disabled-input"}`}
            value={newTask.dateTime}
            min={dateTimeTodayFormattedForInput}
            disabled={loading && "disabled"}
            onChange={(e) =>
              setNewTask({ ...newTask, dateTime: e.target.value })
            }
          />
          <ReminderCheckBoxGroup>
            <ReminderTitle htmlFor="reminder">{t("reminder")}:</ReminderTitle>
            <ReminderCheckBox
              type="checkbox"
              className={`${loading && "disabled-input"}`}
              value="reminder"
              id="reminder"
              disabled={loading && "disabled"}
              onChange={(e) =>
                setNewTask({ ...newTask, reminder: !newTask.reminder })
              }
              checked={newTask.reminder}
            />
          </ReminderCheckBoxGroup>

          <ErrorMessage>{errMsg}</ErrorMessage>
          {loading ? (
            <SubmitButton disabled={loading && true}>
              <TailSpin
                ariaLabel="loading-indicator"
                color="white"
                height="25"
              />
            </SubmitButton>
          ) : (
            <SubmitButton type="submit" disabled={errMsg && true}>
              {t("submit")}
            </SubmitButton>
          )}
        </InputGroup>
      </Container>
    </>
  );
};

export default NewTask;
const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;
const InputGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 14px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TaskInput = styled.input`
  box-sizing: border-box;
  padding: 0.8rem;
  height: fit-content;
  width: 100%;
  border: 1px solid gray;
  border-radius: 3px;
  &::placeholder {
    font-family: ${(props) => props.theme.fontFamily.mono};
  }
  &:focus {
    outline: none;
  }
  &.err {
    border: 1.5px solid ${(props) => props.theme.colors.red};
  }
`;
const ReminderCheckBoxGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  gap: 3rem;
  align-items: center;
`;
const ReminderCheckBox = styled(TaskInput)`
  width: fit-content;
`;
const ReminderTitle = styled.h3`
  margin: 0;
  text-transform: capitalize;
`;
const SubmitButton = styled.button`
  width: 100%;
  border-radius: 3px;
  height: 3rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: whitesmoke;
  border: none;
  font-family: ${(props) => props.theme.fontFamily.mono};
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ErrorMessage = styled.span`
  width: 100%;
  margin-left: 1rem;
  text-align: start;
  color: ${(props) => props.theme.colors.red};
  padding-left: 3px;
  font-size: small;
`;
