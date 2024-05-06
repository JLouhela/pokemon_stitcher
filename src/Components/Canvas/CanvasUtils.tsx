export function getImageBounds(image: HTMLImageElement, canvas: HTMLCanvasElement) {
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

