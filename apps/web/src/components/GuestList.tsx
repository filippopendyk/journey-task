import React from "react";
import { Guest } from "../types";

interface GuestListProps {
  guests: Guest[];
}

const GuestList: React.FC<GuestListProps> = ({ guests }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Valid Guests</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "8px",
          marginTop: "10px",
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        {guests.map((guest, index) => (
          <div
            key={index}
            style={{
              padding: "8px",
              border: "1px solid #eee",
              borderRadius: "4px",
            }}
          >
            <strong>Room {guest.room}:</strong> {guest.guestName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestList;
