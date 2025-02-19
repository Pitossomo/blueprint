import ElementsManager from "@/classes/elementsManager";
import ToolbarButton from "./toolbarButton";
import { LAYER_MAP } from "../consts/layerMap";
import Layer from "@/classes/layer";
import Level from "@/classes/level";
import IElementList from "../interfaces/iElementList";
import IElement from "../interfaces/iElement";

type ToolbarProps = { 
    elementsManager: ElementsManager,
    activeLayer: Layer<IElementList<IElement>>,
    activeLevel: Level,
    redraw: () => void
}

export default function Toolbar ({elementsManager, activeLayer, activeLevel, redraw}: ToolbarProps) {

    function generateSlabs () { 
            elementsManager.generateSlabs();
            if (activeLayer === LAYER_MAP.slabs) {
                elementsManager.draw(activeLayer, activeLevel);
            }
        }
    
        function generateBeams(): void {
            elementsManager.generateBeams();
            if (activeLayer === LAYER_MAP.beams) {
                elementsManager.draw(activeLayer, activeLevel);
            }
        }
    
        function generateColumns(): void {
            elementsManager.generateColumns();
            if (activeLayer === LAYER_MAP.beams) {
                elementsManager.draw(activeLayer, activeLevel);
            }
        }

        function copyElements(): void {
            if (activeLayer === LAYER_MAP.columns) return

            // TODO
        }

    return (
        <nav className="flex justify-left items-center p-2 bg-gray-200">
            <ToolbarButton onClick={redraw}> Atualizar desenho </ToolbarButton>
            <ToolbarButton onClick={generateSlabs}> Gerar lajes </ToolbarButton>
            <ToolbarButton onClick={generateBeams}> Gerar vigas </ToolbarButton>
            <ToolbarButton onClick={generateColumns}> Gerar pilares </ToolbarButton>
            { 
                activeLayer === LAYER_MAP.columns 
                && <ToolbarButton onClick={copyElements}> Gerar pilares </ToolbarButton>
            }
        </nav>
    )
}