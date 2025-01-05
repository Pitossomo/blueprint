import { ElementsManager, LayerType } from "@/classes/elementsManager";
import { Floor } from "@/classes/floor";
import { Point2D } from "@/classes/point2D";
import { ChangeEvent, useState } from "react";

type ToolbarProps = {
    elementsManager: ElementsManager;
    activeLayer: LayerType;
}

export default function Toolbar({elementsManager, activeLayer}: ToolbarProps) {
    const [pathInput, setPathInput] = useState('');
    const [helpText, setHelpText] = useState('Enter path as x1,y1;x2,y2;...');

    const handlePathInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPathInput(e.target.value);
    };

    const parsePathInput = (input: string): Point2D[] => {
        const points = input.split(';').map(pointStr => {
            const [x, y] = pointStr.split(',').map(Number);
            return new Point2D(x, y);
        });
        return points;
    };

    const handleAddFloor = () => {
        const newPath = parsePathInput(pathInput);
        elementsManager.addFloor(new Floor(newPath, 0));
        elementsManager.draw(activeLayer);
    };

    return (
        <div>
            <nav className="flex justify-left items-center p-2 bg-gray-200">
                <button
                    className="px-4 py-2 text-lg cursor-pointer bg-blue-600 text-white border border-gray-300 rounded transition duration-300 hover:bg-blue-800"
                    onClick={handleAddFloor}
                >
                    Add Floor
                </button>
            </nav>
            <div className="mb-2 p-2 border border-gray-300 rounded w-full text-gray-400">
                <p>{helpText}</p>
                <textarea
                    className="no-border w-full focus:outline-none text-gray-500"
                    value={pathInput}
                    onChange={handlePathInputChange}
                />
            </div>
        </div>
    );
}