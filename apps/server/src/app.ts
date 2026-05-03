import express from "express";
import cors from "cors";
import { Guest, ParsedMap } from "./types.js";
import { createMapRouter } from "./routes/mapRoutes.js";
import { createBookingRouter } from "./routes/bookingRoutes.js";

export function createApp(guests: Guest[], mapData: ParsedMap) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/guests", (req, res) => {
    res.json(guests);
  });
  app.use("/api/map", createMapRouter(mapData));
  app.use("/api/bookings", createBookingRouter(guests, mapData));

  return app;
}
