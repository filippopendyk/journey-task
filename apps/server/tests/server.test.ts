import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";
import { parseMap } from "../src/map/parseMap";
import { resetBookingStore } from "../src/bookings/bookingStore";

const testMap = `.....#.....
..W.W..W..
.....#.....`;
const testGuests = [
  { room: "101", guestName: "Alice Smith" },
  { room: "102", guestName: "Bob Johnson" },
];

describe("Backend tests", () => {
  beforeEach(() => {
    resetBookingStore();
  });

  it("parses a valid ASCII map", () => {
    const mapData = parseMap(testMap);
    expect(mapData.height).toBe(3);
    expect(mapData.width).toBeGreaterThan(0);
    expect(mapData.tiles.some((t) => t.type === "cabana")).toBe(true);
  });

  it("returns map data from GET /api/map", async () => {
    const mapData = parseMap(testMap);
    const app = createApp(testGuests, mapData);
    const res = await request(app).get("/api/map");
    expect(res.status).toBe(200);
    expect(res.body.width).toBe(mapData.width);
    expect(res.body.height).toBe(mapData.height);
  });

  it("accepts valid booking", async () => {
    const mapData = parseMap(testMap);
    const app = createApp(testGuests, mapData);
    const cabana = mapData.tiles.find((t) => t.type === "cabana");
    const res = await request(app).post("/api/bookings").send({
      cabanaId: cabana?.cabanaId,
      room: "101",
      guestName: "Alice Smith",
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("rejects invalid room/name", async () => {
    const mapData = parseMap(testMap);
    const app = createApp(testGuests, mapData);
    const cabana = mapData.tiles.find((t) => t.type === "cabana");
    const res = await request(app).post("/api/bookings").send({
      cabanaId: cabana?.cabanaId,
      room: "999",
      guestName: "Unknown Person",
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("rejects already booked cabana", async () => {
    const mapData = parseMap(testMap);
    const app = createApp(testGuests, mapData);
    const cabana = mapData.tiles.find((t) => t.type === "cabana");

    await request(app).post("/api/bookings").send({
      cabanaId: cabana?.cabanaId,
      room: "101",
      guestName: "Alice Smith",
    });

    const res = await request(app).post("/api/bookings").send({
      cabanaId: cabana?.cabanaId,
      room: "102",
      guestName: "Bob Johnson",
    });
    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it("rejects non-existent cabana", async () => {
    const mapData = parseMap(testMap);
    const app = createApp(testGuests, mapData);
    const res = await request(app).post("/api/bookings").send({
      cabanaId: "cabana-999-999",
      room: "101",
      guestName: "Alice Smith",
    });
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
