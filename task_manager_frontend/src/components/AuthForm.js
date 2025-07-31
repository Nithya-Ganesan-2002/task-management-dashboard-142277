import React, { useState } from "react";

// PUBLIC_INTERFACE
function AuthForm({ mode, onSubmit, error, loading }) {
  /**
   * Authentication form for login/register.
   * mode: "login" | "register"
   * onSubmit: (username, password) => void
   */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onSubmit(username, password);
    }
  };

  return (
    <form className="tm-auth-form" onSubmit={handleForm}>
      <h2>{mode === "login" ? "Sign In" : "Register"}</h2>
      {error ? <div className="tm-auth-error">{error}</div> : null}
      <input
        className="tm-input"
        type="text"
        autoComplete="username"
        placeholder="Username"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />
      <input
        className="tm-input"
        type="password"
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        placeholder="Password"
        value={password}
        required
        minLength={6}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <button className="btn" type="submit" disabled={loading}>
        {loading ? "..." : mode === "login" ? "Sign In" : "Register"}
      </button>
    </form>
  );
}

export default AuthForm;
