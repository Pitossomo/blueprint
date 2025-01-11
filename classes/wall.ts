import { Point2D } from "./point2D";

export class Wall {
    start: Point2D;
    end: Point2D;

    constructor(start: Point2D, end: Point2D) {
        [this.start, this.end] = start.x < end.x ? [start, end] : [end, start];
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
    }
}