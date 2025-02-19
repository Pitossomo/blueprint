import IElement from "@/app/interfaces/iElement";
import Level from "../level";
import Node from '../node'

export default class Beam implements IElement {
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

    overlaps(other:Beam) {
        const orientation = (p: Node, q: Node, r: Node): number => {
            const val = (q.getY() - p.getY()) * (r.getX() - q.getX()) - (q.getX() - p.getX()) * (r.getY() - q.getY());
            if (val === 0) return 0; // collinear
            return (val > 0) ? 1 : 2; // clock or counterclock wise
        }

        const onSegment = (p: Node, q: Node, r: Node): boolean => {
            if (q.getX() <= Math.max(p.getX(), r.getX()) && q.getX() >= Math.min(p.getX(), r.getX()) &&
            q.getY() <= Math.max(p.getY(), r.getY()) && q.getY() >= Math.min(p.getY(), r.getY())) {
            return true;
            }
            return false;
        }

        const doIntersect = (p1: Node, q1: Node, p2: Node, q2: Node): boolean => {
            const o1 = orientation(p1, q1, p2);
            const o2 = orientation(p1, q1, q2);
            const o3 = orientation(p2, q2, p1);
            const o4 = orientation(p2, q2, q1);

            if (o1 !== o2 && o3 !== o4) return true;

            if (o1 === 0 && onSegment(p1, p2, q1)) return true;
            if (o2 === 0 && onSegment(p1, q2, q1)) return true;
            if (o3 === 0 && onSegment(p2, p1, q2)) return true;
            if (o4 === 0 && onSegment(p2, q1, q2)) return true;

            return false;
        }

        const intersect = doIntersect(this.nodes[0], this.nodes[1], other.nodes[0], other.nodes[1]);
        return intersect
    }
    
    getIntersection(otherBeam:Beam): Node | void {
        if (this.level !== otherBeam.level) return;

        // beam equation: y = y0 + mx 
        const m = this.getLinearCoefficient()
        const x01 = this.getX0()
        const y01 = this.getY0()
        const n = otherBeam.getLinearCoefficient();
        
        if (Math.abs(m) === Math.abs(n)) return;
        const x02 = otherBeam.getX0();
        const y02 = otherBeam.getY0();

        let x:number, y:number;
        if (m === Infinity || m === -Infinity) {
            [x, y] = [x01, y02 + x01*n]
        } else if (n === Infinity || n === -Infinity) {
            [x, y] = [x02, y01 + x02*m]
        } else {
            x = (y01 - y02)/(n - m);
            y = y01 + m*x;    
        }
        
        if (this.contains(x,y) && otherBeam.contains(x,y)) return new Node(
            x,
            y,
            Math.min(this.heightFromLevel, otherBeam.heightFromLevel),
            this.level
        ) 
    }

    contains(x: number, y: number): boolean {
        const TOLERANCE = 0.0001;
        const m = this.getLinearCoefficient();
        const yRef = this.getY0() + m*x
        if (Math.abs(yRef - y) > TOLERANCE) return false;

        if ((Math.abs(m) === Infinity) && (y < this.y1 || y > this.y2)) return false
        if (x < this.x1 || x > this.x2) return false
        
        return true
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