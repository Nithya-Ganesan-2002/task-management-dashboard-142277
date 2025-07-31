import React from "react";

// PUBLIC_INTERFACE
function Header({ user, onLogout }) {
  /** Header for the app: Title and user menu. */
  return (
    <header className="tm-header">
      <span className="tm-title">Task Manager</span>
      <div className="tm-user-menu">
        {user ? (
          <>
            <span className="tm-username">Hi, {user.username}</span>
            <button className="btn tm-logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
