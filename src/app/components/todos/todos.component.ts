import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Todo } from "../../models/todo.model";
import { AppState } from "../../store/app.state";
import { TodoActionTypes } from "../../store/actions/todo.actions";

import { MatDialog } from "@angular/material/";
import { ModalComponent } from "../modal/modal.component";
import { sortTodos } from "../../shared/helpers/sort-todos";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"],
})
export class TodosComponent implements OnInit {
  @Input() isAdmin: boolean;

  todos: Observable<Todo[]> = this.store.select((state) =>
    sortTodos(state.todos)
  );

  modalHeading: string;
  buttonAction: string;
  contentLoading: boolean = false;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit() {
    this.store.dispatch({ type: TodoActionTypes.GET_TODOS });
  }

  openDialog(todo?: Todo): void {
    // If no todo passed then we are creating a new todo
    if (!todo) {
      const dialogRef = this.dialog.open(ModalComponent, {
        height: "400px",
        width: "600px",
        data: {
          modalHeading: "Add New Task",
          buttonAction: "Add Task",
          isEditing: false,
          title: "",
          date: "",
          isPriority: false,
          isComplete: false,
        },
      });

      dialogRef.afterClosed().subscribe((newTodo) => {
        let todo: Todo = {
          title: newTodo.title,
          date: new Date(newTodo.date).toISOString(),
          isPriority: newTodo.isPriority,
          isComplete: newTodo.isComplete,
        };

        this.store.dispatch({
          type: TodoActionTypes.ADD_TODO,
          todo: todo,
        });
      });
    } else if (todo) {
      // A todo has been passed so we need to update it
      const dialogRef = this.dialog.open(ModalComponent, {
        height: "400px",
        width: "600px",
        data: {
          modalHeading: `Update ${todo.title}`,
          buttonAction: "Update Task",
          isEditing: true,
          title: todo.title,
          date: todo.date,
          isPriority: todo.isPriority,
          isComplete: todo.isComplete,
          id: todo.id,
        },
      });

      dialogRef.afterClosed().subscribe((updatedTodo) => {
        let todo: Todo = {
          id: updatedTodo.id,
          title: updatedTodo.title,
          date: new Date(updatedTodo.date).toISOString(),
          isPriority: updatedTodo.isPriority,
          isComplete: updatedTodo.isComplete,
        };

        this.store.dispatch({
          type: TodoActionTypes.EDIT_TODO,
          todo: todo,
        });
      });
    }
  }

  toggleStatus(todo: Todo) {
    this.store.dispatch({
      type: TodoActionTypes.UPDATE_TODO_STATUS,
      todo: todo,
    });
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch({
      type: TodoActionTypes.REMOVE_TODO,
      id: todo.id,
    });
  }
}
