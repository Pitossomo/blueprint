"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      // Clean the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Parse the input string and draw shapes
      const shapes = inputValue.split(',').map(shape => shape.trim());
      console.log(shapes)
      
      shapes.forEach((shape, index) => {
        const [type, x, y, size] = shape.split(' ');
        switch (type) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(parseFloat(x),parseFloat(y), parseFloat(size), 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'square':
            ctx.fillRect(parseFloat(x), parseFloat(y), parseFloat(size), parseFloat(size));
            break;
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(parseFloat(x), parseFloat(y));
            ctx.lineTo(parseFloat(x) + parseFloat(size), parseFloat(y));
            ctx.lineTo(parseFloat(x) + (parseFloat(size) / 2), parseFloat(y) - parseFloat(size));
            ctx.closePath();
            ctx.fill();
          break;
          default:
            break;
        }
      });
    }
  }, [inputValue]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Desenhe Formas Geométricas</h1>
      <textarea 
        className="w-full h-24 p-2 mb-4 border rounded"
        placeholder="Digite as instruções aqui..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <canvas
        ref={canvasRef}
        width={800} height={600}
        className="border border-gray-300 rounded"
      />
    </div>
  );
}
