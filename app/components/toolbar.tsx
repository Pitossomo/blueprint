import { ElementsManager } from "@/classes/elementsManager";
import { LAYERMAP } from "@/classes/layerMap";
import { ChangeEvent, useState } from "react";

type ToolbarProps = {
    elementsManager: ElementsManager;
    activeLayer: string;
}

export default function Toolbar({elementsManager, activeLayer}: ToolbarProps) {
    const [pathInput, setPathInput] = useState('');

    const handlePathInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPathInput(e.target.value);
    };

    const handleInput = () => {
        LAYERMAP[activeLayer].list.parseInput(pathInput);
        elementsManager.draw(activeLayer);
    }

    return (
        <div>
            <nav className="flex justify-left items-center p-2 bg-gray-200">
                <button
                    className="px-4 py-2 text-lg cursor-pointer bg-blue-600 text-white border border-gray-300 rounded transition duration-300 hover:bg-blue-800"
                    onClick={handleInput}
                >
                    Add Floor
                </button>
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