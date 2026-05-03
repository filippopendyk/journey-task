import express from "express";
import { ParsedMap } from "../types.js";
import { mergeCabanaAvailability } from "../bookings/bookingStore.js";

export function createMapRouter(mapData: ParsedMap) {
  const router = express.Router();

  router.get("/", (req, res) => {
    const tilesWithAvailability = mergeCabanaAvailability(mapData.tiles);
    res.json({
      width: mapData.width,
      height: mapData.height,
      tiles: tilesWithAvailability,
    });
  });

  return router;
}
