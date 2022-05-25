import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, EMPTY } from "rxjs";
import { map, mergeMap, switchMap, catchError } from "rxjs/operators";

import { TodoService } from "../../services/todo.service";

import {
  TodoActionTypes,
  GetTodosSuccess,
  AddTodoSuccess,
  UpdateTodoStatusSuccess,
  EditTodoSuccess,
  RemoveTodoSuccess,
} from "../actions/todo.actions";

import { Todo } from "../../models/todo.model";

@Injectable()
export class TodoEffects {
  constructor(private actions: Actions, private todoService: TodoService) {}

  @Effect()
  GetTodos: Observable<Action> = this.actions.pipe(
    ofType(TodoActionTypes.GET_TODOS),
    mergeMap(() =>
      this.todoService.getTodos().pipe(
        map((todos: Todo[]) => {
          return new GetTodosSuccess(todos);
        }),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  AddTodo: Observable<Action> = this.actions.pipe(
    ofType(TodoActionTypes.ADD_TODO),
    switchMap((payload) =>
      this.todoService.addTodo(payload).pipe(
        map((todo: Todo) => {
          return new AddTodoSuccess(todo);
        }),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  UpdateTodoStatus: Observable<Action> = this.actions.pipe(
    ofType(TodoActionTypes.UPDATE_TODO_STATUS),
    switchMap((payload) =>
      this.todoService.updateTodoStatus(payload).pipe(
        map((todo: Todo) => new UpdateTodoStatusSuccess(todo)),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  EditTodo: Observable<Action> = this.actions.pipe(
    ofType(TodoActionTypes.EDIT_TODO),
    switchMap((payload) => {
      return this.todoService.editTodo(payload).pipe(
        map((todo: Todo) => {
          return new EditTodoSuccess(todo);
        }),
        catchError(() => EMPTY)
      );
    })
  );

  @Effect()
  RemoveTodo: Observable<Action> = this.actions.pipe(
    ofType(TodoActionTypes.REMOVE_TODO),
    switchMap((payload) =>
      this.todoService.deleteTodo(payload).pipe(
        map((todo: Todo) => new RemoveTodoSuccess(todo)),
        catchError(() => EMPTY)
      )
    )
  );
}
