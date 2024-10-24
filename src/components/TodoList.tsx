import React from 'react';
import { Todo } from '../App'; 

interface TodoListProps {
  todos: Todo[]; // Array of todos
  toggleTodo: (id: number) => void; // Function to toggle the completion status
  removeTodo: (id: number) => void; // Function to remove a todo
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, removeTodo }) => {
  return (
    <ul>
      {/* Iterate over the todos array and display each todo */}
      {todos.map(todo => (
        <li
          key={todo.id} // Each item needs a unique `key` for React to track changes
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} // If completed, strike through the text
        >
          <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span> {/* Clicking the todo toggles its completion */}
          <button onClick={() => removeTodo(todo.id)}>Delete</button> {/* Clicking the delete button removes the todo */}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
