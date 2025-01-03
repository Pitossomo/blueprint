import { Floor } from "./floor";

export class FloorList {
    elements: Floor[] = [];
    
    draw = (ctx: CanvasRenderingContext2D) => {
        this.elements.forEach(el => {el.draw(ctx)})
    }
}
