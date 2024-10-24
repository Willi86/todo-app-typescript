import React, { useState, useEffect } from 'react'; 
import TodoList from './components/TodoList'; 
import TodoInput from './components/TodoInput';
import './styles/styles.css'; 

// Define the Todo type so that TypeScript knows the shape of a todo object
export interface Todo {
  id: number; // Unique identifier for each todo
  text: string; // The actual text content of the todo
  completed: boolean; // Tracks if the todo is completed or not
}

const App: React.FC = () => {
  // `useState` to manage the state of todos. This function loads saved todos from localStorage if they exist
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos'); // Get todos from localStorage 
    return savedTodos ? JSON.parse(savedTodos) : []; // Parse the saved todos or start with an empty array if nothing is found
  });

  // `useEffect` hook to save the todos into localStorage whenever the `todos` state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // Convert todos array to a string and save it in localStorage
  }, [todos]); // Dependency array: This runs the effect whenever `todos` changes

  // Function to add a new todo to the list
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(), // Use the current timestamp as a unique id for each todo
      text: text, // The text passed into the function (new todo text)
      completed: false, // New todos are initially not completed
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]); // Add the new todo to the list of existing todos
  };

  // Function to toggle the completed status of a todo (complete/uncomplete)
  const toggleTodo = (id: number) => {
    setTodos((prevTodos) => 
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
        // If the id matches, toggle the `completed` status, otherwise return the todo unchanged
      )
    );
  };

  // Function to remove a todo from the list based on its id
  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    // Keep only the todos that don't have the matching id (remove the one with the matching id)
  };

  return (
    <div>
      <header>
        <h1>Todo App</h1> 
        <div className="button-container">
          <TodoInput addTodo={addTodo} /> {/* Pass the `addTodo` function to the TodoInput component */}
        </div>
      </header>
      <ul id="List">
        <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        {/* Pass the todos, `toggleTodo`, and `removeTodo` functions to the TodoList component */}
      </ul>
      <footer>
        <div className="footer-container">
          <p>&copy; 2024 Todo App</p> 
        </div>
      </footer>
    </div>
  );
};

export default App;
