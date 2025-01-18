import { IElementList } from "@/app/interfaces/iElementList";
import { Floor } from "./floor";
import { Level } from "./level";

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
}
