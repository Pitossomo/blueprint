import { IElementList } from "@/app/interfaces/iElementList";
import { Floor } from "./floor";
import { Level } from "./level";
import { BoundingBox } from "./boundingBox";

export class FloorList implements IElementList<Floor> {
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
        return this.elements.map(el => (el.getLevel() === activeLevel)
            ? `${el.getX()} ${el.getY()} ${el.getDX()} ${el.getDY()} ${el.getHeight()}`
            : ''
        ).join('\n');
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
}
