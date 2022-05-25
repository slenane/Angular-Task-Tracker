import { Todo } from "../models/todo.model";
import { Auth } from "../models/auth.model";

export interface AppState {
  readonly todos: Todo[];
  readonly auth: Auth;
}
