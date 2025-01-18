"use client";

import { ElementsManager } from "@/classes/elementsManager";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import Toolbar from "./components/toolbar";
import SelectInput from "./components/selectInput";
import { Level } from "@/classes/level";
import { LAYER_MAP } from "@/app/consts/layerMap";
import { LEVEL_LIST } from "@/app/consts/levelMap";
import { Layer } from "@/classes/layer";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  	const elementsManager = new ElementsManager(canvasRef);
  	const [activeLayer, setActiveLayer] = useState<Layer>(LAYER_MAP["FLOORS"]);
  	const [activeLevel, setActiveLevel] = useState<Level>(LEVEL_LIST[0]);
	
	const handleLayerChange = (e: ChangeEvent<HTMLSelectElement>): void => {
		const selectedLayerName = e.target.value;
		const selectedLayer = LAYER_MAP[selectedLayerName];
		console.log(selectedLayer);
    	setActiveLayer(selectedLayer)
	};

	const handleFloorLevelChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    	const selectedLevel = LEVEL_LIST[parseInt(e.target.value)];
    	setActiveLevel(selectedLevel);
	}
	const generateSlabs = () => { 
		elementsManager.generateSlabs();
		elementsManager.draw(activeLayer, activeLevel);
	}
	const redraw = (input:string) => { elementsManager.handleInput(input, activeLayer, activeLevel); }
	const getInput = () => { return elementsManager.getInput(activeLayer, activeLevel); }

	useEffect(() => {
    	elementsManager.draw(activeLayer, activeLevel); // Redraw the canvas
		elementsManager.getInput(activeLayer, activeLevel);
	}, [activeLayer, activeLevel]);

	return (
    	<div className="w-full h-screen p-4">
      		<h1 className="text-2xl font-bold mb-4">Desenhe Formas Geométricas</h1>
    		<div className="relative border border-gray-300 rounded w-full overflow-hidden">
        		<canvas width="1000" height="400" ref={canvasRef} />
      		</div>

			<div className="flex">
				<SelectInput label="Selecione a camada:" onChange={handleLayerChange}>
					{ Object.entries(LAYER_MAP).map(([layerKey, layerObj]) => (
						<option key={layerKey} value={layerKey}>{layerObj.getLabel()}</option>
          			))}
        		</SelectInput>

        		<SelectInput label="Selecione o pavimento" onChange={handleFloorLevelChange}>
					{ LEVEL_LIST.map((level, index) => (
						<option key={level.getName()} value={index}>{level.getName()}</option>
		  			))}          			
        		</SelectInput>
      		</div>

			<Toolbar generateSlabs={generateSlabs} redraw={redraw} activeLayer={activeLayer} getInput={getInput} />
    	</div>
  	);
}
