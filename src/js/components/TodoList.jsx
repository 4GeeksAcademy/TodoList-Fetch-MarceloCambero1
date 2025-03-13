import { useEffect, useState } from 'react';
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState("");
  const username = "camberotje12324";  //CON ESTE USUARIO DETERMINO DENTRO DE LA VARIABLE CON SIGNO DE DOLAR EL USUARIO QUE QUIERO CONSEGUIR

  useEffect(() => {
    const busquedaDeUsuario = async () => {
      try {
        const response = await fetch(
          `https://playground.4geeks.com/todo/users/${username}`   //VARIABLE CON SIGNO DE DOLAR DONDE VOY A LOCALIZAR EL USUARIO QUE HE DETERMINADO ARRIBA
        );
  
        if (!response.ok) {
          throw new Error("¡Vaya! No hemos podido obtener las tareas!");
        }
  
        const data = await response.json();
        setTasks(data.todos);

      //CREO UN TRY CATCH DE UN METODO POST DENTRO DEL CATCH DEL METODO GET PARA CREAR EL USUARIO EN CASO QUE NO EXISTA
      } catch (error) {
        try {
          const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: username
            }),
          });
    
          if (!response.ok) {
            throw new Error('Error al crear la tarea');
          }
          await response.json();
          fetchTasks();  //LLAMO A LA FUNCION UNA VEZ TODO ESTE BIEN 
        } catch (error) {
          console.log(error);

        }
      } 
    };

    busquedaDeUsuario();
  }, []);


  //METODO GET PARA CREAR TAREAS
  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/users/${username}`
      );

      if (!response.ok) {
        throw new Error("¡Vaya! No hemos podido obtener las tareas!");
      }

      const data = await response.json();
      setTasks(data.todos);
    } catch (error) {
      console.log(error);
    }
  };
  //METODO POST PARA CREAR TAREAS
  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          label: newTask,
          is_done: false
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }

      const data = await response.json();
      setTasks([...tasks, data]);
      setNewTask("");
    } catch (error) {
      console.log(error);
    }
  };


  //METODO DELETE PARA ELIMINAR LAS TAREAS
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) throw new Error('Error al borrar la tarea');

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
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
