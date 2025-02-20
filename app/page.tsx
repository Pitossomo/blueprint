"use client";

import ElementsManager from "@/classes/elementsManager";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import SelectInput from "./components/selectInput";
import Level from "@/classes/level";
import { LAYER_MAP } from "@/app/consts/layerMap";
import { LEVEL_LIST } from "@/app/consts/levelMap";
import Layer from "@/classes/layer";
import IElementList from "./interfaces/iElementList";
import IElement from "./interfaces/iElement";
import dynamic from "next/dynamic";
import Toolbar from "./components/toolbar";

const Canvas = dynamic(() => import("./components/canvas"), {ssr: false});

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
	const commandLineRef = useRef<HTMLTextAreaElement>(null);
  	const elementsManager = new ElementsManager(canvasRef);
  	const [activeLayer, setActiveLayer] = useState<Layer<IElementList<IElement>>>(LAYER_MAP.floors);
  	const [activeLevel, setActiveLevel] = useState<Level>(LEVEL_LIST[0]);
	const [commandLineInput, setCommandLineInput] = useState<string>('');
	
	useEffect(() => {
		elementsManager.draw(activeLayer, activeLevel);
		setCommandLineInput(getInput(activeLayer, activeLevel));
	}, [activeLayer, activeLevel]);

	function handleLayerChange (e: ChangeEvent<HTMLSelectElement>): void {
		const selectedLayer = LAYER_MAP.getLayer(e.target.value);
    	setActiveLayer(selectedLayer);
	};

	function handleFloorLevelChange (e: ChangeEvent<HTMLSelectElement>): void {
    	const selectedLevel = LEVEL_LIST[parseInt(e.target.value)];
		setActiveLevel(selectedLevel);
	}

	const getInput = (layer: Layer<IElementList<IElement>>, level: Level) => { return elementsManager.getInput(layer, level); }

	const redraw = () => { 
		elementsManager.handleInput(
			commandLineRef.current?.value || '',
			activeLayer,
			activeLevel
		);
	}

	return (
    	<div className="w-full h-screen p-4">
      		<h1 className="text-2xl font-bold mb-4">Desenhe Formas Geométricas</h1>
    		<Canvas canvasRef={canvasRef} />
      		
			<div className="flex">
				<SelectInput label="Selecione a camada:" onChange={handleLayerChange}>
					{ LAYER_MAP.getEntries().map(([layerKey, layerObj]) => (
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
				<Toolbar
					elementsManager={elementsManager}
					activeLayer={activeLayer}
					activeLevel={activeLevel}
					redraw={redraw}
				/>	

				<div className="mb-2 p-2 border border-gray-300 rounded w-full text-gray-400">
					<p>{activeLayer.getHelperText()}</p>
					<textarea
						className="no-border w-full focus:outline-none text-gray-500"
						onChange={(e) => setCommandLineInput(e.target.value)}
						value={commandLineInput}
						ref={commandLineRef}
						rows={8}
					/>
				</div>
			</div>
    	</div>
  	);
}
