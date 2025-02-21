import Level from "./level";

export default class Wall {
    private x1: number;
    private x2: number;
    private y1: number;
    private y2: number;
    level: Level;

    constructor(x1: number, y1: number, x2: number, y2: number, level: Level) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.level = level;
    }

    draw(ctx: CanvasRenderingContext2D, activeLevel: Level, isLayerActive: boolean) {
        if (activeLevel !== this.level) return;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = isLayerActive ? 'black' : 'gray';
        ctx.stroke()
    }

    getX1(): number { return this.x1; }
    getX2(): number { return this.x2; }
    getY1(): number { return this.y1; }
    getY2(): number { return this.y2; }
    getLevel(): Level { return this.level; }
    getInput(): string { return `${this.x1} ${this.y1} ${this.x2} ${this.y2}`}
}