import React, {FC} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void  //функция которая возвращает undefined, т.к. нету в функции ретурн
    changeTodoListFilter: (filter:FilterValuesType) => void
}

const Todolist: FC<TodolistPropsType> = (props) => {
    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? 'todolist-empty' : 'todolist'

    const todolistItems : Array<JSX.Element> = props.tasks.map((task) => {
        return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={()=>props.removeTask(task.id)}>Delete task</button>
                </li>
        )
    })

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {todolistItems}
            </ul>
            <div>
                <button onClick={()=>props.changeTodoListFilter("all")}>All</button>
                <button onClick={()=>props.changeTodoListFilter("active")}>Active</button>
                <button onClick={()=>props.changeTodoListFilter("completed")}>Completed</button>
            </div>
        </div>
    );
};
export default Todolist;