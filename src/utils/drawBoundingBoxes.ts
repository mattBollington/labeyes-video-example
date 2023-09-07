import { scaleLinear } from "d3-scale";
import { BoundingBox } from "../types/types";

export function drawBoundingBoxes(
  ctx: CanvasRenderingContext2D,
  boundingBoxes: BoundingBox[],
  videoWidth: number,
  videoHeight: number,
  canvasWidth: number,
  canvasHeight: number
): void {
  const scaleX = scaleLinear().domain([0, videoWidth]).range([0, canvasWidth]);

  const scaleY = scaleLinear()
    .domain([0, videoHeight])
    .range([0, canvasHeight]);

  for (let bbox of boundingBoxes) {
    let [x, y, width, height] = bbox;

    const overlayX = scaleX(x);
    const overlayY = scaleY(y);
    const overlayWidth = scaleX(width + x) - scaleX(x);
    const overlayHeight = scaleY(height + y) - scaleY(y);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeRect(overlayX, overlayY, overlayWidth, overlayHeight);
  }
}
