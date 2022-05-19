import {createContext, FC, ReactNode, useReducer} from "react";
import {TodoContext, TodosState} from "../models/todoContext.model";
import {reducer, TodoActionEnum} from "./reducer";
import React from "react";
import {Todo} from "../models/todo.model";

export const GlobalContext = createContext<TodoContext | null>(null);

const TodoProvider: ({
                         children,
                         initialState
                     }: { children: React.ReactNode; initialState: TodosState }) => JSX.Element = ({
                                                                                                       children,
                                                                                                       initialState
                                                                                                   }: { children: ReactNode, initialState: TodosState }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const addTodo = (todo: Todo) => {
        dispatch({type: TodoActionEnum.ADD, payload: todo});
    }
    const updateTodo = (todo: Todo) => {
        dispatch({type: TodoActionEnum.UPDATE, payload: todo});
    }
    const removeTodo = (todo: Todo) => {
        dispatch({type: TodoActionEnum.REMOVE, payload: todo});
    }
    const setData = (todos: Todo[]) => {
        dispatch({type: TodoActionEnum.SET, payload: todos});
    }

    return <GlobalContext.Provider
        value={{state: state, addTodo: addTodo, updateTodo: updateTodo, removeTodo: removeTodo, setData: setData}}>
        {children}
    </GlobalContext.Provider>

}

export default TodoProvider