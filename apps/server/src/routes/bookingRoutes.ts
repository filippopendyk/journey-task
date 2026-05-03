import express from "express";
import { Guest, ParsedMap } from "../types.js";
import { validateGuest } from "../bookings/loadGuests.js";
import { bookCabana, isCabanaBooked } from "../bookings/bookingStore.js";

export function createBookingRouter(guests: Guest[], mapData: ParsedMap) {
  const router = express.Router();

  router.post("/", (req, res) => {
    const { cabanaId, room, guestName } = req.body;

    if (!cabanaId || !room || !guestName) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: cabanaId, room, guestName",
      });
    }

    const cabanaTile = mapData.tiles.find(
      (t) => t.type === "cabana" && t.cabanaId === cabanaId
    );
    if (!cabanaTile) {
      return res.status(404).json({
        success: false,
        message: "Cabana not found",
      });
    }

    if (isCabanaBooked(cabanaId)) {
      return res.status(409).json({
        success: false,
        message: "Cabana is already booked",
      });
    }

    if (!validateGuest(guests, room, guestName)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room number or guest name",
      });
    }

    const booked = bookCabana(cabanaId);
    if (!booked) {
      return res.status(409).json({
        success: false,
        message: "Cabana is already booked",
      });
    }

    res.status(201).json({
      success: true,
      message: "Cabana booked successfully!",
      cabanaId,
    });
  });

  return router;
}
