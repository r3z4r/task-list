import classes from "./todo.module.css";
import classNames from "classnames";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {ChangeEvent, KeyboardEvent, useState} from "react";

export interface InitialTodo {
    task: string;
    done: boolean;
}

const AddTodo = ({onAdd}: { onAdd: (todo: InitialTodo) => void }) => {
    const [task, setTask] = useState<string>('')
    
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTodo()
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.currentTarget.value)
    }

    const addTodo = () => {
        onAdd({task, done: false})
        setTask('')
    }

    return <div className={classes.todoWrapper}>
        <input className={classNames([classes.input, classes.cockpit])} type="text" onKeyDown={(e) => onEnter(e)}
               onChange={(e) => onChange(e)}
               value={task}
               placeholder="What needs to be done?"/>
        <FontAwesomeIcon onClick={addTodo} className={classNames([classes.icon, classes.green])} icon={faPlus}/>
    </div>
}

export default AddTodo