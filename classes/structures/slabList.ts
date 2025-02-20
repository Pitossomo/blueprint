import { SlabDirection } from "@/app/enums/SlabDirection";
import FloorList from "../floorList";
import Slab from "./slab";
import Level from "../level";
import IElementList from "@/app/interfaces/iElementList";
import BoundingBox from "../boundingBox";
import { LEVEL_LIST } from "@/app/consts/levelMap";

export default class SlabList implements IElementList<Slab> {
    private elements: Slab[] = [];
    
    draw (ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        this.elements.forEach(el => {el.draw(ctx, activeLevel)})
    }

    private generateSlabDirection(dx: number, dy: number): SlabDirection  {
        return dx < dy ? SlabDirection.X : SlabDirection.Y;
    }
    
    parseInput(input: string, activeLevel: Level): void {
        const newSlabs: Slab[] = []; 
        const lines = input.split('\n');

        lines.forEach(line => {
            const [x,y,dx,dy,height,permanentLoad,accidentalLoad] = line.split(' ').map(parseFloat);
            if ([x,y,dx,dy,height].some(isNaN)) return;

            let slabDirection = this.generateSlabDirection(dx, dy);
            const newSlab = new Slab(x, y, dx, dy, activeLevel, height, slabDirection, permanentLoad, accidentalLoad);

            newSlabs.push(newSlab)
        });
        this.elements = newSlabs;
    }

    getInput(activeLevel: Level): string {
        const elements: string[] = []
        this.elements.forEach(el => {
            if (el.getLevel() !== activeLevel) return; 
            elements.push(el.getInput())
        })
        return elements.join('\n');
    }

    generateSlabs(floorList: FloorList): void {
        const newSlabs: Slab[] = [];
        this.elements = [];
        floorList.elements.forEach(floor => {
            newSlabs.push(new Slab(
                floor.getX(),
                floor.getY(),
                floor.getDX(),
                floor.getDY(),
                floor.getLevel(),
                floor.getHeight(),
                this.generateSlabDirection(floor.getDX(), floor.getDY()),
                0,
                0
            ));
        });
        this.elements = newSlabs;
    }

    getElements(): Slab[] { return this.elements; }
    getBoundingBox(): BoundingBox | null {
        if (this.elements.length === 0) return null;

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        this.elements.forEach(slab => {
            minX = Math.min(minX, slab.getX());
            minY = Math.min(minY, slab.getY());
            maxX = Math.max(maxX, slab.getX() + slab.getDX());
            maxY = Math.max(maxY, slab.getY() + slab.getDY());
        });

        return new BoundingBox(minX, minY, maxX, maxY);
    }

    copyToOtherLevels(activeLevel: Level): void {
        const elements: Slab[] = []
        this.elements.forEach(element => {
            if (element.getLevel() !== activeLevel) return
            
            LEVEL_LIST.forEach(level => { elements.push(
                new Slab(
                    element.getX(),element.getY(),
                    element.getDX(),element.getDY(),
                    level,element.getHeight(),
                    element.getDirection(),
                    element.getPermanentLoad(),element.getAccidentalLoad()
                )
            )})
        })
        this.elements = elements
    }
    
}
