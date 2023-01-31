import React, { useEffect, useState } from "react";
import localStorageService from "../service/localStorage.service";
import {
  CustomTasksListForm,
  CustomTasksListFormButton,
  CustomTasksListFormInput,
} from "../styles/tasksStyles";

function TasksListForm({
  setIsTasksListFormOpen,
  setTasksLists,
  tasksListEdit,
  setTasksListEdit,
  generateRandomString,
}) {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tasksListEdit.action.toLowerCase() === "add") {
      setTasksLists((prev) => {
        const newTasksList = {
          id: generateRandomString(),
          title,
          tasks: [],
        };
        if (!prev) {
          localStorageService.set("tasks", [newTasksList]);
          return [newTasksList];
        } else {
          const newTasksLists = [...prev, newTasksList];
          localStorageService.set("tasks", newTasksLists);
          return newTasksLists;
        }
      });
    } else {
      setTasksLists((prev) => {
        const newTasksLists = prev?.map((tasksList) => {
          if (tasksList.id === tasksListEdit.id) {
            return {
              ...tasksList,
              title,
            };
          }
          return tasksList;
        });
        localStorageService.set("tasks", newTasksLists);
        return newTasksLists;
      });
    }
    setIsTasksListFormOpen(false);
    setTasksListEdit((prev) => ({ ...prev, action: "add", title: "" }));
  };

  useEffect(() => {
    setTitle(tasksListEdit.title);
  }, [tasksListEdit]);

  return (
    <CustomTasksListForm>
      <CustomTasksListFormInput
        type="text"
        className="form-control"
        id="taskList"
        placeholder="Enter task list"
        value={title}
        onChange={handleChange}
      />
      <CustomTasksListFormButton type="submit" onClick={handleSubmit}>
        Submit
      </CustomTasksListFormButton>
    </CustomTasksListForm>
  );
}

export default TasksListForm;
