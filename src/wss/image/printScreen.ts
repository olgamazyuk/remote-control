import { screen } from "robotjs";
import Jimp from "jimp";

export const printScreen = async (x: number, y: number): Promise<string> => {
  const bitmap = screen.capture(x - 100, y - 100, 200, 200);
  const img = new Jimp(bitmap.width, bitmap.height);
  img.bitmap.data = bitmap.image;

  const base64 = await img.getBase64Async(Jimp.MIME_PNG);
  const image = base64.split(",")[1];
  return `prnt_scrn ${image}`;
};
