import { mouseToggle, moveMouseSmooth } from "robotjs";

export const drawSquare = (x: number, y: number, length: number): void => {
  mouseToggle("down");
  moveMouseSmooth(x + length, y);
  moveMouseSmooth(x + length, y + length);
  moveMouseSmooth(x, y + length);
  moveMouseSmooth(x, y);
  mouseToggle("up");
};
