"use client";

import { ElementsManager, LayerType } from "@/classes/elementsManager";
import { useState, useRef, useEffect, ChangeEvent } from "react";

export default function Home() {
  const [elementsManager, setElementsManager] = useState<ElementsManager>(new ElementsManager());
  const [inputValue, setInputValue] = useState<string>('');
  const [activeLayer, setActiveLayer] = useState<LayerType>(elementsManager.activeLayer);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      // Set active layer
      elementsManager.setActiveLayer(activeLayer);
      // Clean the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Call the elements manager to draw on the canvas
      elementsManager.draw(ctx)
    }
  }, [inputValue, activeLayer]);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const input = e.target.value;
    setInputValue(input);
  };

  const handleLayerChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedLayer = e.target.value as LayerType;
    console.log('layer changed')
    setActiveLayer(selectedLayer)
    elementsManager.setActiveLayer(selectedLayer);
  };

  const layerTypes = Object.values(LayerType);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Desenhe Formas Geométricas</h1>

      <canvas
        ref={canvasRef}
        width={800} height={600}
        className="border border-gray-300 rounded"
      />

      <select className="p-4" onChange={handleLayerChange}>
        { layerTypes.map(layer => (
          <option key={layer} value={layer}>{layer}</option>
        ))}
      </select>

      <textarea
        className="w-full h-24 p-2 mb-4 border rounded"
        placeholder="Digite as instruções aqui..."
        value={inputValue}
        onChange={handleTextChange}
      />
    </div>
  );
}
