import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void  //функция которая возвращает undefined, т.к. нету в функции ретурн
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const Todolist: FC<TodolistPropsType> = (props) => {

    const [title, setTitle] = useState<string>('')

    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? 'todolist-empty' : 'todolist'

    const todolistItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id)
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>Delete task</button>
            </li>
        )
    })

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const maxTitleLength = 20
    const recommendedTitleLength = 10

    const isAddTaskNotPossible: boolean = title.length === 0 || title.length > maxTitleLength

    const onKeyDownHandler = isAddTaskNotPossible
        ? undefined
        : (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTaskHandler()

    const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{color: 'hotpink'}}>Title should be shorter</div>

    const longTitleErrorMessage = title.length > maxTitleLength && <div style={{color: 'red'}}>Title is too long!!!</div>

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={'Enter task title, please'}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button
                    onClick={addTaskHandler}
                    disabled={isAddTaskNotPossible}
                >+
                </button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
            </div>
            <ul>
                {todolistItems}
            </ul>
            <div>
                <button onClick={() => props.changeTodoListFilter('all')}>All</button>
                <button onClick={() => props.changeTodoListFilter('active')}>Active</button>
                <button onClick={() => props.changeTodoListFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};
export default Todolist;