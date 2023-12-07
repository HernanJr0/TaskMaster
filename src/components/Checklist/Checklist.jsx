import Cookies from 'universal-cookie';
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';

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
            const updatedTasks = [...tasks, { name: newTask, completed: false }];
            setTasks(updatedTasks);
            cookies.set('tasks', updatedTasks, { path: '/' });
            setNewTask('');
        }
    };

    const toggleTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        cookies.set('tasks', updatedTasks, { path: '/' });
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        cookies.set('tasks', updatedTasks, { path: '/' });
    };

    return (
        <div id='checklist'>
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
                    <div id='task' key={index}>
                        <div id='task'>
                            <Checkbox
                                checked={task.completed}
                                onChange={() => toggleTask(index)}
                                style={{ color: '#646cff' }}
                            />
                            <p>{task.name}</p>
                        </div>
                        <a onClick={() => deleteTask(index)}>Apagar</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Checklist;
