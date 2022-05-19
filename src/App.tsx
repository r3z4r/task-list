import './App.css'
import Todos from "./components/todos";
import TodoProvider from "./store/store";
import {useEffect, useState} from "react";
import {serverDetails} from "./config";
import {Todo} from "./models/todo.model";

function App() {
    const [todos,setTodos] = useState<Todo[]>([])


    return (
        <TodoProvider initialState={{todos:[]}}>
            <Todos/>
        </TodoProvider>
    )
}

export default App
