import { act } from "react";
import { Floor } from "./floor";
import { Slab } from "./slab";

export enum LayerType {
    FLOORS = 'floors',
    SLABS = 'slabs'
}

export class ElementsManager {
    activeLayer: LayerType;
    floors: Floor[];
    slabs: Slab[];

    constructor() {
        this.activeLayer = LayerType.FLOORS;
        this.floors = [];
        this.slabs = [];
    }

    setActiveLayer(layer: LayerType) {
        this.activeLayer = layer;
    }

    draw(ctx: CanvasRenderingContext2D) {
        //TODO
    }

    parseInput(input: string) {
        //TODO
    }
}