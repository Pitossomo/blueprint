"use client";

import { ElementsManager } from "@/classes/elementsManager";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import Toolbar from "./components/toolbar";
import { LAYERMAP } from "@/app/consts/layerMap";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsManager = new ElementsManager(canvasRef);
  const [activeLayer, setActiveLayer] = useState<string>("FLOORS");

  const handleLayerChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedLayer = e.target.value;
    setActiveLayer(selectedLayer)
  };

  useEffect(() => {
    elementsManager.draw(activeLayer); // Redraw the canvas
  }, [activeLayer]);

  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Desenhe Formas Geométricas</h1>

      <div className="relative border border-gray-300 rounded w-full overflow-hidden">
        <canvas
          className="w-full h-full"
          width="1000" height="600"
          ref={canvasRef}
        />
      </div>

      <select className="p-4 border border-gray my-2" onChange={handleLayerChange}>
        { Object.entries(LAYERMAP).map(([layerKey, layerObj]) => (
          <option key={layerKey} value={layerKey}>{layerObj.label}</option>
        ))}
      </select>

      <Toolbar elementsManager={elementsManager} activeLayer={activeLayer} />
    </div>
  );
}
