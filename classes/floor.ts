import { IElement } from "../app/interfaces/iElement"
import { Point2D } from "./point2D";

export class Floor implements IElement{
    path: Point2D[];
    height: number;
    
    constructor(path: Point2D[], height: number) {
        // For testing purposes
        /*
        let startPoint = new Point2D(100 + height, 100 + height);
        this.path = [
            startPoint,
            new Point2D(100 + height, 200 + height),
            new Point2D(200 + height, 200 + height),
            new Point2D(200 + height, 100 + height),
            startPoint
        ];
        */
        this.path = path;
        this.height = height;
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