import { Slab } from "./slab";

export class SlabList {
    elements: Slab[] = [];
    
    draw = (ctx: CanvasRenderingContext2D) => {
        this.elements.forEach(el => {el.draw(ctx)})
    }
}
