import './TodoContainer.scss'
import { useEffect, useState } from 'react'
import TodoList from '../../components/TodoList/TodoList'
import { Todo } from '../../types/Todo'
import TodoInput from '../../components/TodoInput/TodoInput'

const TodoContainer = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        console.log(todos)
    }
    , [todos])


    const handleUpdateTodos = (newTodo: Todo) => {
        setTodos([...todos, newTodo])
    }



    return (
        <div className="todo-container">
            <h1 className="todo-container__title">Today's Tasks</h1>
            <TodoInput updateTodos={handleUpdateTodos} />
            <TodoList todos={todos} />
            
        </div>
    )
}

export default TodoContainer