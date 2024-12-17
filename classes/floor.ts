import { IElement } from "./iElement"
import { Point2D } from "./point2D";

export class Floor implements IElement{
    path: Point2D[];
    
    constructor(path: Point2D[]) {
        this.path = path;
    }
    
    draw(ctx: CanvasRenderingContext2D) {
        if (this.path.length > 0) {
            ctx.beginPath();
            ctx.moveTo(this.path[0].x, this.path[0].y);
            this.path.forEach((point) => { ctx.lineTo(point.x, point.y); }); 
            ctx.stroke();
        }
    }
}