import Cookies from 'universal-cookie';
import React, { useState, useEffect } from 'react';

const cookies = new Cookies();

function Checklist() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const storedTasks = cookies.get('tasks');
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    const addTask = () => {
        if (newTask.trim() !== '') {
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            cookies.set('tasks', updatedTasks, { path: '/' });
            setNewTask('');
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        console.log('Novas tarefas:', updatedTasks);
        setTasks(updatedTasks);
        cookies.set('tasks', updatedTasks, { path: '/' });
        console.log('Cookies atualizados:', cookies.get('tasks'));
    };

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Adicionar Tarefa</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <button onClick={() => deleteTask(index)}>Apagar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Checklist