import React, { useState } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [duration, setDuration] = useState('daily');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') return;
    onAddTask({ task, duration });
    setTask('');
    setDuration('daily');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} role="form" aria-label="Add a new task">
      <select
        className="task-duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        aria-label="Select task duration"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <input
        className="task-input"
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        aria-label="Task name"
      />
      <button className="add-task-btn" type="submit">
        Add task
      </button>
    </form>
  );
};

export default TaskForm; 