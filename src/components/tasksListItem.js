import React, { useState } from "react";
import TasksListItemForm from "./tasksListItemForm";
import {
  ListItem,
  P,
  PriorityBar,
  TaskActions,
  TaskDeleteButton,
  TaskEditButton,
  TaskHeader,
} from "../styles/tasksStyles";
import localStorageService from "../service/localStorage.service";

function TasksListItem({ task, listId, setTasksLists }) {
  const { id, title, description, priority, date } = task;
  const [isEdit, setIsEdit] = useState(false);

  const openOrCloseTaskFormForEdit = () => {
    setIsEdit(!isEdit);
  };

  const deleteTask = () => {
    setTasksLists((prevTasksLists) => {
      const newTasksLists = prevTasksLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== id),
          };
        }
        return list;
      });
      localStorageService.set("tasks", newTasksLists);
      return newTasksLists;
    });
  };

  return (
    <>
      <ListItem key={title}>
        <TaskHeader>
          <PriorityBar priority={priority} />
          <TaskActions>
            <TaskEditButton onClick={openOrCloseTaskFormForEdit}>
              Edit
            </TaskEditButton>
            <TaskDeleteButton onClick={deleteTask}>Delete</TaskDeleteButton>
          </TaskActions>
        </TaskHeader>
        <h3>{title}</h3>
        <P>{description}</P>
        <div>
          <P>{priority}</P>
          <P>{date}</P>
        </div>
      </ListItem>
      {isEdit && (
        <TasksListItemForm
          listId={listId}
          task={task}
          openOrCloseTaskFormForEdit={openOrCloseTaskFormForEdit}
          action="edit"
          setTasksLists={setTasksLists}
        />
      )}
    </>
  );
}

export default TasksListItem;
