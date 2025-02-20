import IElement from "../app/interfaces/iElement"
import Level from "./level";

export default class Floor implements IElement{
    private x: number;
    private y: number;
    private dx: number;
    private dy: number;
    private height: number;
    private level: Level;
    
    constructor(x: number, y: number, dx: number, dy: number, level: Level, height: number = 0) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.level = level;
        this.height = height ;
    }
    
    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        if (activeLevel !== this.level) return;
        
        ctx.beginPath();
        ctx.strokeRect(
            this.x,
            this.y,
            this.dx,
            this.dy
        );
    }

    getX(): number { return this.x; }
    getY(): number { return this.y; }
    getDX(): number { return this.dx; }
    getDY(): number { return this.dy; }
    getHeight(): number { return this.height; }
    getLevel(): Level { return this.level; }
    getInput(): string { return `${this.x} ${this.y} ${this.dx} ${this.dy} ${this.height}` }
}