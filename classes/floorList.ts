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

    add(newFloor: Floor) {
        this.elements.push(newFloor);
        this.elements.sort((a,b) => a.height - b.height)
    }

    parseInput(input: string): void {
        const [x,y,dx,dy,height] = input.split(',').map(parseFloat);

        try {
          this.add(new Floor(x,y,dx,dy,height));
        } catch (e) {
        }
    }
}
