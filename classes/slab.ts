import { IElement } from "./iElement";

export class Slab implements IElement {
    x: number;
    y: number;
    dx: number;
    dy: number;
    
    constructor(x: number, y: number, dx: number, dy: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeRect(this.x, this.y, this.dx, this.dy);
    }
}