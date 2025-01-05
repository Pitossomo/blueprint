"use client";

import { ElementsManager, LayerType } from "@/classes/elementsManager";
import { useState, useRef, ChangeEvent } from "react";
import Toolbar from "./components/toolbar";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsManager = new ElementsManager(canvasRef);
  const [inputValue, setInputValue] = useState<string>('');
  const [activeLayer, setActiveLayer] = useState<LayerType>(LayerType.FLOORS);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const input = e.target.value;
    setInputValue(input);
  };

  const handleLayerChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedLayer = e.target.value as LayerType;
    setActiveLayer(selectedLayer)
  };

  const layerTypes = Object.values(LayerType);

  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Desenhe Formas Geométricas</h1>

      <canvas
        className="border border-gray-300 rounded w-full"
        width="1000" height="300"
        ref={canvasRef}
      />

      <select className="p-4 border border-gray my-2" onChange={handleLayerChange}>
        { layerTypes.map(layer => (
          <option key={layer} value={layer}>{layer}</option>
        ))}
      </select>

      <Toolbar elementsManager={elementsManager} activeLayer={activeLayer} />

      <textarea
        className="w-full h-32 p-2 mb-4 border rounded"
        placeholder="Digite as instruções aqui..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
