import './TodoContainer.scss'
import { useState } from 'react'
import TodoList from '../../components/TodoList/TodoList'
import { Todo } from '../../types/Todo'
import TodoInput from '../../components/TodoInput/TodoInput'

const TodoContainer = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [newTodo, setNewTodo] = useState<Todo>({
        name: '',
        description: '',
        completed: false
    })

    const handleUpdateTodos = () => {
        setTodos([...todos, newTodo])
    }



    return (
        <div className="todo-container">
            <h1 className="todo-container__title">Todo Container</h1>
            <TodoInput setNewTodo={setNewTodo} updateTodos={handleUpdateTodos} />
            <TodoList todos={todos} />
            
        </div>
    )
}

export default TodoContainer