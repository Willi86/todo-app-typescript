import React, { useState } from 'react';

interface TodoInputProps {
  addTodo: (text: string) => void; // The prop passed from App component to add a new todo
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [text, setText] = useState(''); // Initializes the text input state with an empty string and provides a setter function to update it

  // Function that handles the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing when the form is submitted
    if (text.trim()) { // Check if the text input is not empty or just spaces
      addTodo(text); // Call the `addTodo` function passed as a prop with the current text
      setText(''); // Clear the input field after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* Form to handle the submission */}
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)} // Updates the state whenever the user types in the input field
        placeholder="Write something"
      />
      <button type="submit">Add</button> {/* Submit button for adding the todo */}
    </form>
  );
};

export default TodoInput;
