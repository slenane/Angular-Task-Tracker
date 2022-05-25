import { TodoData } from "../../models/todo-data.model";

export const generateData = (todos): TodoData => {
  let total = todos.length || 0;
  let priority = 0,
    standard = 0,
    completed = 0;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].isPriority && !todos[i].isComplete) priority++;
    if (!todos[i].isPriority && !todos[i].isComplete) standard++;
    if (todos[i].isComplete) completed++;
  }

  return {
    total,
    priority,
    standard,
    completed,
  };
};
