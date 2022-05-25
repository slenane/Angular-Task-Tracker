import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { TodoData } from "../../models/todo-data.model";
import { Todo } from "../../models/todo.model";
import { AppState } from "../../store/app.state";
import { generateData } from "../../shared/helpers/generate-data";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  todos: Observable<Todo[]> = this.store.select("todos");
  todoData: TodoData;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.todos.subscribe((todos) => {
      this.todoData = generateData(todos);
    });
  }
}
