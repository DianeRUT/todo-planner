import React, { useEffect, useRef } from 'react';
import '../styles/TaskList.css';

const EditIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
);
const DeleteIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);
const SaveIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
);
const CancelIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const TaskList = ({ tasks, onEdit, onDelete, editingTaskId, editingTaskData, onEditChange, onSaveEdit, onCancelEdit, onToggleComplete }) => {
  const editInputRef = useRef(null);

  useEffect(() => {
    if (editingTaskId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTaskId]);

  if (!tasks.length) {
    return (
      <div className="task-list-empty" role="status">
        <div className="empty-illustration" aria-hidden="true" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📝</div>
        <div>No tasks found.<br /><span style={{ color: '#bfc97e' }}>Add your first task above!</span></div>
      </div>
    );
  }
  return (
    <ul className="task-list">
      {tasks.map((task, idx) => {
        const isEditing = editingTaskId === task.id;
        return (
          <li
            className={`task-item${isEditing ? ' editing' : ' task-item-appear'}${task.completed ? ' completed' : ''}`}
            key={task.id}
            tabIndex={0}
            aria-label={`Task ${idx + 1}: ${task.name}`}
          >
            <input
              type="checkbox"
              className="task-complete-checkbox"
              checked={!!task.completed}
              onChange={() => onToggleComplete(task.id)}
              aria-label={task.completed ? `Mark task '${task.name}' as incomplete` : `Mark task '${task.name}' as complete`}
              tabIndex={0}
            />
            <span className="task-number">{idx + 1}</span>
            {isEditing ? (
              <>
                <input
                  className="task-edit-input"
                  type="text"
                  value={editingTaskData.name}
                  onChange={e => onEditChange('name', e.target.value)}
                  ref={editInputRef}
                  aria-label="Edit task name"
                  aria-describedby={`edit-desc-${task.id}`}
                  onKeyDown={e => {
                    if (e.key === 'Enter') onSaveEdit();
                    if (e.key === 'Escape') onCancelEdit();
                  }}
                />
                <span id={`edit-desc-${task.id}`} className="visually-hidden">Edit the name of this task</span>
                <select
                  className="task-edit-select"
                  value={editingTaskData.duration}
                  onChange={e => onEditChange('duration', e.target.value)}
                  aria-label="Edit task duration"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <button className="task-save-btn" onClick={onSaveEdit} aria-label="Save task changes" type="button">
                  <SaveIcon />Save
                </button>
                <button className="task-cancel-btn" onClick={onCancelEdit} aria-label="Cancel editing task" type="button">
                  <CancelIcon />Cancel
                </button>
              </>
            ) : (
              <>
                <span className="task-name">{task.name}</span>
                <button className="task-edit-btn" onClick={() => onEdit(task)} aria-label={`Edit task: ${task.name}`} tabIndex={0}>
                  <EditIcon />
                </button>
                <button className="task-delete-btn" onClick={() => {
                  if (window.confirm(`Delete task '${task.name}'?`)) onDelete(task.id);
                }} aria-label={`Delete task: ${task.name}`} tabIndex={0} type="button">
                  <DeleteIcon />
                </button>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList; 