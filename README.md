# Resort Cabana Booking App

A small full-stack webapp that displays a resort map and allows guests to book cabanas.

## Stack

- Backend: Node.js + Express + TypeScript
- Frontend: React + Vite + TypeScript
- Tests: Vitest + supertest (backend), Vitest + React Testing Library (frontend)

## Setup

1. Install root dependencies:
```bash
npm install
```

2. Install server and web dependencies:
```bash
npm run install:all
```

## Run

Start backend and frontend together from project root:

```bash
npm run start
```

Or with custom map/bookings files (paths are relative to current working directory):

```bash
npm run start -- --map ./map.ascii --bookings ./bookings.json
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Valid Guests for Booking

Use any room number and guest name from `bookings.json`. Some examples:
- Room 101, Alice Smith
- Room 102, Bob Jones
- Room 107, Grace Lee
- And many more (see "Valid Guests" section in the UI)

## Tests

Run all tests:

```bash
npm test
```

Or run backend/frontend tests separately:

```bash
cd apps/server && npm test
cd apps/web && npm test
```

## Design Decisions & Trade-offs

1. **Simple monorepo architecture**: Two apps (server/web) for clarity and ease of review
2. **In-memory state**: Cabana bookings stored in memory only (no database)
3. **Pure functions for parsing/validation**: Easy to test without side effects
4. **Minimal abstractions**: Avoided over-engineering, kept code simple
5. **CSS grid for map**: Clean grid layout for the resort map
6. **Tile rendering**: Uses solid colors instead of images for simplicity (can replace with real assets in public/assets)
7. **Guest validation**: Case-insensitive, trims whitespace, matches bookings.json

## Assumptions

- Guests pre-loaded from bookings.json
- Cabana IDs are cabana-x-y derived from coordinates
- Frontend consumes REST API exclusively (no direct file access)
- Immediate map refresh after booking
- Single entrypoint command from project root

## Manual Steps to Complete

1. Take a screenshot of the running app and save as `screenshot.png` in project root
2. Review and update AI.md with your actual AI usage details
