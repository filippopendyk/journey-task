import { spawn } from "child_process";
import { parseArgs } from "util";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    map: { type: "string", short: "m" },
    bookings: { type: "string", short: "b" },
  },
});

function resolvePath(filePath: string): string {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
}

const serverArgs: string[] = [];
if (values.map) {
  serverArgs.push("--map", resolvePath(values.map));
}
if (values.bookings) {
  serverArgs.push("--bookings", resolvePath(values.bookings));
}

console.log("Starting server and frontend...");
console.log("Server args:", serverArgs);

const server = spawn("npx", ["tsx", "src/index.ts", ...serverArgs], {
  cwd: path.join(__dirname, "apps", "server"),
  stdio: "inherit",
  shell: true,
});

const frontend = spawn("npx", ["vite"], {
  cwd: path.join(__dirname, "apps", "web"),
  stdio: "inherit",
  shell: true,
});

process.on("SIGINT", () => {
  console.log("\nShutting down...");
  server.kill();
  frontend.kill();
  process.exit();
});
