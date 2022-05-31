import { useContext, useState } from "react";
import styled from "styled-components";
import {
  IoIosCloseCircleOutline,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";

import TimeFilter from "./TimeFilter";
import AlertWindow from "../../../components/shared/AlertWindow";
import AlertBtn from "../../../components/shared/AlertBtn";
import TodoContext from "../../../context/TodoContext";

import moment from "moment";
const Task = ({ task }) => {
  const {
    onDelete,
    onFinish,
    transition,
    alertOn,
    setAlertOn,
    toggleReminder,
  } = useContext(TodoContext);
  const { id, title, finished, reminder, dateTime, finished_At } = task;
  const [btnAction, setBtnAction] = useState(null);
  const dateTimeToDisplay = moment(dateTime).format("DD MMM hh:mm A");
  const handleDoubleClick = () => {
    toggleReminder(id);
  };
  const handleDelete = (e) => {
    setAlertOn(true);
    setBtnAction(e.target.value);
    onDelete(id);
  };
  return (
    <>
      {/* {btnAction === "完成" && alertOn && <FinishAlert />}
      {btnAction === "移除" && alertOn && <DeleteAlert />} */}
      <TaskElement
        className={`${transition && "transition"} ${reminder && "reminder"}`}
        onDoubleClick={handleDoubleClick}
      >
        <TaskInfo>
          <TaskTitle className={finished && "finished"}>{title}</TaskTitle>
          <TaskTime>{dateTime !== "" && dateTimeToDisplay}</TaskTime>
        </TaskInfo>
        {finished === false ? (
          <>
            <ActionBtns>
              <RemoveBtn value="移除" onClick={handleDelete} />
              <FinishBtn
                className="action-bar_btn"
                value="完成"
                onClick={(e) => {
                  onFinish(id);
                  setAlertOn(true);
                  setBtnAction(e.target.value);
                }}
              />
            </ActionBtns>
          </>
        ) : (
          <>
            <TaskTime className="finished">
              <TimeFilter finishedTime={finished_At} />
            </TaskTime>
          </>
        )}
      </TaskElement>
    </>
  );
};

export default Task;

const ActionBtns = styled.div`
  display: flex;
  gap: 1rem;
`;
const RemoveBtn = styled(IoIosCloseCircleOutline)`
  font-size: 2rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    fill: ${(props) => props.theme.colors.red};
    font-size: 2.3rem;
  }
`;
const FinishBtn = styled(IoIosCheckmarkCircleOutline)`
  font-size: 2rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    fill: ${(props) => props.theme.colors.green};
    font-size: 2.3rem;
  }
`;
const TaskElement = styled.div`
  padding: 0.5rem 1.5rem;
  margin: 7px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: whitesmoke;
  transition: all 0.2s ease-in-out;
  border-radius: 3px;
  &.transition {
    opacity: 0;
  }
  &.reminder {
    border-left: 3px solid ${(props) => props.theme.colors.red};
  }
`;
const TaskInfo = styled.div``;
const TaskTitle = styled.h3`
  margin: 10px 0;
  font-weight: 500;
  color: black;
  text-align: start;
  &.finished {
    opacity: 0.5;
  }
`;
const TaskTime = styled(TaskTitle)`
  font-size: 1rem;
  font-weight: 150;
`;
