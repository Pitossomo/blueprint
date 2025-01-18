import { RefObject } from "react";
import { SlabList } from "./slabList";
import { FloorList } from "./floorList";
import { Level } from "./level";
import { Layer } from "./layer";
import { LAYER_MAP } from "@/app/consts/layerMap";

export class ElementsManager {
    private canvasRef: RefObject<HTMLCanvasElement | null>;

    constructor(canvasRef: RefObject<HTMLCanvasElement | null>) {
        this.canvasRef = canvasRef;
    }

    draw(activeLayer: Layer, activeLevel: Level) {
        const canvas = this.canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            activeLayer.getList().getElements().forEach(el => {el.draw(ctx, activeLevel)});
        }
    }

    handleInput(input: string, activeLayer: Layer, activeLevel: Level) {
        activeLayer.getList().parseInput(input, activeLevel);
        this.draw(activeLayer, activeLevel);
    }

    getInput(activeLayer: Layer, activeLevel: Level) {
        const input = activeLayer.getList().getInput(activeLevel); 
        return input;
    }

    generateSlabs() {
        (LAYER_MAP.SLABS.getList() as SlabList).generateSlabs(LAYER_MAP.FLOORS.getList() as FloorList);
    }
}