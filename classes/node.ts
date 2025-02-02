import { Level } from "./level";

export class Node {
    private x: number;
    private y: number;
    private level: Level;
    private height: number;
    
    constructor(x: number, y: number, height: number, level: Level) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.level = level;
    }

    getX() { return this.x }
    getY() { return this.y }
    getLevel() { return this.level }
    getHeight() { return this.height }
    drawIntersection(ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        const OFFSET = 10;
        if (activeLevel !== this.level) return;
        ctx.beginPath();
        ctx.moveTo(this.getX() - OFFSET, this.getY() - OFFSET);
        ctx.lineTo(this.getX() + OFFSET, this.getY() + OFFSET);
        ctx.stroke();
        ctx.moveTo(this.getX() - OFFSET, this.getY() + OFFSET);
        ctx.lineTo(this.getX() + OFFSET, this.getY() - OFFSET);
        ctx.stroke();
    }
}