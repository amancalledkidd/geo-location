import './TodoInput.scss'
import { useState } from 'react'
import { Todo } from '../../types/Todo'

type TodoInputProps = {
    setNewTodo: (todo: Todo) => void;
    updateTodos: () => void;

}

const TodoInput = ({setNewTodo, updateTodos}: TodoInputProps) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [due, setDue] = useState('')

    const handleAddTodoClick = () => {
        setNewTodo({
            name,
            description,
            completed: false,
            due
        })
        updateTodos()
        setName('')
        setDescription('')
        setDue('')


    }

    return (
        <div className="todo-input">
            <h1 className="todo-input__title">Todo Input</h1>
            <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Due" 
                value={due} 
                onChange={(e) => setDue(e.target.value)}
            />
            <button onClick={handleAddTodoClick}>Add Todo</button>
        </div>
    )
}

export default TodoInput
