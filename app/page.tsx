"use client";

import { ElementsManager } from "@/classes/elementsManager";
import { useState, useRef, ChangeEvent } from "react";
import Toolbar from "./components/toolbar";
import { LAYERMAP } from "@/classes/layerMap";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsManager = new ElementsManager(canvasRef);
  const [activeLayer, setActiveLayer] = useState<string>("FLOORS");

  const handleLayerChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedLayer = e.target.value;
    setActiveLayer(selectedLayer)
  };

  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Desenhe Formas Geométricas</h1>

      <canvas
        className="border border-gray-300 rounded w-full"
        width="1000" height="300"
        ref={canvasRef}
      />

      <select className="p-4 border border-gray my-2" onChange={handleLayerChange}>
        { Object.entries(LAYERMAP).map(([layerKey, layerObj]) => (
          <option key={layerKey} value={layerKey}>{layerObj.label}</option>
        ))}
      </select>

      <Toolbar elementsManager={elementsManager} activeLayer={activeLayer} />
    </div>
  );
}
