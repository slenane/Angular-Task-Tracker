import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Todo } from "../models/todo.model";
import { Ngrx_Payload } from "../models/ngrx_payload.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

const taskIsComplete = (todo: Todo): Todo => {
  if (todo.isComplete) {
    todo.completionDate = new Date().toISOString();
  } else {
    todo.completionDate = undefined;
  }

  return todo;
};

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private apiUrl = "http://localhost:5000/todos";

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  updateTodoStatus(payload: Ngrx_Payload): Observable<Todo> {
    const url = `${this.apiUrl}/${payload.todo.id}`;
    payload.todo.isComplete = !payload.todo.isComplete;
    payload.todo = taskIsComplete(payload.todo);
    return this.http.put<Todo>(url, payload.todo, httpOptions);
  }

  addTodo(payload: Ngrx_Payload): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, payload.todo, httpOptions);
  }

  editTodo(payload: Ngrx_Payload): Observable<Todo> {
    const url = `${this.apiUrl}/${payload.todo.id}`;
    payload.todo = taskIsComplete(payload.todo);
    return this.http.put<Todo>(url, payload.todo, httpOptions);
  }

  deleteTodo(payload): Observable<Todo> {
    const url = `${this.apiUrl}/${payload.id}`;
    return this.http.delete<Todo>(url);
  }
}
