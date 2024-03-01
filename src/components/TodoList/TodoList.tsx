import './TodoList.scss'
import { Todo } from '../../types/Todo'
import TodoItem from '../TodoItem/TodoItem';

type TodoListProps = {
    todos: Todo[];
    // setTodos: (todos: Todo[]) => void;
}

const TodoList = ({todos}: TodoListProps) => {

    return (
        <div className="todo-list">
            {todos.map((todo) => {
                return (<TodoItem key={todo.id} todo={todo} />)
            })}
        </div>
    )
}   

export default TodoList
