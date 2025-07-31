import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import Fab from "./components/Fab";
import TaskModal from "./components/TaskModal";
import AuthForm from "./components/AuthForm";
import api from "./api";

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application: Handles authentication, navigation, task state,
   * theme, and layout.
   */
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null); // { username, token }
  const [activeView, setActiveView] = useState("tasks"); // "tasks" | ... (could add settings, etc.)
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Load tasks when authenticated
  useEffect(() => {
    if (user && user.token) {
      setTasksLoading(true);
      api.getTasks(user.token)
        .then(data => setTasks(data.tasks || data))
        .catch(() => setTasks([]))
        .finally(() => setTasksLoading(false));
    } else {
      setTasks([]);
    }
  }, [user]);

  // Theme toggle
  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  // Sidebar links
  const links = [
    { key: "tasks", label: "My Tasks", icon: "📝" }
  ];

  // Task actions
  const handleAddTaskBtn = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleTaskModalSave = (task) => {
    setShowTaskModal(false);
    if (editingTask) {
      // Update
      api.updateTask(task, user.token)
        .then((updated) => setTasks((tasks) =>
          tasks.map(t => t.id === updated.id ? updated : t)
        ))
        .catch((e) => alert(e.message));
    } else {
      // Add new
      api.addTask({ title: task.title, completed: false }, user.token)
        .then((created) => setTasks((tasks) => [...tasks, created]))
        .catch((e) => alert(e.message));
    }
  };

  const handleDeleteTask = (task) => {
    if (window.confirm("Delete this task?")) {
      api.deleteTask(task.id, user.token)
        .then(() => setTasks((tasks) =>
          tasks.filter(t => t.id !== task.id)
        ))
        .catch((e) => alert(e.message));
    }
  };

  const handleToggleComplete = (task) => {
    api.updateTask({ ...task, completed: !task.completed }, user.token)
      .then((updated) => setTasks((tasks) =>
        tasks.map(t => t.id === updated.id ? updated : t)
      ))
      .catch((e) => alert(e.message));
  };

  // Auth logic
  const handleLogin = (username, password) => {
    setAuthError("");
    setAuthLoading(true);
    api.login(username, password)
      .then(data => {
        setUser({ username, token: data.access_token || data.token });
      })
      .catch(e => setAuthError(e.message))
      .finally(() => setAuthLoading(false));
  };
  const handleRegister = (username, password) => {
    setAuthError("");
    setAuthLoading(true);
    api.register(username, password)
      .then(() => {
        setAuthMode("login");
        setAuthError("✔️ Registration successful, now sign in.");
      })
      .catch(e => setAuthError(e.message))
      .finally(() => setAuthLoading(false));
  };
  const handleLogout = () => {
    setUser(null);
    setAuthError("");
    setTasks([]);
  };

  return (
    <div className="tm-root">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <Header user={user} onLogout={handleLogout} />
      <div className="tm-main-layout">
        <Sidebar
          links={links}
          active={activeView}
          onNavigate={setActiveView}
        />
        <main className="tm-main-content">
          {!user ? (
            <div className="tm-auth-page">
              <AuthForm
                mode={authMode}
                onSubmit={authMode === "login" ? handleLogin : handleRegister}
                error={authError}
                loading={authLoading}
              />
              <div style={{ marginTop: 10 }}>
                {authMode === "login" ? (
                  <span>
                    Don't have an account?{" "}
                    <button className="btn-link" onClick={() => { setAuthMode("register"); setAuthError(""); }}>
                      Register
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{" "}
                    <button className="btn-link" onClick={() => { setAuthMode("login"); setAuthError(""); }}>
                      Log in
                    </button>
                  </span>
                )}
              </div>
            </div>
          ) : (
            <>
              <TaskList
                tasks={tasks}
                loading={tasksLoading}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
              <Fab onClick={handleAddTaskBtn} label="Add Task" />
              <TaskModal
                open={showTaskModal}
                onClose={() => setShowTaskModal(false)}
                onSave={handleTaskModalSave}
                editingTask={editingTask}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
