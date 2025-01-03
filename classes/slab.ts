import { IElement } from "../app/interfaces/iElement";
import { Floor } from "./floor";

export class Slab implements IElement {
    x: number;
    y: number;
    dx: number;
    dy: number;
    floor: Floor;
    
    constructor(x: number, y: number, dx: number, dy: number, floor: Floor) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.floor = floor;
    }
    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeRect(this.x, this.y, this.dx, this.dy);
    }
}