import React, { useEffect, useState } from "react";
import { getMap, bookCabana, getGuests } from "./api";
import { MapData, Tile, BookingRequest, BookingResponse, Guest } from "./types";
import ResortMap from "./components/ResortMap";
import BookingModal from "./components/BookingModal";
import Legend from "./components/Legend";
import GuestList from "./components/GuestList";

function App() {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [mapData, guestsData] = await Promise.all([getMap(), getGuests()]);
      setMapData(mapData);
      setGuests(guestsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTileClick = (tile: Tile) => {
    setSelectedTile(tile);
  };

  const handleCloseModal = () => {
    setSelectedTile(null);
  };

  const handleBook = async (request: BookingRequest) => {
    const response: BookingResponse = await bookCabana(request);
    if (!response.success) {
      throw new Error(response.message);
    }
    await fetchData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!mapData) {
    return <div>Failed to load map</div>;
  }

  return (
    <div>
      <h1>Resort Cabana Booking</h1>
      <ResortMap mapData={mapData} onTileClick={handleTileClick} />
      <Legend />
      <GuestList guests={guests} />
      {selectedTile && selectedTile.cabanaId && (
        <BookingModal
          cabanaId={selectedTile.cabanaId}
          isAvailable={!!selectedTile.available}
          onClose={handleCloseModal}
          onBook={handleBook}
        />
      )}
    </div>
  );
}

export default App;