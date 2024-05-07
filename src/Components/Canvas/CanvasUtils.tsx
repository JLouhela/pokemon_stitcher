
interface ImageBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;

}
function getImageBounds(ctx: CanvasRenderingContext2D): ImageBounds {
  // Read pixels from ctx
  const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imgData.data;
  // Find the bounds of the image
  let minX = ctx.canvas.width;
  let minY = ctx.canvas.height;
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) {
      continue;
    }
    const x = (i / 4) % ctx.canvas.width;
    const y = Math.floor(i / 4 / ctx.canvas.width);
    if (x < minX) {
      minX = x;
    }
    if (x > maxX) {
      maxX = x;
    }
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  }
  return { left: minX, right: maxX, top: minY, bottom: maxY };
}

export function stripInvisiblePixels(ctx: CanvasRenderingContext2D): ImageData {
  const imageBounds = getImageBounds(ctx);
  // Set one extra pixel on each side in case the image size is divisible by two
  // This allows drawing centerline between pixels
  if ((imageBounds.left - imageBounds.right) % 2 === 0) {
    imageBounds.right += 1;
  }
  if ((imageBounds.top - imageBounds.bottom) % 2 === 0) {
    console.log("hep");
    imageBounds.bottom += 1;
  }
  console.log(imageBounds);
  const visibleImageData = ctx.getImageData(imageBounds.left, imageBounds.top, imageBounds.right - imageBounds.left + 1, imageBounds.bottom - imageBounds.top + 1);
  return visibleImageData;
}

export function scaleImageData(ctx: CanvasRenderingContext2D, imageData: ImageData, scale: number): void {
  ctx.canvas.width = imageData.width * scale;
  ctx.canvas.height = imageData.height * scale;
  // Copy imageData to new array
  var scaledImageData = new ImageData(imageData.width * scale, imageData.height * scale);
  // Copy each pixel to the new array
  for (let i = 0; i < imageData.data.length; i += 4) {
    const x = (i / 4) % imageData.width;
    const y = Math.floor(i / 4 / imageData.width);
    for (let dx = 0; dx < scale; dx++) {
      for (let dy = 0; dy < scale; dy++) {
        const index = 4 * ((y * scale + dy) * scaledImageData.width + x * scale + dx);
        scaledImageData.data[index] = imageData.data[i];
        scaledImageData.data[index + 1] = imageData.data[i + 1];
        scaledImageData.data[index + 2] = imageData.data[i + 2];
        scaledImageData.data[index + 3] = imageData.data[i + 3];
      }
    }
    // Set scaled image data to ctx
    ctx.putImageData(scaledImageData, 0, 0);
  }
}

function drawCenterLine(ctx: CanvasRenderingContext2D): void {
  // Draw line through center of canvas
  // TODO: offset image by half a pixel to make it centered
  ctx.strokeStyle = '#ff0000';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(ctx.canvas.width / 2, 0);
  ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, ctx.canvas.height / 2);
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
  ctx.stroke();
}

export function drawGrid(ctx: CanvasRenderingContext2D, scale: number): void {
  ctx.strokeStyle = '#FFffff';
  ctx.lineWidth = 1;
  for (let x = 0; x < ctx.canvas.width; x += scale) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < ctx.canvas.height; y += scale) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);
    ctx.stroke();
  }
  drawCenterLine(ctx);
}

export function getContext(canvasRef: React.RefObject<HTMLCanvasElement>): CanvasRenderingContext2D | null {
  if (canvasRef.current === null) {
    return null;
  }
  const canvas = canvasRef.current as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    return null;
  }
  return ctx;
}
