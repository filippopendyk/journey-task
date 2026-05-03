import React from "react";

const Legend: React.FC = () => {
  const items = [
    { type: "empty", label: "Empty Space", color: "#f0f0f0" },
    { type: "path", label: "Path", color: "#d4a373" },
    { type: "chalet", label: "Chalet", color: "#8b4513" },
    { type: "pool", label: "Pool", color: "#00bfff" },
    { type: "cabana-available", label: "Cabana (Available)", color: "#90ee90" },
    { type: "cabana-booked", label: "Cabana (Booked)", color: "#ff6b6b" },
  ];

  return (
    <div className="legend">
      {items.map((item) => (
        <div key={item.type} className="legend-item">
          <div
            className="legend-color"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
