import IElementList from "@/app/interfaces/iElementList";
import Floor from "./floor";
import Level from "./level";
import BoundingBox from "./boundingBox";
import { LEVEL_LIST } from "@/app/consts/levelMap";

export default class FloorList implements IElementList<Floor> {
    elements: Floor[];
    
    constructor() {
        this.elements = [];
    }

    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        this.elements.forEach(el => {el.draw(ctx, activeLevel)})
    }

    parseInput(input: string, activeLevel: Level): void {
        const newElements: Floor[] = []; 
        const lines = input.split('\n');
        
        lines.forEach(line => {
            const [x,y,dx,dy,height] = line.split(' ').map(parseFloat);
            if ([x,y,dx,dy,height].some(isNaN)) return;
            newElements.push(new Floor(x,y,dx,dy,activeLevel,height));
        });

        this.elements = newElements
    }

    getInput(activeLevel: Level): string {
        const elements: string[] = []
        this.elements.forEach(el => {
            if (el.getLevel() !== activeLevel) return; 
            elements.push(el.getInput())
        })
        return elements.join('\n');
    }

    getElements(): Floor[] { return this.elements; }
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
        const elements: Floor[] = []
        this.elements.forEach(element => {
            if (element.getLevel() !== activeLevel) return
            
            LEVEL_LIST.forEach(level => { elements.push(
                new Floor(element.getX(),element.getY(),element.getDX(),element.getDY(),level,element.getHeight())
            )})
        })
        this.elements = elements
    }
}
