import styled from "styled-components";

import { useContext } from "react";
import TodoContext from "../../../context/TodoContext";
import { useTranslation } from "react-i18next";

const FilterBar = () => {
  const { t } = useTranslation(["common"]);

  const { setShowFinishedTasks, showFinishedTasks } = useContext(TodoContext);
  console.log(showFinishedTasks);
  const toggleFilter = (e) => {
    e.preventDefault();
    setShowFinishedTasks(e.target.name !== "finished" ? false : true);
  };

  return (
    <>
      <FilterSection>
        <NotFinished
          type="submit"
          name="notFinished"
          value={t("notFinished")}
          onClick={toggleFilter}
          className={showFinishedTasks == false && "selected"}
          autoFocus
        />
        <Finished
          type="submit"
          name="finished"
          value={t("finished")}
          onClick={toggleFilter}
          className={showFinishedTasks == true && "selected"}
        />
      </FilterSection>
    </>
  );
};

export default FilterBar;
const FilterSection = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;
const FilterOption = styled.input`
  width: 50%;
  transition: 0.3s;
  background-color: transparent;
  height: 2rem;
  border: none;
  font-family: ${(props) => props.theme.fontFamily.mono};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  text-transform: capitalize;
  &:focus {
    background-color: ${(props) => props.theme.colors.secondary};
    outline: none;
    color: white;
  }
  &.selected {
    background-color: ${(props) => props.theme.colors.secondary};
    outline: none;
    color: white;
  }
`;
const Finished = styled(FilterOption)`
  border-radius: 0 3px 3px 0;
  border-left: none;
`;
const NotFinished = styled(FilterOption)`
  border-radius: 3px 0 0 3px;
`;
