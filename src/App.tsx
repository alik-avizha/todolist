import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'active' | 'completed'

function App(): JSX.Element {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'CSS&SCSS', isDone: true},
        {id: v1(), title: 'ES6/TS', isDone: false},
        {id: v1(), title: 'REDUX', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask,...tasks])
    }

    let tasksForRender: Array<TaskType> = []

    if (filter === 'all') {
        tasksForRender = tasks
    }
    if (filter === 'active') {
        tasksForRender = tasks.filter((t) => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter((t) => t.isDone)
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
