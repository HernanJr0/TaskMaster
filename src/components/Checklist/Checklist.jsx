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
        <div id='checklist'>
            <h1>TaskMaster</h1>
            <div id='newTask'>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    id='inputTask'
                    placeholder='Digite o nome da tarefa'
                />
                <button onClick={addTask}>Adicionar Tarefa</button>
            </div>
            <div id='tasks'>
                {tasks.map((task, index) => (
                    <p key={index} id='task'>
                        {task}
                        <button onClick={() => deleteTask(index)}>Apagar</button>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Checklist