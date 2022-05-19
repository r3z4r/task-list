import {TodoAction, TodosState} from "../models/todoContext.model";

export enum TodoActionEnum{
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    UPDATE = 'UPDATE',
    SET = 'SET',
}

export const reducer = (state: TodosState, action: TodoAction) : TodosState => {
            const newTodos = [...state.todos]
    switch (action.type) {
        case TodoActionEnum.ADD:
            newTodos.push(action.payload)
            return {
                ...state,
                todos : newTodos
            };
        case TodoActionEnum.REMOVE:
            return {
                ...state,
                todos : state.todos.filter(todo=>action.payload.id !== todo.id)
            };
        case TodoActionEnum.UPDATE:
            return {
                ...state,
                todos : state.todos.map(todo=>action.payload.id === todo.id?action.payload:todo)
            };
        case TodoActionEnum.SET:
            return {
                ...state,
                todos : action.payload
            };
        default:
            throw new Error();
    }
};