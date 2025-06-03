import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskData, setEditingTaskData] = useState({ name: '', duration: 'daily' });

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('todo-tasks');
    console.log('Loaded from localStorage:', stored);
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    console.log('Saving tasks:', tasks);
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const handleAddTask = ({ task, duration }) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: task,
        duration,
        completed: false,
      },
    ]);
  };

  // Toggle Complete
  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Start Edit
  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskData({ name: task.name, duration: task.duration });
  };

  // Edit form change
  const handleEditChange = (field, value) => {
    setEditingTaskData((prev) => ({ ...prev, [field]: value }));
  };

  // Save Edit
  const handleSaveEdit = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTaskId ? { ...t, ...editingTaskData } : t
      )
    );
    setEditingTaskId(null);
    setEditingTaskData({ name: '', duration: 'daily' });
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskData({ name: '', duration: 'daily' });
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingTaskId === id) handleCancelEdit();
  };

  // Filter tasks
  const filteredTasks =
    activeFilter === 'all'
      ? tasks
      : tasks.filter((t) => t.duration === activeFilter);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Clear All Tasks
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTasks([]);
    }
  };

  return (
    <div className="app-container">
      <HeroSection onAddTask={handleAddTask} />
      <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      {tasks.length > 0 && (
        <button className="clear-all-btn" onClick={handleClearAll} aria-label="Clear all tasks">
          Clear All
        </button>
      )}
      <TaskList
        tasks={filteredTasks}
        onEdit={handleStartEdit}
        onDelete={handleDeleteTask}
        editingTaskId={editingTaskId}
        editingTaskData={editingTaskData}
        onEditChange={handleEditChange}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;
