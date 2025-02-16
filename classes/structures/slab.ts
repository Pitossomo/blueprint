import { SlabDirection } from "@/app/enums/SlabDirection";
import IElement from "@/app/interfaces/iElement";
import Level from "../level";
import SuperficialLoad from "../superficialLoad";

export default class Slab implements IElement {
    private x: number;
    private y: number;
    private dx: number;
    private dy: number;
    private height: number;
    private direction: SlabDirection;
    private level: Level;
    private load: SuperficialLoad;
    
    constructor(x: number, y: number, dx: number, dy: number, level: Level, height: number, slabDirection: SlabDirection, permanentLoad: number, accidentalLoad: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.height = height;
        this.direction = slabDirection;
        this.level = level;
        this.load = new SuperficialLoad(permanentLoad || 0, accidentalLoad || 0)
    }
    
    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        if (activeLevel !== this.level) return;
        
        ctx.beginPath();
        ctx.strokeRect(this.x, this.y, this.dx, this.dy);
        const [xOffset, yOffset] = this.direction === SlabDirection.X 
            ? [this.dy / 4, 0]
            : [0, this.dx / 4];
        const [startX, startY] = [this.x + this.dx / 2 - xOffset, this.y + this.dy / 2 - yOffset];
        const [endX, endY] = [this.x + this.dx / 2 + xOffset, this.y + this.dy / 2 + yOffset];
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Set the text properties
        ctx.font = "20px Arial"; // Adjust font size and type as needed
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (!this.load) return;

        // Define the text to be drawn
        const text = this.load.permanent+"\n"+this.load.accidental;

        // Calculate text positions
        const lines = text.split('\n');
        const lineHeight = 24; // Adjust line height as needed
        const centerY = this.y + this.dy / 2 - (lineHeight * (lines.length - 1)) / 2;

        // Draw each line of text
        lines.forEach((line, index) => {
            ctx.fillText(line, this.x + this.dx / 2, centerY + index * lineHeight);
        });
    }

    getX(): number { return this.x; }
    getY(): number { return this.y; }
    getDX(): number { return this.dx; }
    getDY(): number { return this.dy; }
    getHeight(): number { return this.height; }
    getLevel(): Level { return this.level; }
    getDirection(): SlabDirection { return this.direction; }
    getPermanentLoad(): number { return this.load.getPermanentLoad() }
    getAccidentalLoad(): number { return this.load.getAccidentalLoad() }
    setLoad(load: SuperficialLoad) { this.load = load } 
}