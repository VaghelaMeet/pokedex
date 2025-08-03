import React from "react";
import "./CSS/TypeBadge.css";

const TypeBadge = ({ types }) => {
  return (
    <div className="type-container">
      {types.map((t) => (
        <span className={`type-badge ${t.type.name}`} key={t.type.name}>
          {t.type.name}
        </span>
      ))}
    </div>
  );
};

export default TypeBadge;
