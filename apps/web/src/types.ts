export type TileType = "empty" | "path" | "chalet" | "pool" | "cabana";

export interface Tile {
  x: number;
  y: number;
  type: TileType;
  cabanaId?: string;
  available?: boolean;
}

export interface MapData {
  width: number;
  height: number;
  tiles: Tile[];
}

export interface BookingRequest {
  cabanaId: string;
  room: string;
  guestName: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  cabanaId?: string;
}

export interface Guest {
  room: string;
  guestName: string;
}
