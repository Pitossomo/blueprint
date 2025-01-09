import { RefObject } from "react";
import { LAYERMAP } from "../app/consts/layerMap";

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
}