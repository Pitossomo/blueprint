import { Floor } from "./floor";

export class FloorList {
    elements: Floor[] = [];
    
    draw(ctx: CanvasRenderingContext2D) {
        this.elements.forEach(el => {el.draw(ctx)})
    }

    add(newFloor: Floor) {
        this.elements.push(newFloor);
        this.elements.sort((a,b) => a.height - b.height)
    }
}
