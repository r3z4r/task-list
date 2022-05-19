import classes from "./footer.module.css";
import {TodoContext} from "../../models/todoContext.model";
import {Dispatch, SetStateAction, useState} from "react";
import classNames from "classnames";

export type footerProps = {
    todoContext: TodoContext | null,
    showActive : boolean,
    setShowActive: Dispatch<SetStateAction<boolean>>
    removeDone: ()=>void
}

const Footer = ({todoContext, showActive,setShowActive, removeDone}: footerProps) => {
    const remainedItems = todoContext?.state.todos.filter((todo) => !todo.done).length
    return <div className={classes.footer}>
        <p className={classes.content}><strong>{remainedItems}</strong> items left</p>
        <div className={classes.content}>
            <span onClick={() => setShowActive(false)}
                  className={classNames([classes.tab, {[classes.bold]: !showActive}])}>All</span>
            <span onClick={() => setShowActive(true)}
                  className={classNames([classes.tab, {[classes.bold]: showActive}])}>Active</span>
        </div>
        <div onClick={removeDone} className={classes.btn}>Clear completed</div>
    </div>
}

export default Footer