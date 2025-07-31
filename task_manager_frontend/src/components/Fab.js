import React from "react";

// PUBLIC_INTERFACE
function Fab({ onClick, label }) {
  /** Floating action button (FAB) for main actions. */
  return (
    <button className="tm-fab" aria-label={label} onClick={onClick}>
      ＋
    </button>
  );
}

export default Fab;
