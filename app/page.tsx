"use client";

import { ElementsManager } from "@/classes/elementsManager";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import Toolbar from "./components/toolbar";
import { LAYERMAP } from "@/app/consts/layerMap";
import SelectInput from "./components/selectInput";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsManager = new ElementsManager(canvasRef);
  const [activeLayer, setActiveLayer] = useState<string>("FLOORS");
  const [floorLevel, setFloorLevel] = useState<number>(0);

  const handleLayerChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedLayer = e.target.value;
    setActiveLayer(selectedLayer)
  };

  const handleFloorLevelChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedFloorLevel = parseInt(e.target.value);
    setFloorLevel(selectedFloorLevel);
  }

  useEffect(() => {
    elementsManager.draw(activeLayer); // Redraw the canvas
  }, [activeLayer]);

  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Desenhe Formas Geométricas</h1>

      <div className="relative border border-gray-300 rounded w-full overflow-hidden">
        <canvas
          width="1000" height="600"
          ref={canvasRef}
        />
      </div>

      <div className="flex">
        <SelectInput label="Selecione a camada:" onChange={handleLayerChange}>
          { Object.entries(LAYERMAP).map(([layerKey, layerObj]) => (
            <option key={layerKey} value={layerKey}>{layerObj.label}</option>
          ))}
        </SelectInput>

        <SelectInput label="Selecione o pavimento" onChange={handleFloorLevelChange}>
          <option value="0">Térreo</option>
          <option value="300">1º Andar</option>
          <option value="600">2º Andar</option>
        </SelectInput>
      </div>

      <Toolbar elementsManager={elementsManager} activeLayer={activeLayer} />
    </div>
  );
}
