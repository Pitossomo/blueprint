import { Floor } from "./floor";
import { IElement } from "./iElement";
import { Point2D } from "./point2D";
import { Slab } from "./slab";

export enum LayerType {
    FLOORS = 'floors',
    SLABS = 'slabs'
}

export class ElementsManager {
    activeLayer: LayerType;
    floors: Floor[];
    slabs: Slab[];

    static readonly LAYER_TO_CLASS_MAP = {
        [LayerType.FLOORS]: Floor,
        [LayerType.SLABS]: Slab
    }    

    constructor() {
        this.activeLayer = LayerType.FLOORS;
        this.floors = [new Floor([new Point2D(200,200), new Point2D(300,300)])];
        this.slabs = [new Slab(100,100,100,100)];
    }

    setActiveLayer(layer: LayerType) {
        this.activeLayer = layer;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this[this.activeLayer].forEach(element => {element.draw(ctx)})
    }

    parseInput(input: string) {
        //TODO
    }
}