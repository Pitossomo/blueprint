import { RefObject } from "react";
import { FloorList } from "./floorList";
import { SlabList } from "./slabList";
import { Floor } from "./floor";

export enum LayerType {
    FLOORS = 'floorList',
    SLABS = 'slabList'
}

export class ElementsManager {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    floorList: FloorList;
    slabList: SlabList;

    constructor(canvasRef: RefObject<HTMLCanvasElement | null>) {
        this.canvasRef = canvasRef;
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

    addFloor(floor: Floor) {
        this.floorList.add(floor);
    }

    draw(activeLayer: LayerType) {
        const ctx = this.canvasRef.current?.getContext('2d');
        if (ctx) this[activeLayer].draw(ctx);
    }

    parseInput(input: string) {
        //TODO
    }
}