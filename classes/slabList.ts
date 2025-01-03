import { Slab } from "./slab";

export class SlabList {
    elements: Slab[] = [];
    
    draw = (ctx: CanvasRenderingContext2D) => {
        this.elements.forEach(el => {el.draw(ctx)})
    }

    add(newSlab: Slab) {
        this.elements.push(newSlab);
        this.elements.sort((a, b) => a.x - b.x || a.y - a.y)
    }
}
