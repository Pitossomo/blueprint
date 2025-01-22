"use client";

import { ElementsManager } from "@/classes/elementsManager";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import SelectInput from "./components/selectInput";
import { Level } from "@/classes/level";
import { LAYER_MAP } from "@/app/consts/layerMap";
import { LEVEL_LIST } from "@/app/consts/levelMap";
import { Layer } from "@/classes/layer";
import ToolbarButton from "./components/toolbarButton";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
	const commandLineRef = useRef<HTMLTextAreaElement>(null);
  	const elementsManager = new ElementsManager(canvasRef);
  	const [activeLayer, setActiveLayer] = useState<Layer>(LAYER_MAP["FLOORS"]);
  	const [activeLevel, setActiveLevel] = useState<Level>(LEVEL_LIST[0]);
	const [commandLineInput, setCommandLineInput] = useState<string>('');
	
	useEffect(() => {
    	elementsManager.draw(activeLayer, activeLevel);
		setCommandLineInput(getInput());
	}, [activeLayer, activeLevel]);

	function handleLayerChange (e: ChangeEvent<HTMLSelectElement>): void {
		const selectedLayerName = e.target.value;
		const selectedLayer = LAYER_MAP[selectedLayerName];
    	setActiveLayer(selectedLayer)
	};

	function handleFloorLevelChange (e: ChangeEvent<HTMLSelectElement>): void {
    	const selectedLevel = LEVEL_LIST[parseInt(e.target.value)];
    	setActiveLevel(selectedLevel);
	}

	function generateSlabs () { 
		elementsManager.generateSlabs();
		if (activeLayer === LAYER_MAP["SLABS"]) {
			elementsManager.draw(activeLayer, activeLevel);
		}
	}

	function generateBeams(): void {
		elementsManager.generateBeams();
		if (activeLayer === LAYER_MAP["BEAMS"]) {
			elementsManager.draw(activeLayer, activeLevel);
		}
	}

	const redraw = () => { 
		elementsManager.handleInput(
			commandLineRef.current?.value || '',
			activeLayer,
			activeLevel
		);
	}

	const getInput = () => { return elementsManager.getInput(activeLayer, activeLevel); }

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

			<div>
				<nav className="flex justify-left items-center p-2 bg-gray-200">
					<ToolbarButton onClick={redraw}> Atualizar desenho </ToolbarButton>
					<ToolbarButton onClick={generateSlabs}> Gerar lajes </ToolbarButton>
					<ToolbarButton onClick={generateBeams}> Gerar vigas </ToolbarButton>
				</nav>

				<div className="mb-2 p-2 border border-gray-300 rounded w-full text-gray-400">
					<p>{activeLayer.getHelperText()}</p>
					<textarea
						className="no-border w-full focus:outline-none text-gray-500"
						onChange={(e) => setCommandLineInput(e.target.value)}
						value={commandLineInput}
						ref={commandLineRef}
					/>
				</div>
			</div>

    	</div>
  	);
}
