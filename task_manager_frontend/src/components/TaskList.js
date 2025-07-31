import React from "react";

// PUBLIC_INTERFACE
function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  loading
}) {
  /** Renders the list of tasks with completion toggle, edit, and delete actions. */
  if (loading) {
    return <div className="tm-tasks-loading">Loading tasks...</div>;
  }
  if (!tasks.length) {
    return <div className="tm-tasks-empty">No tasks found.</div>;
  }
  return (
    <ul className="tm-task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={
            "tm-task-item" +
            (task.completed ? " tm-task-complete" : "")
          }
        >
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task)}
            />
            <span className="tm-task-desc">{task.title}</span>
          </label>
          <div className="tm-task-actions">
            <button
              className="btn btn-small"
              title="Edit"
              onClick={() => onEdit(task)}
            >✏️
            </button>
            <button
              className="btn btn-small"
              title="Delete"
              onClick={() => onDelete(task)}
            >🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
