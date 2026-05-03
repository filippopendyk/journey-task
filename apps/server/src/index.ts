import { parseArgs } from "util";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";
import { createApp } from "./app.js";
import { parseMap } from "./map/parseMap.js";
import { loadGuests } from "./bookings/loadGuests.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      map: { type: "string", short: "m", default: join(__dirname, "../../../map.ascii") },
      bookings: { type: "string", short: "b", default: join(__dirname, "../../../bookings.json") },
    },
  });

  const mapPath = values.map!;
  const bookingsPath = values.bookings!;

  const mapContent = await fs.readFile(mapPath, "utf-8");
  const mapData = parseMap(mapContent);
  const guests = await loadGuests(bookingsPath);

  const app = createApp(guests, mapData);
  const PORT = 3001;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
