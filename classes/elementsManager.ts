import { FloorList } from "./floorList";
import { SlabList } from "./slabList";

export enum LayerType {
    FLOORS = 'floorList',
    SLABS = 'slabList'
}

export class ElementsManager {
    activeLayer: LayerType;
    floorList: FloorList;
    slabList: SlabList;

    constructor() {
        this.activeLayer = LayerType.FLOORS;
        this.floorList = new FloorList();
        this.slabList = new SlabList();
    }

    setActiveLayer(layer: LayerType) {
        this.activeLayer = layer;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this[this.activeLayer].draw(ctx);
    }

    parseInput(input: string) {
        //TODO
    }
}