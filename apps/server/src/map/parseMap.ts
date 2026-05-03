import { ParsedMap, Tile, TileType } from "../types.js";

export const charToTileType: Record<string, TileType> = {
  ".": "empty",
  "#": "path",
  "c": "chalet",
  "p": "pool",
  "W": "cabana",
};

export function parseMap(asciiMap: string): ParsedMap {
  const lines = asciiMap.split("\n").filter((line) => line.trim() !== "");
  const height = lines.length;
  const width = lines[0]?.length || 0;
  const tiles: Tile[] = [];

  for (let y = 0; y < height; y++) {
    const line = lines[y] || "";
    for (let x = 0; x < width; x++) {
      const char = line[x] || ".";
      const type = charToTileType[char] || "empty";
      const tile: Tile = { x, y, type };

      if (type === "cabana") {
        tile.cabanaId = `cabana-${x}-${y}`;
        tile.available = true;
      }

      tiles.push(tile);
    }
  }

  return { width, height, tiles };
}
