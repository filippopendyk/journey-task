import React from "react";
import { MapData, Tile } from "../types";

interface ResortMapProps {
  mapData: MapData;
  onTileClick: (tile: Tile) => void;
}

const ResortMap: React.FC<ResortMapProps> = ({ mapData, onTileClick }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${mapData.width}, 40px)`,
        gap: "2px",
        marginTop: "20px",
      }}
    >
      {mapData.tiles.map((tile, index) => {
        const isCabana = tile.type === "cabana";
        const isBooked = isCabana && !tile.available;

        return (
          <div
            key={index}
            className={`tile tile-${tile.type} ${isBooked ? "booked" : ""}`}
            onClick={() => isCabana && onTileClick(tile)}
          >
            {isCabana ? (tile.available ? "W" : "X") : ""}
          </div>
        );
      })}
    </div>
  );
};

export default ResortMap;
