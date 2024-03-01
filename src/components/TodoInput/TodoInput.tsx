import './TodoInput.scss'
import { useState } from 'react'
import { Todo } from '../../types/Todo'

type TodoInputProps = {
    updateTodos: (newTodo: Todo) => void;

}

const TodoInput = ({ updateTodos}: TodoInputProps) => {
    const [id, setId] = useState(1)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    

    const handleAddTodoClick = () => {
        const newTodo = {
            id,
            name,
            description,
            completed: false,
        }
        updateTodos(newTodo)
        setId(id + 1)
        setName('')
        setDescription('')


    }

    return (
        <div className="todo-input">
            <input 
                type="text" 
                placeholder="Add task" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={handleAddTodoClick}>Add Todo</button>
        </div>
    )
}

export default TodoInput
