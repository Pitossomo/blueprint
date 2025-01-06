import { RefObject } from "react";
import { LAYERMAP } from "./layerMap";

export class ElementsManager {
    canvasRef: RefObject<HTMLCanvasElement | null>;

    constructor(canvasRef: RefObject<HTMLCanvasElement | null>) {
        this.canvasRef = canvasRef;
    }

    draw(activeLayer: string) {
        const ctx = this.canvasRef.current?.getContext('2d');
        if (ctx) LAYERMAP[activeLayer].list.elements.forEach(el => {el.draw(ctx)});
    }

    parseInput(input: string) {
        //TODO
    }
}