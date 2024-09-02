
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
  const visibleImageData = ctx.getImageData(imageBounds.left, imageBounds.top, imageBounds.right - imageBounds.left + 1, imageBounds.bottom - imageBounds.top + 1);
  return visibleImageData;
}

export function scaleImageData(ctx: CanvasRenderingContext2D, imageData: ImageData): number {
  const dpi = window.devicePixelRatio;
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = imageData.height / imageData.width * window.innerWidth;

  ctx.canvas.style.height = ctx.canvas.height + "px";
  ctx.canvas.style.width = ctx.canvas.width + "px";
  ctx.canvas.width *= dpi;
  ctx.canvas.height *= dpi;
  ctx.scale(dpi, dpi);

  // Scale image to fill the screen
  var scale = Math.floor(ctx.canvas.width / imageData.width);
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
  }
  // Set scaled image data to ctx
  ctx.putImageData(scaledImageData, 0, 0);
  return scale;
}

interface PixelCenter {
  x: number,
  y: number
}

function getPixelCenter(ctx: CanvasRenderingContext2D, scale: number): PixelCenter {

  var imageBounds = getImageBounds(ctx);
  const dpi = window.devicePixelRatio;
  scale /= dpi;

  var x = (imageBounds.right - imageBounds.left) / dpi;
  x = Math.floor(x / scale);
  if (x % 2 !== 0) {
    x += 1;
  }
  x = x * scale / 2;

  var y = (imageBounds.bottom - imageBounds.top) / dpi;
  y = Math.floor(y / scale);
  if (y % 2 !== 0) {
    y += 1;
  }
  y = y * scale / 2;

  return { x: x + imageBounds.left, y: y + imageBounds.top };
}

function drawCenterLine(ctx: CanvasRenderingContext2D, scale: number, lineWidth: number, color: string, pixelCenter: PixelCenter): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  const dpi = window.devicePixelRatio;
  const height = ctx.canvas.height / dpi;
  const width = ctx.canvas.width / dpi;

  ctx.beginPath();
  ctx.moveTo(pixelCenter.x, 0);
  ctx.lineTo(pixelCenter.x, height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, pixelCenter.y);
  ctx.lineTo(width, pixelCenter.y);
  ctx.stroke();
}

function drawGridLines(ctx: CanvasRenderingContext2D, spacing: number, lineWidth: number, color: string, pixelCenter: PixelCenter): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  const dpi = window.devicePixelRatio;
  spacing /= dpi;
  const width = ctx.canvas.width / dpi;
  const height = ctx.canvas.height / dpi;

  // Draw in chunks of half grid size to make bolder grid expand from center
  for (let x = pixelCenter.x; x < width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let x = pixelCenter.x; x >= 0; x -= spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = pixelCenter.y; y < height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let y = pixelCenter.y; y >= 0; y -= spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

export function drawGrid(ctx: CanvasRenderingContext2D, scale: number): void {
  const gridColor = "#555555";

  const pixelCenter = getPixelCenter(ctx, scale);
  drawGridLines(ctx, scale, 1, gridColor, pixelCenter);
  drawGridLines(ctx, scale * 5, 3, gridColor, pixelCenter);
  drawCenterLine(ctx, scale, 5, "#AAAAAA", pixelCenter);
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
