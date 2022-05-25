import { Action } from "@ngrx/store";
import { Todo } from "../../models/todo.model";

export enum TodoActionTypes {
  GET_TODOS = "[Todo] Get Todos",
  GET_TODOS_SUCCESS = "[Todo] Todos Loaded Successfully",

  GET_TODO_CATEGORY = "[Todo] Get Todo Category",
  GET_TODO_CATEGORY_SUCCESS = "[Todo] Todo Category Loaded Successfully",

  UPDATE_TODO_STATUS = "[Todo] Update Todo Status",
  UPDATE_TODO_STATUS_SUCCESS = "[Todo] Todos Status Updated Successfully",

  ADD_TODO = "[Todo] Add Todo",
  ADD_TODO_SUCCESS = "[Todo] Todo Added SuccessFully",

  EDIT_TODO = "[Todo] Edit Todo",
  EDIT_TODO_SUCCESS = "[Todo] Todo Edited SuccessFully",

  REMOVE_TODO = "[Todo] Remove Todo",
  REMOVE_TODO_SUCCESS = "[Todo] Todo Removed SuccessFully",
}

export class GetTodos implements Action {
  readonly type = TodoActionTypes.GET_TODOS;
  constructor() {}
}

export class GetTodosSuccess implements Action {
  readonly type = TodoActionTypes.GET_TODOS_SUCCESS;
  constructor(public payload: Todo[]) {}
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.ADD_TODO;
  constructor(public payload: Todo) {}
}

export class AddTodoSuccess implements Action {
  readonly type = TodoActionTypes.ADD_TODO_SUCCESS;
  constructor(public payload: Todo) {}
}

export class UpdateTodoStatus implements Action {
  readonly type = TodoActionTypes.UPDATE_TODO_STATUS;
  constructor(public payload: Todo) {}
}

export class UpdateTodoStatusSuccess implements Action {
  readonly type = TodoActionTypes.UPDATE_TODO_STATUS_SUCCESS;
  constructor(public payload: Todo) {}
}

export class EditTodo implements Action {
  readonly type = TodoActionTypes.EDIT_TODO;
  constructor(public payload: Todo) {}
}

export class EditTodoSuccess implements Action {
  readonly type = TodoActionTypes.EDIT_TODO_SUCCESS;
  constructor(public payload: Todo) {}
}

export class RemoveTodo implements Action {
  readonly type = TodoActionTypes.REMOVE_TODO;
  constructor(public id: number) {}
}

export class RemoveTodoSuccess implements Action {
  readonly type = TodoActionTypes.REMOVE_TODO_SUCCESS;
  constructor(public payload: Todo) {}
}

export type All =
  | GetTodos
  | GetTodosSuccess
  | AddTodo
  | AddTodoSuccess
  | UpdateTodoStatus
  | UpdateTodoStatusSuccess
  | EditTodo
  | EditTodoSuccess
  | RemoveTodo
  | RemoveTodoSuccess;
