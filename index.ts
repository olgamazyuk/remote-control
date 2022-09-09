import "dotenv/config";
import { WebSocketServer, createWebSocketStream } from "ws";
import robot from "robotjs";
import { drawCircle } from "./src/wss/drawing/drawCircle";
import { drawRectangle } from "./src/wss/drawing/drawRectangle";
import { drawSquare } from "./src/wss/drawing/drawSquare";
import { printScreen } from "./src/wss/image/printScreen";
import { httpServer } from "./src/http_server/index";

const HTTP_PORT = process.env.HTTP_PORT;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: Number(process.env.WSS),
});

wss.on("connection", (ws) => {
  const duplexStream = createWebSocketStream(ws, {
    decodeStrings: false,
    encoding: "utf8",
  });

  duplexStream.on("data", async (data) => {
    const command = data.toString().split(" ")[0];
    const value1 = data.toString().split(" ")[1];
    const value2 = data.toString().split(" ")[2];
    const { x, y } = robot.getMousePos();

    switch (command) {
      case "mouse_up":
        duplexStream.write(`mouse_up ${value1}`);
        robot.moveMouse(x, y - value1);
        break;
      case "mouse_down":
        duplexStream.write(`mouse_down ${value1}`);
        robot.moveMouse(x, y + +value1);
        break;
      case "mouse_left":
        duplexStream.write(`mouse_left ${value1}`);
        robot.moveMouse(x - value1, y);
        break;
      case "mouse_right":
        duplexStream.write(`mouse_right ${value1}`);
        robot.moveMouse(x + +value1, y);
        break;
      case "mouse_position":
        duplexStream.write(`mouse_position ${x},${y}`);
        break;
      case "draw_circle":
        duplexStream.write(`draw_circle ${value1}`);
        drawCircle(x, y, +value1);
        break;
      case "draw_rectangle":
        duplexStream.write(`draw_rectangle ${value1} ${value2}`);
        drawRectangle(x, y, +value1, +value2);
        break;
      case "draw_square":
        duplexStream.write(`draw_square ${value1}`);
        drawSquare(x, y, +value1);
        break;
      case "prnt_scrn":
        duplexStream.write(await printScreen(x, y));
    }
  });

  ws.on("close", () => {
    console.log("Connectin was closed");
  });
});
