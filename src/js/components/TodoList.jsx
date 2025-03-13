import { useEffect, useState } from 'react';
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState("");

  
  useEffect(() => {

    const busquedaDeUsuario = async () => {
      try {
        // 👉 Hacemos la petición GET
        // fetch por defecto hace una petición GET, por eso no necesitamos especificar el método
        const response = await fetch(
          "https://playground.4geeks.com/todo/users/camberotje12324"
        );
  
        // 👉 Verificamos si la petición fue exitosa
        if (!response.ok) {
          throw new Error("¡Vaya! No hemos podido obtener las tareas!");
        }
  
        // 👉 Convertimos la respuesta a JSON
        const data = await response.json();
  
        // 👉 Guardamos los datos en el estado
        setTasks(data.todos);

      } catch (error) {
        try {
          // 👉 Hacemos la petición POST
          const response = await fetch("https://playground.4geeks.com/todo/users/camberotje12324", {
            method: 'POST', // 👈 Especificamos que es POST
            headers: {
              'Content-Type': 'application/json', // 👈 Indicamos que enviamos JSON
            },
            // 👉 Convertimos nuestro objeto a string JSON
            body: JSON.stringify({
              name: "camberotje12324"
            }),
          });
    
          if (!response.ok) {
            throw new Error('Error al crear la tarea');
          }
    
          const data = await response.json();
          fetchTasks()
        } catch (error) {
          console.log(error)
        }
      } 
    };

    busquedaDeUsuario()
    
  },[])

  const fetchTasks = async () => {
    try {
      // 👉 Hacemos la petición GET
      // fetch por defecto hace una petición GET, por eso no necesitamos especificar el método
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/camberotje12324"
      );

      // 👉 Verificamos si la petición fue exitosa
      if (!response.ok) {
        throw new Error("¡Vaya! No hemos podido obtener las tareas!");
      }

      // 👉 Convertimos la respuesta a JSON
      const data = await response.json();

      // 👉 Guardamos los datos en el estado
      setTasks(data.todos);
    } catch (error) {
      
    } 
  };

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;

    try {
      // 👉 Hacemos la petición POST
      const response = await fetch('https://playground.4geeks.com/todo/todos/camberotje12324', {
        method: 'POST', // 👈 Especificamos que es POST
        headers: {
          'Content-Type': 'application/json', // 👈 Indicamos que enviamos JSON
        },
        // 👉 Convertimos nuestro objeto a string JSON
        body: JSON.stringify({
          label: newTask,
          is_done: false
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }

      const data = await response.json();
      console.log(data)
      setTasks([...tasks, data]);
      setNewTask("");
    } catch (error) {
      console.log(error)
    }

  };

  const handleDeleteTask = async (id) => {

    try {
      // 👉 Hacemos la petición DELETE
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: 'DELETE', // 👈 Especificamos que es DELETE
        }
      );

      if (!response.ok) throw new Error('Error al borrar la tarea');

      // Si todo va bien, actualizamos la lista local
      // Esto se llama "Optimistic Update" - actualizamos la UI antes de
      // tener confirmación del servidor, asumiendo que todo irá bien

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    } catch (error) {
    console.log(error)
    }

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
            {task.label}
            <button className='delete-btn' onClick={() => handleDeleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
