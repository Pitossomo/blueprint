import { ElementsManager, LayerType } from "@/classes/elementsManager";
import { Floor } from "@/classes/floor";
import { Point2D } from "@/classes/point2D";
import { IElement } from "../interfaces/iElement";
import { IElementList } from "../interfaces/iElementList";

type ToolbarProps = {
    elementsManager: ElementsManager;
    activeLayer: LayerType;
}

const newPath = [
    new Point2D(100,100),
    new Point2D(500,100),
    new Point2D(500,300),
    new Point2D(100,300),
    new Point2D(100,100),
]

export default function Toolbar({elementsManager, activeLayer}: ToolbarProps) {
    return (
        <div className="flex justify-left items-center p-2 bg-gray-200">
            <button className="px-4 py-2 text-lg cursor-pointer bg-blue-600 text-white border border-gray-300 rounded transition duration-300 hover:bg-blue-800"
                onClick={() => { 
                    elementsManager.addFloor(new Floor(newPath,0));
                    elementsManager.draw(activeLayer);
                } }
            >
                Add Floor
            </button>
        </div>
    );
}