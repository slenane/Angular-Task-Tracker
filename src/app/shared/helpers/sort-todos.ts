import { Todo } from "../../models/todo.model";

export const sortTodos = (todos: Todo[]): Todo[] => {
  let incompleteTasks = todos.filter((t) => !t.isComplete);
  let completeTasks = todos.filter((t) => t.isComplete);

  incompleteTasks = incompleteTasks.sort(
    (a, b) => <any>new Date(a.date) - <any>new Date(b.date)
  );

  const priorityTodos = incompleteTasks.filter((t) => t.isPriority);
  const nonPriorityTodos = incompleteTasks.filter((t) => !t.isPriority);

  completeTasks = completeTasks.sort(
    (a, b) => <any>new Date(b.completionDate) - <any>new Date(a.completionDate)
  );

  return [...priorityTodos, ...nonPriorityTodos, ...completeTasks];
};
