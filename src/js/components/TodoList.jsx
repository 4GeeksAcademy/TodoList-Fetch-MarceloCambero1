import { useState } from 'react';
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const handleDeleteTask = (indexToDelete) => {
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== indexToDelete));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className='todo-container'>
      <h1>TO-DO List</h1>

      <input 
        type="text" 
        placeholder="Escribe una tarea..." 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      
      <button onClick={handleAddTask}>Agregar tarea</button>
      
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button className='delete-btn' onClick={() => handleDeleteTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
