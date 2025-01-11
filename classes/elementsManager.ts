import { RefObject } from "react";
import { LAYERMAP } from "../app/consts/layerMap";
import { SlabList } from "./slabList";
import { FloorList } from "./floorList";

export class ElementsManager {
    canvasRef: RefObject<HTMLCanvasElement | null>;

    constructor(canvasRef: RefObject<HTMLCanvasElement | null>) {
        this.canvasRef = canvasRef;
    }

    draw(activeLayer: string) {
        const canvas = this.canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            LAYERMAP[activeLayer].list.elements.forEach(el => {el.draw(ctx)});
        }
    }

    handleInput(activeLayer: string, input: string) {
        LAYERMAP[activeLayer].list.parseInput(input);
        this.draw(activeLayer);
    }

    generateSlabs(activeLayer: string) {
        (LAYERMAP.SLABS.list as SlabList).generateSlabs(LAYERMAP.FLOORS.list as FloorList);
        this.draw(activeLayer);
    }
}