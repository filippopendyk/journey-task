import { BookingRequest, BookingResponse, MapData, Guest } from "./types";

const API_BASE = "http://localhost:3001/api";

export async function getMap(): Promise<MapData> {
  const response = await fetch(`${API_BASE}/map`);
  if (!response.ok) {
    throw new Error("Failed to fetch map");
  }
  return response.json();
}

export async function bookCabana(
  request: BookingRequest
): Promise<BookingResponse> {
  const response = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  return response.json();
}

export async function getGuests(): Promise<Guest[]> {
  const response = await fetch(`${API_BASE}/guests`);
  if (!response.ok) {
    throw new Error("Failed to fetch guests");
  }
  return response.json();
}
