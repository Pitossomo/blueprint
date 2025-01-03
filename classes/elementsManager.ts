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
        
        // For testing purposes
        /*
        let floor0 = new Floor([],0)
        this.floorList.add(floor0)
        this.floorList.add(new Floor([],10))
        this.floorList.add(new Floor([],20))
        this.slabList.add(new Slab(50,50,300,300,floor0))
        */
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