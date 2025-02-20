import IElement from "@/app/interfaces/iElement";
import Level from "../level";
import { ColumnStatusInLevel } from "@/app/enums/ColumnStatusInLevel";

export default class Column implements IElement {
    private x: number;
    private y: number;
    private baseLevel: Level;
    private topLevel: Level
    private dx:number = 14;
    private dy:number = 30;
    
    constructor(x: number, y: number, topLevel: Level, baseLevel: Level) {
        this.x = x;
        this.y = y;
        this.topLevel = topLevel;
        this.baseLevel = baseLevel;
    }

    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        if (activeLevel.getHeight() < this.baseLevel.getHeight()) return;
        if (activeLevel.getHeight() > this.topLevel.getHeight()) return;

        ctx.beginPath();
        ctx.moveTo(this.getX1(), this.getY1());
        ctx.lineTo(this.getX2(), this.getY1());
        ctx.lineTo(this.getX2(), this.getY2());
        ctx.lineTo(this.getX1(), this.getY2());
        ctx.lineTo(this.getX1(), this.getY1());
        ctx.stroke();
    }

    overlaps(other:Column) {
        if (this.getX2() <= other.getX1()) return false
        if (this.getX1() >= other.getX2()) return false
        if (this.getY2() <= other.getY1()) return false
        if (this.getY1() >= other.getY2()) return false
        if (this.topLevel.getHeight() <= other.topLevel.getHeight()) return false
        if (this.baseLevel.getHeight() >= other.baseLevel.getHeight()) return false

        return true
    }

    getX(): number { return this.x; }
    getY(): number { return this.y; }
    getDX(): number { return this.dx; }
    getDY(): number { return this.dy; }
    getX1(): number { return this.x - this.dx/2; }
    getY1(): number { return this.y - this.dy/2; }
    getX2(): number { return this.x + this.dx/2; }
    getY2(): number { return this.y + this.dy/2; }
    getLevelStatus(level: Level) {
        if (level.getHeight() > this.topLevel.getHeight() || level.getHeight() < this.baseLevel.getHeight())
            return ColumnStatusInLevel.NOT_PRESENT
        if (level === this.baseLevel) return ColumnStatusInLevel.BASE_LEVEL
        if (level === this.topLevel) return ColumnStatusInLevel.TOP_LEVEL
        return ColumnStatusInLevel.MID_LEVEL
    }
    getTopLevel() { return this.topLevel }
    getBaseLevel() { return this.baseLevel }
    setTopLevel(level: Level) {
        this.topLevel = level
    }
    getInput(): string { return `${this.x} ${this.y} ${this.topLevel.getIndex()} ${this.baseLevel.getIndex()}` }
}