"use client";

import { Slab } from "@/classes/slab";
import { useState, useRef, useEffect, ChangeEvent } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('');
  const [slabs, setSlabs] = useState<Slab[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      // Clean the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      slabs.forEach((slab) => { slab.draw(ctx) })

    }
  }, [inputValue]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const input = e.target.value;
    setInputValue(input);
    
    // Parse input and update customSlabs
    const newSlabs:Slab[] = []
    input.split(',').forEach((slab: string) => {
      try {
        const [x, y, dx, dy] = slab.trim().split(' ').map(Number);
        newSlabs.push(new Slab(x, y, dx, dy));  
      } catch (e) {}
    });
    console.log(newSlabs)
    
    setSlabs(newSlabs);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Desenhe Formas Geométricas</h1>
      <textarea 
        className="w-full h-24 p-2 mb-4 border rounded"
        placeholder="Digite as instruções aqui..."
        value={inputValue}
        onChange={handleChange}
      />
      <canvas
        ref={canvasRef}
        width={800} height={600}
        className="border border-gray-300 rounded"
      />
    </div>
  );
}
