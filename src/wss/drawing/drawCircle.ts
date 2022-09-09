import { mouseToggle, dragMouse } from "robotjs";

export const drawCircle = (
  positionX: number,
  positionY: number,
  px: number
): void => {
  mouseToggle("down");
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = positionX + px * Math.cos(i) - px;
    const y = positionY + px * Math.sin(i);

    dragMouse(x, y);
  }
  mouseToggle("up");
};
