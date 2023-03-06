import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';


export type FilterValuesType = 'all' | 'active' | 'completed'

function App(): JSX.Element {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'CSS&SCSS', isDone: true},
        {id: 3, title: 'ES6/TS', isDone: false},
        {id: 4, title: 'REDUX', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
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

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
