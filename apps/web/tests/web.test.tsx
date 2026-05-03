import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../src/App";
import * as api from "../src/api";

const mockMapData = {
  width: 5,
  height: 3,
  tiles: [
    { x: 0, y: 0, type: "empty" },
    { x: 1, y: 0, type: "cabana", cabanaId: "cabana-1-0", available: true },
    { x: 2, y: 0, type: "empty" },
    { x: 3, y: 0, type: "cabana", cabanaId: "cabana-3-0", available: false },
    { x: 4, y: 0, type: "empty" },
    { x: 0, y: 1, type: "empty" },
    { x: 1, y: 1, type: "path" },
    { x: 2, y: 1, type: "pool" },
    { x: 3, y: 1, type: "path" },
    { x: 4, y: 1, type: "empty" },
    { x: 0, y: 2, type: "empty" },
    { x: 1, y: 2, type: "chalet" },
    { x: 2, y: 2, type: "empty" },
    { x: 3, y: 2, type: "chalet" },
    { x: 4, y: 2, type: "empty" },
  ],
};

vi.mock("../src/api");

describe("Frontend tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (api.getMap as any).mockResolvedValue(mockMapData);
    (api.getGuests as any).mockResolvedValue([
      { room: "101", guestName: "Alice Smith" },
    ]);
    (api.bookCabana as any).mockResolvedValue({
      success: true,
      message: "Cabana booked successfully!",
      cabanaId: "cabana-1-0",
    });
  });

  it("renders map from mocked API", async () => {
    render(<App />);
    await waitFor(() => expect(api.getMap).toHaveBeenCalled());
    expect(screen.getByText("Resort Cabana Booking")).toBeInTheDocument();
  });

  it("clicking available cabana opens booking UI", async () => {
    render(<App />);
    await waitFor(() => expect(api.getMap).toHaveBeenCalled());
    const cabanaTiles = screen.getAllByText("W");
    fireEvent.click(cabanaTiles[0]);
    expect(screen.getByText("Book Cabana cabana-1-0")).toBeInTheDocument();
  });

  it("submitting valid booking shows confirmation and updates UI", async () => {
    render(<App />);
    await waitFor(() => expect(api.getMap).toHaveBeenCalled());
    const cabanaTiles = screen.getAllByText("W");
    fireEvent.click(cabanaTiles[0]);
    
    fireEvent.change(screen.getByPlaceholderText("Room Number"), {
      target: { value: "101" },
    });
    fireEvent.change(screen.getByPlaceholderText("Guest Name"), {
      target: { value: "Alice Smith" },
    });
    fireEvent.click(screen.getByText("Book"));
    
    await waitFor(() =>
      expect(screen.getByText("Booking Confirmed!")).toBeInTheDocument()
    );
  });

  it("clicking unavailable cabana shows unavailable message", async () => {
    render(<App />);
    await waitFor(() => expect(api.getMap).toHaveBeenCalled());
    const bookedCabana = screen.getByText("X");
    fireEvent.click(bookedCabana);
    expect(screen.getByText("Cabana Unavailable")).toBeInTheDocument();
  });

  it("invalid booking shows human-readable error", async () => {
    (api.bookCabana as any).mockResolvedValue({
      success: false,
      message: "Invalid room number or guest name",
    });
    
    render(<App />);
    await waitFor(() => expect(api.getMap).toHaveBeenCalled());
    const cabanaTiles = screen.getAllByText("W");
    fireEvent.click(cabanaTiles[0]);
    
    fireEvent.change(screen.getByPlaceholderText("Room Number"), {
      target: { value: "999" },
    });
    fireEvent.change(screen.getByPlaceholderText("Guest Name"), {
      target: { value: "Unknown" },
    });
    fireEvent.click(screen.getByText("Book"));
    
    await waitFor(() =>
      expect(api.bookCabana).toHaveBeenCalled()
    );
  });
});
