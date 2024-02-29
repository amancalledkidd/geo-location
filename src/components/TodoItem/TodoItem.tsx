import './TodoItem.scss'
import { Todo } from '../../types/Todo'

type TodoItemProps = { 
    todo: Todo;
}

const TodoItem = ({todo}: TodoItemProps) => {
    return (
        <div className="todo-item">
            <h1 className="todo-item__title">{todo.name}</h1>
            <p className="todo-item__description">{todo.description}</p>
            {todo.due && <p className="todo-item__due">Due: {todo.due}</p>}
        </div>
    )
}

export default TodoItem