import { mouseToggle, moveMouseSmooth } from "robotjs";

export const drawRectangle = (
  x: number,
  y: number,
  width: number,
  height: number
): void => {
  mouseToggle("down");
  moveMouseSmooth(x + width, y);
  moveMouseSmooth(x + width, y + height);
  moveMouseSmooth(x, y + height);
  moveMouseSmooth(x, y);
  mouseToggle("up");
};
