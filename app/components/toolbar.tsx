import { ElementsManager } from "@/classes/elementsManager";
import { LAYERMAP } from "@/app/consts/layerMap";
import { ChangeEvent, useState } from "react";
import { ToolbarButton } from "./toolbarButton";

type ToolbarProps = {
    elementsManager: ElementsManager;
    activeLayer: string;
}

export default function Toolbar({elementsManager, activeLayer}: ToolbarProps) {
    const [pathInput, setPathInput] = useState('');

    const handlePathInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => { setPathInput(e.target.value); };
    const handleInput = () => { elementsManager.handleInput(activeLayer, pathInput) };
    const generateSlabs = () => { elementsManager.generateSlabs(activeLayer) };

    return (
        <div>
            <nav className="flex justify-left items-center p-2 bg-gray-200">
                <ToolbarButton onClick={handleInput}> Atualizar desenho </ToolbarButton>
                <ToolbarButton onClick={generateSlabs}> Gerar lajes </ToolbarButton>
            </nav>

            <div className="mb-2 p-2 border border-gray-300 rounded w-full text-gray-400">
                <p>{LAYERMAP[activeLayer].helperText}</p>
                <textarea
                    className="no-border w-full focus:outline-none text-gray-500"
                    value={pathInput}
                    onChange={handlePathInputChange}
                />
            </div>
        </div>
    );
}