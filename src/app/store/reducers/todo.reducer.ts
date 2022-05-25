import { Todo } from "../../models/todo.model";
import { TodoActionTypes, All } from "../actions/todo.actions";

export function todoReducer(state: Todo[] = [], action: All) {
  switch (action.type) {
    case TodoActionTypes.GET_TODOS_SUCCESS:
      return [...action.payload];

    case TodoActionTypes.ADD_TODO_SUCCESS:
      return [...state, action.payload];

    case TodoActionTypes.UPDATE_TODO_STATUS_SUCCESS:
      return [...state];

    case TodoActionTypes.EDIT_TODO_SUCCESS: {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state.splice(index, 1, action.payload);
      return [...state];
    }

    case TodoActionTypes.REMOVE_TODO: {
      const index = state.findIndex((todo) => todo.id === action.id);
      state.splice(index, 1);
      return [...state];
    }

    default:
      return state;
  }
}
