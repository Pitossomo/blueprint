import { Wall } from "./wall";

export class WallList {
    elements: Wall[] = [];
    
    draw = (ctx: CanvasRenderingContext2D) => {
        this.elements.forEach(el => {el.draw(ctx)})
    }

    add(newSlab: Wall) {
        this.elements.push(newSlab);
        this.elements.sort((a, b) => a.start.x - b.start.x || a.end.y - b.end.y)
    }
}
