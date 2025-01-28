import { IElement } from "@/app/interfaces/iElement";
import { Level } from "./level";
import { Node } from './node'

export class Beam implements IElement {
    private x1: number;
    private y1: number;
    private x2: number;
    private y2: number;
    private level: Level;
    private heightFromLevel: any;
    private nodes: Node[];
    
    constructor(x1: number, y1: number, x2: number, y2: number, heightFromLevel: number, level: Level) {
        if (x1 === x2) {
            if (y1 === y2) throw Error;
            else [this.x1,this.y1,this.x2,this.y2] = [x1, Math.min(y1,y2), x2, Math.max(y1,y2)]
        } else {
            this.x1 = Math.min(x1,x2);
            [this.y1,this.x2,this.y2] = (x1 === this.x1) ? [y1,x2,y2] : [y2,x1,y1];
        }
            this.level = level;
            this.heightFromLevel = heightFromLevel;
            this.nodes = [
                new Node(this.x1, this.y1, this.heightFromLevel, this.level),
                 new Node(this.x2, this.y2, this.heightFromLevel, this.level)
            ]
    }

    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        if (activeLevel !== this.level) return;

        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }

    equals(other: Beam): boolean {
        return (
            this.x1 === other.x1 &&
            this.y1 === other.y1 &&
            this.x2 === other.x2 &&
            this.y2 === other.y2 &&
            this.level === other.level &&
            this.heightFromLevel === other.heightFromLevel
        );
    }

    addNode(newNode: Node) {
        this.nodes.push(newNode)
        this.nodes.sort((a,b) => {
            return (
                a.getX() - b.getX()
                || a.getY() - b.getY()
            )
        })
    }

    getX1(): number { return this.x1; }
    getX2(): number { return this.x2; }
    getY1(): number { return this.y1; }
    getY2(): number { return this.y2; }
    getLinearCoefficient(): number { return (this.y2 - this.y1)/(this.x2 - this.x1) }
    getX0(): number { return this.x1 - this.y1/this.getLinearCoefficient() }
    getY0(): number { return this.y1 - this.getLinearCoefficient()*this.x1}
    getLevel(): Level { return this.level; }
    getHeightFromLevel(): number { return this.heightFromLevel; }
    getNodes(): Node[] { return this.nodes }
}