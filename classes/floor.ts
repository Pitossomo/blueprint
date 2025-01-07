import { IElement } from "../app/interfaces/iElement"

export class Floor implements IElement{
    x: number;
    y: number;
    dx: number;
    dy: number;
    height: number;
    
    constructor(x: number, y: number, dx: number, dy: number, height: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.height = height;
    }
    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeRect(
            this.x,
            this.y,
            this.dx,
            this.dy
        );
    }
}