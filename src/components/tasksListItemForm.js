import React, { useEffect, useState } from "react";
import localStorageService from "../service/localStorage.service";
import {
  CustomTaskForm,
  CustomTaskFormActions,
  CustomTaskFormButton,
  CustomTaskFormInput,
  CustomTaskFormSelect,
  CustomTaskFormTextArea,
} from "../styles/tasksStyles";

const priorityList = ["High", "Medium", "Low"];

function TasksListItemForm({
  listId,
  task,
  openOrCloseTaskFormForAdd,
  openOrCloseTaskFormForEdit,
  action,
  setTasksLists,
  generateRandomString,
}) {
  const [taskFields, setTaskFields] = useState({
    title: "",
    description: "",
    priority: "High",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    setTaskFields((prevTask) => ({
      ...prevTask,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    if (action.toLowerCase() === "add") {
      openOrCloseTaskFormForAdd();
    }
    if (action.toLowerCase() === "edit") {
      openOrCloseTaskFormForEdit();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action.toLowerCase() === "add") {
      setTasksLists((prevTasksLists) => {
        const newTasksLists = [...prevTasksLists];
        const listIndex = prevTasksLists.findIndex(
          (list) => list.id === listId
        );
        newTasksLists[listIndex].tasks.push({
          ...taskFields,
          id: generateRandomString(),
        });
        localStorageService.set("tasks", newTasksLists);
        return newTasksLists;
      });
      openOrCloseTaskFormForAdd();
    }
    if (action.toLowerCase() === "edit") {
      setTasksLists((prevTasksLists) => {
        const newTasksLists = [...prevTasksLists];
        const listIndex = prevTasksLists.findIndex(
          (list) => list.id === listId
        );
        const taskIndex = prevTasksLists[listIndex].tasks.findIndex(
          (t) => t.id === taskFields.id
        );
        newTasksLists[listIndex].tasks[taskIndex] = { ...taskFields };
        localStorageService.set("tasks", newTasksLists);
        return newTasksLists;
      });
      openOrCloseTaskFormForEdit();
    }
  };

  useEffect(() => {
    if (task) {
      setTaskFields({ ...task });
    }
  }, [task]);

  return (
    <CustomTaskForm>
      <CustomTaskFormInput
        type="text"
        name="title"
        placeholder="Add Task"
        value={taskFields.title}
        onChange={handleChange}
      />
      <CustomTaskFormTextArea
        type="text"
        name="description"
        placeholder="Add Description"
        value={taskFields.description}
        onChange={handleChange}
      />
      <CustomTaskFormInput
        type="date"
        name="date"
        placeholder="Add Date"
        value={taskFields.date}
        onChange={handleChange}
      />
      <CustomTaskFormSelect
        name="priority"
        value={taskFields.priority}
        onChange={handleChange}
      >
        <option disabled>Select Priority</option>
        {priorityList.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </CustomTaskFormSelect>
      <CustomTaskFormActions>
        <CustomTaskFormButton type="submit" onClick={handleSubmit}>
          Save
        </CustomTaskFormButton>
        <CustomTaskFormButton
          type="submit"
          cancel={true}
          onClick={handleCloseForm}
        >
          Cancel
        </CustomTaskFormButton>
      </CustomTaskFormActions>
    </CustomTaskForm>
  );
}

export default TasksListItemForm;
