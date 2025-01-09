import { SlabDirection } from "@/app/enums/SlabDirection";
import { IElement } from "../app/interfaces/iElement";

export class Slab implements IElement {
    x: number;
    y: number;
    dx: number;
    dy: number;
    height: number;
    direction: SlabDirection;
    
    constructor(x: number, y: number, dx: number, dy: number, height: number, slabDirection: SlabDirection) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.height = height;
        this.direction = slabDirection;
    }
    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeRect(this.x, this.y, this.dx, this.dy);
        const [xOffset, yOffset] = this.direction === SlabDirection.X 
            ? [0, this.dx / 4]
            : [this.dy / 4, 0];
        const [startX, startY] = [this.x + this.dx / 2 - xOffset, this.y + this.dy / 2 - yOffset];
        const [endX, endY] = [this.x + this.dx / 2 + xOffset, this.y + this.dy / 2 + yOffset];
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
}