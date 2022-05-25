import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Todo } from "../../models/todo.model";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Input() isAdmin: boolean;
  @Output() onDeleteTodo = new EventEmitter();
  @Output() onEditTodo = new EventEmitter();
  @Output() onToggleStatus: EventEmitter<Todo> = new EventEmitter();

  checked: boolean = false;
  colorCategory: string = "";
  remainingTime: number;
  completionDate: string;
  aheadOfSchedule: number;

  constructor() {}

  ngOnInit() {
    if (!this.todo.isComplete) {
      this.remainingTime = Math.ceil(
        (Date.parse(this.todo.date) - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (this.todo.isPriority) {
        this.colorCategory = "red";
      }
    }

    if (this.todo.isComplete) {
      this.completionDate = new Date(
        this.todo.completionDate
      ).toLocaleDateString();

      this.aheadOfSchedule = Math.ceil(
        (Date.parse(this.todo.date) - Date.parse(this.todo.completionDate)) /
          (1000 * 60 * 60 * 24)
      );

      this.colorCategory = "green";
      this.checked = true;
    }
  }

  onToggle(todo) {
    this.onToggleStatus.emit(todo);
  }

  onEdit(todo) {
    this.onEditTodo.emit(todo);
  }

  onDelete(todo) {
    this.onDeleteTodo.emit(todo);
  }
}
