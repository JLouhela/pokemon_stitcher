import React, { useEffect, useRef } from 'react'
import './Canvas.css'
import { getContext } from './CanvasUtils';

interface Props {
  spriteUrl: string;
}

const Canvas = ({ spriteUrl }: Props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = getContext(canvasRef);
    if (ctx === null) {
      return;
    }
    var img = new Image();
    img.onload = function () {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    console.log(spriteUrl);
    img.src = spriteUrl;
  }, [spriteUrl]);

  return (
    <div id="sprite">
      <canvas ref={canvasRef} width='480' height='480' />
    </div>
  )
}

export default Canvas