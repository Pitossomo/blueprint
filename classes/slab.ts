import { SlabDirection } from "@/app/enums/SlabDirection";
import { IElement } from "../app/interfaces/iElement";
import { Level } from "./level";
import SuperficialLoad from "./superficialLoad";

export class Slab implements IElement {
    private x: number;
    private y: number;
    private dx: number;
    private dy: number;
    private height: number;
    private direction: SlabDirection;
    private level: Level;
    private load?: SuperficialLoad;
    
    constructor(x: number, y: number, dx: number, dy: number, level: Level, height: number, slabDirection: SlabDirection) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.height = height;
        this.direction = slabDirection;
        this.level = level;
    }
    
    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        if (activeLevel !== this.level) return;

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

    getX(): number { return this.x; }
    getY(): number { return this.y; }
    getDX(): number { return this.dx; }
    getDY(): number { return this.dy; }
    getHeight(): number { return this.height; }
    getLevel(): Level { return this.level; }
    getDirection(): SlabDirection { return this.direction; }
    getLoad(): SuperficialLoad | undefined { return this.load }
}