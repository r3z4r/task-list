import classes from "./todo.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faCheck, faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import {Todo} from "../../models/todo.model";
import {FormEvent, FocusEvent, useState} from "react";

export type todoProps = {
    todo: Todo,
    onUpdate: (todo: Todo) => void
    onRemove: (todo: Todo) => void
}

const TodoComponent = ({todo, onRemove, onUpdate}: todoProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [task, setTask] = useState<string>(todo.task)
    const toggleEdit = () => setIsEdit(prevState => !prevState)
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setTask(e.currentTarget.value)
    }
    const onAction = () => {
        if (isEdit) {
            onUpdate({...todo, task})
            setIsEdit(false);
        } else {
            onRemove(todo)
        }
    }

    const onToggleDone = () => {
        onUpdate({...todo, done: !todo.done})
    }

    const onCancel = (e: FocusEvent<HTMLDivElement>) => {
        if (e.currentTarget.contains(e.relatedTarget)) {
            return
        }
        setIsEdit(false);
        setTask(todo.task)
    }
    return (<div className={classes.todoWrapper} onBlur={(e) => onCancel(e)}>
        <FontAwesomeIcon onClick={onToggleDone} tabIndex={0}
                         className={classNames([classes.icon, classes.check, {[classes.green]: todo.done}])}
                         icon={faSquareCheck}/>
        <input className={classNames(classes.input, {[classes.done]: todo.done})} type="text" value={task}
               onChange={(e) => onChange(e)} readOnly={!isEdit}
               onDoubleClick={toggleEdit}/>
        {isEdit ?
            <FontAwesomeIcon onClick={onAction} tabIndex={0} className={classNames([classes.icon, classes.green])}
                             icon={faCheck}/> :
            <FontAwesomeIcon onClick={onAction} tabIndex={0} className={classNames([classes.icon, classes.alert])}
                             icon={faXmark}/>}
    </div>)
}

export default TodoComponent