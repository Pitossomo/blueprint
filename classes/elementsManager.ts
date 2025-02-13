import { RefObject } from "react";
import Level from "./level";
import Layer from "./layer";
import { LAYER_MAP } from "@/app/consts/layerMap";
import IElementList from "@/app/interfaces/iElementList";
import IElement from "@/app/interfaces/iElement";

export default class ElementsManager {
    private canvasRef: RefObject<HTMLCanvasElement | null>;

    constructor(canvasRef: RefObject<HTMLCanvasElement | null>) {
        this.canvasRef = canvasRef;
    }

    draw(activeLayer: Layer<IElementList<IElement>>, activeLevel: Level) {
        const canvas = this.canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return
       
        // Get bounding box
        const boundingBox = activeLayer.getList().getBoundingBox()

        // Transform
        ctx.reset()
        if (!boundingBox) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Calculate scale factor to fit bounding box within canvas
        
        const scaleX = canvasWidth / boundingBox.getWidth();
        const scaleY = canvasHeight / boundingBox.getHeight();
        const scale = Math.min(scaleX, scaleY); // Choose the smaller scale factor

        const centerX = (canvasWidth - boundingBox.getWidth() * scale) / 2 - boundingBox.getX() * scale;
        const centerY = (canvasHeight - boundingBox.getHeight() * scale) / 2 - boundingBox.getY() * scale;

        ctx.setTransform(scale, 0, 0, scale, centerX, centerY);
        activeLayer.getList().draw(ctx, activeLevel);
    }

    handleInput(input: string, activeLayer: Layer<IElementList<IElement>>, activeLevel: Level) {
        activeLayer.getList().parseInput(input, activeLevel);
        this.draw(activeLayer, activeLevel);
    }

    getInput(activeLayer: Layer<IElementList<IElement>>, activeLevel: Level) {
        const input = activeLayer.getList().getInput(activeLevel); 
        return input;
    }

    generateSlabs() {
        (LAYER_MAP.slabs.getList()).generateSlabs(LAYER_MAP.floors.getList());
    }

    generateBeams() {
        (LAYER_MAP.beams.getList()).generateBeams(LAYER_MAP.floors.getList(), LAYER_MAP.walls.getList());
    }
}