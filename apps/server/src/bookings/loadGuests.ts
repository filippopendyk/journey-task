import fs from "fs/promises";
import { Guest } from "../types.js";

export async function loadGuests(filePath: string): Promise<Guest[]> {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as Guest[];
}

export function validateGuest(
  guests: Guest[],
  room: string,
  guestName: string
): boolean {
  const normalizedRoom = room.trim();
  const normalizedName = guestName.trim().toLowerCase();

  return guests.some(
    (g) =>
      g.room.trim() === normalizedRoom &&
      g.guestName.trim().toLowerCase() === normalizedName
  );
}
