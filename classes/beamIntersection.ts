import { Beam } from "./beam";
import { Level } from "./level";

const OFFSET = 20;

export class BeamIntersection {
    private underBeam: Beam;
    private overBeam: Beam;
    private x: number;
    private y: number;
    private level: Level;

    constructor (x: number, y: number, underBeam: Beam, overBeam: Beam) {
        this.underBeam = underBeam;
        this.overBeam = overBeam;
        this.x = x;
        this.y = y;
        this.level = underBeam.getLevel();
    }

    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void {

        if (activeLevel !== this.level) return;

        ctx.beginPath();
        ctx.moveTo(this.x - OFFSET, this.y - OFFSET);
        ctx.lineTo(this.x + OFFSET, this.y + OFFSET);
        ctx.stroke();
        ctx.moveTo(this.x - OFFSET, this.y + OFFSET);
        ctx.lineTo(this.x + OFFSET, this.y - OFFSET);
        ctx.stroke();
    }
}