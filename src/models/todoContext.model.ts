import {Todo} from "./todo.model";

export interface TodosState {
    todos: Todo[];
}

export type TodoAction =
    | { type: 'ADD'; payload: Todo }
    | { type: 'REMOVE'; payload: Todo }
    | { type: 'UPDATE'; payload: Todo }
    | { type: 'SET'; payload: Todo[] };

export interface TodoContext {
    state: TodosState;
    addTodo: (todo:Todo)=>void;
    updateTodo: (todo:Todo)=>void;
    removeTodo: (todo:Todo)=>void;
    setData: (todos:Todo[])=>void;
}
