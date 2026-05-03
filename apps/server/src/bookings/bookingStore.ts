import { Tile } from "../types.js";

interface BookingStore {
  bookedCabanas: Set<string>;
}

let store: BookingStore = {
  bookedCabanas: new Set(),
};

export function resetBookingStore() {
  store = { bookedCabanas: new Set() };
}

export function isCabanaBooked(cabanaId: string): boolean {
  return store.bookedCabanas.has(cabanaId);
}

export function bookCabana(cabanaId: string): boolean {
  if (store.bookedCabanas.has(cabanaId)) {
    return false;
  }
  store.bookedCabanas.add(cabanaId);
  return true;
}

export function mergeCabanaAvailability(tiles: Tile[]): Tile[] {
  return tiles.map((tile) => {
    if (tile.type === "cabana" && tile.cabanaId) {
      return {
        ...tile,
        available: !isCabanaBooked(tile.cabanaId),
      };
    }
    return tile;
  });
}
