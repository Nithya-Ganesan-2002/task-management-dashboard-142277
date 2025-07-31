import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
function TaskModal({ open, onClose, onSave, editingTask }) {
  /** Modal dialog for adding or editing a task. */
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editingTask) setTitle(editingTask.title || "");
    else setTitle("");
  }, [editingTask, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({ ...editingTask, title: title.trim() });
    }
  };

  if (!open) return null;

  return (
    <div className="tm-modal-overlay">
      <div className="tm-modal">
        <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="tm-input"
            placeholder="Task title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div className="tm-modal-actions">
            <button className="btn" type="submit">
              {editingTask ? "Update" : "Add"}
            </button>
            <button className="btn btn-secondary" onClick={onClose} type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
