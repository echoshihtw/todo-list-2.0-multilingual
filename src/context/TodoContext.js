import { createContext, useState, useEffect } from "react";
const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [listFromLocalStorage, setListFromLocalStorage] = useState(
    JSON.parse(localStorage.getItem("todo-list") || "[]")
  );
  const [showFinishedTasks, setShowFinishedTasks] = useState(false);
  const [displayList, setDisplayList] = useState([]);
  const [transition, setTransition] = useState(true);
  const [alertOn, setAlertOn] = useState(false);
  useEffect(() => {
    checkFinishedTask();
  }, [listFromLocalStorage, showFinishedTasks]);
  function checkFinishedTask() {
    showFinishedTasks == false
      ? setDisplayList(
          [...listFromLocalStorage]
            .filter((v) => v.finished == false)
            .sort((a, b) => b.dateTime - a.dateTime)
        )
      : setDisplayList(
          [...listFromLocalStorage].filter((v) => v.finished == true)
        );
  }
  function addTask(e) {
    let updatedList = [e, ...listFromLocalStorage];
    localStorage.setItem("todo-list", JSON.stringify(updatedList));
    setListFromLocalStorage(updatedList);
  }
  function onDelete(e) {
    let updatedList = [...listFromLocalStorage].filter((v) => v.id !== e);
    setListFromLocalStorage(updatedList);
    localStorage.setItem("todo-list", JSON.stringify(updatedList));
  }
  function onFinish(e) {
    let updatedList = [...listFromLocalStorage].map((task) => {
      if (task.id === e) {
        return {
          ...task,
          finished: true,
          finished_At: Date.now(),
          //*replacing finished_At with the comment below to see task finished more than a day ago ：2022-3-15
          // finished_At: 1647331574,
        };
      }
      return task;
    });
    setListFromLocalStorage(updatedList);
    localStorage.setItem("todo-list", JSON.stringify(updatedList));
  }
  function toggleReminder(e) {
    let updatedList = [...listFromLocalStorage].map((task) => {
      if (task.id === e) {
        return {
          ...task,
          reminder: !task.reminder,
        };
      }
      return task;
    });
    setListFromLocalStorage(updatedList);
    localStorage.setItem("todo-list", JSON.stringify(updatedList));
  }
  return (
    <TodoContext.Provider
      value={{
        listFromLocalStorage,
        setListFromLocalStorage,
        displayList,
        transition,
        setTransition,
        showFinishedTasks,
        setShowFinishedTasks,
        alertOn,
        setAlertOn,
        addTask,
        onDelete,
        onFinish,
        toggleReminder,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export default TodoContext;
