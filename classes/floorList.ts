import { IElementList } from "@/app/interfaces/iElementList";
import { Floor } from "./floor";

export class FloorList implements IElementList<Floor> {
    elements: Floor[];
    
    constructor() {
        this.elements = [];
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.elements.forEach(el => {el.draw(ctx)})
    }

    parseInput(input: string): void {
        const newElements: Floor[] = []; 
        const lines = input.split('\n');
        
        lines.forEach(line => {
            const [x,y,dx,dy,height] = line.split(' ').map(parseFloat);

            try {
                newElements.push(new Floor(x,y,dx,dy,height));
            } catch (e) {}
        });

        this.elements = newElements
    }
}
