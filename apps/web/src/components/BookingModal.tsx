import React, { useState } from "react";
import { BookingRequest } from "../types";

interface BookingModalProps {
  cabanaId: string;
  isAvailable: boolean;
  onClose: () => void;
  onBook: (request: BookingRequest) => Promise<void>;
}

const BookingModal: React.FC<BookingModalProps> = ({
  cabanaId,
  isAvailable,
  onClose,
  onBook,
}) => {
  const [room, setRoom] = useState("");
  const [guestName, setGuestName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onBook({ cabanaId, room, guestName });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {success ? (
          <>
            <h2>Booking Confirmed!</h2>
            <p className="success">Your cabana {cabanaId} has been booked successfully.</p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop: "16px" }}>
              Close
            </button>
          </>
        ) : !isAvailable ? (
          <>
            <h2>Cabana Unavailable</h2>
            <p>Sorry, this cabana is already booked.</p>
            <button className="btn-secondary" onClick={onClose} style={{ marginTop: "16px" }}>
              Close
            </button>
          </>
        ) : (
          <>
            <h2>Book Cabana {cabanaId}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Room Number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Guest Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
              {error && <p className="error">{error}</p>}
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Booking..." : "Book"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
