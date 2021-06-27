import React,{useState} from 'react';
import './App.css';
import { initialTodos } from "./initialTodos";
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  text: string;
  uuid: string;
};

type AddTodo = (newTodo: string) => void;
type DelTodo = (e:Todo) => void;
type EmptyTodo =  () => void;
interface TodoListProps {
  todos: Array<Todo>;
  delTodo: DelTodo;
}
const TodoList: React.FC<TodoListProps> = ({
  todos,
  delTodo,
}) => {
  return (
    <ul className="todoList">
      {todos.map(todo => (
        <TodoListItem
          key={todo.text}
          todo={todo}
          delTodo={delTodo}
        />
      ))}
      {/* <!-- data are comes from local storage --> */}
    </ul>
  );
}

interface TodoListItemProps {
  todo: Todo;
  delTodo: DelTodo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  delTodo,
}) => {
  return (
    <li id={todo.uuid}>
      {todo.text}
        <span className="icon" onClick={()=>delTodo(todo)}>
        <i className="fas fa-trash"></i>
      </span>
    </li>
  );
};

interface AddTodoFormProps {
  addTodo: AddTodo;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="inputField">
      <input type="text" value={newTodo} onChange={handleChange} placeholder="Add your new todo" />
      <button onClick={handleSubmit}><i className="fas fa-plus"></i></button>
    </div>
  );
};

function App() {
  const [todos, setTodos] = useState<Array<Todo>>(initialTodos);

  const addTodo: AddTodo = newTodo => {
    newTodo.trim() !== "" &&
      setTodos([...todos, { text: newTodo, uuid: uuidv4() }]);
  };

  const delTodo: DelTodo = e => {
    setTodos([...todos.filter(el => el.text !== e.text)]);
  }

  const emptyTodo: EmptyTodo = () => {
    setTodos([]);
  }

  return (
  <div className="wrapper">
    <header>Todo App</header>
    <AddTodoForm addTodo={addTodo}/>
    <TodoList todos={todos} delTodo={delTodo} />
    <div className="footer">
      <span>You have <span className="pendingTasks"></span> pending tasks</span>
      <button onClick={emptyTodo}>Clear All</button>
    </div>
  </div>
  );
}

export default App;
