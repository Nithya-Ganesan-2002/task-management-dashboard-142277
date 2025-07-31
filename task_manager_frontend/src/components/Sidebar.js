import React from "react";

// PUBLIC_INTERFACE
function Sidebar({ links, active, onNavigate }) {
  /** Sidebar navigation with minimal styling. */
  return (
    <nav className="tm-sidebar">
      <ul>
        {links.map((link) => (
          <li
            key={link.key}
            className={active === link.key ? "tm-active" : ""}
            onClick={() => onNavigate(link.key)}
          >
            {link.icon && <span className="tm-sidebar-icon">{link.icon}</span>}
            <span>{link.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
