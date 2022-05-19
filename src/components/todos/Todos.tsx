import classes from "./todos.module.css";
import Todo from "./Todo";
import AddTodo, {InitialTodo} from "./AddTodo";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../store/store";
import {TodoContext} from "../../models/todoContext.model";
import {serverDetails} from "../../config";
import Spinner from "../common/Spinner";
import {Todo as TodoModel} from '../../models/todo.model'
import Footer from "./Footer";


const Todos = () => {
    const todoContext: TodoContext | null = useContext(GlobalContext)
    const [loader, setLoader] = useState<boolean>(false)
    const [active, setActive] = useState<boolean>(false)
    useEffect(() => {
        setLoader(true)
        const getTodos = async () => {
            try {
                const res = await fetch(`${serverDetails.baseUrl}/todos`);
                const response = await res.json();
                todoContext?.setData(response)
            } catch (e) {
                console.error(e);
            } finally {
                setLoader(false)
            }
        }
        getTodos()
    }, [])

    const onAdd = async (todo: InitialTodo) => {
        setLoader(true)
        let response
        try {
            const res = await fetch(`${serverDetails.baseUrl}/todos`, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {"Content-Type": "application/json"}
            });
            response = await res.json();
        } catch (e) {
            console.error(e);
        } finally {
            setLoader(false)
        }
        todoContext?.addTodo(response)
    }

    const onUpdate = async (todo: TodoModel) => {
        setLoader(true)
        try {
            const res = await fetch(`${serverDetails.baseUrl}/todos/${todo.id}`, {
                method: 'PUT',
                body: JSON.stringify(todo),
                headers: {"Content-Type": "application/json"}
            });
            await res.json();
        } catch (e) {
            console.error(e);
        } finally {
            setLoader(false)
        }
        todoContext?.updateTodo(todo)
    }

    const onRemove = async (todo: TodoModel) => {
        setLoader(true)
        try {
            const res = await fetch(`${serverDetails.baseUrl}/todos/${todo.id}`, {
                method: 'DELETE', headers: {"Content-Type": "application/json"}
            });
            await res.json();
        } catch (e) {
            console.error(e);
        } finally {
            todoContext?.removeTodo(todo)
            setLoader(false)
        }
    }

    const removeDone = async () => {
        setLoader(true)
        const doneTodos = todoContext?.state.todos.filter(todo => todo.done)
        try {
            let deleteResponses = await Promise.all(doneTodos ? doneTodos.map(todo => fetch(`${serverDetails.baseUrl}/todos/${todo.id}`, {
                method: 'DELETE', headers: {"Content-Type": "application/json"}
            })) : [])
            await Promise.all(deleteResponses)
        } catch (err) {
            console.log(err)
        } finally {
            doneTodos?.forEach(todo => todoContext?.removeTodo(todo))
            setLoader(false)
        }
    }
    const filteredTodos = todoContext?.state.todos.filter(todo => active ? !todo.done : true)
    return <div className={classes.container}>
        <h1 className={classes.title}>Todo</h1>
        <div className={classes.cardWrapper}>
            <div className={classes.bar}/>
            <div className={classes.card}>
                <AddTodo onAdd={onAdd}/>
                {filteredTodos?.map(todo => <Todo key={todo.id} todo={todo} onRemove={onRemove}
                                                 onUpdate={onUpdate}/>)
                }
            </div>
            {loader && <Spinner/>}
            <Footer todoContext={todoContext} showActive={active} setShowActive={setActive} removeDone={removeDone}/>
        </div>
    </div>
}

export default Todos