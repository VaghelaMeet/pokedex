import React from "react";
import "./CSS/TypeBadge.css";

const WeaknessBadge = ({ weaknesses }) => {
  return (
    <div className="type-container">
      {weaknesses.map((w) => (
        <span className={`type-badge ${w.name}`} key={w.name}>
          {w.name}
        </span>
      ))}
    </div>
  );
};

export default WeaknessBadge;
