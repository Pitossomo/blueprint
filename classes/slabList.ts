import { SlabDirection } from "@/app/enums/SlabDirection";
import { FloorList } from "./floorList";
import { Slab } from "./slab";
import { Level } from "./level";
import { IElementList } from "@/app/interfaces/iElementList";

export class SlabList implements IElementList<Slab> {
    private elements: Slab[] = [];
    
    draw (ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        this.elements.forEach(el => {el.draw(ctx, activeLevel)})
    }

    private generateSlabDirection(dx: number, dy: number): SlabDirection  {
        return dx < dy ? SlabDirection.X : SlabDirection.Y;
    }
    
    parseInput(input: string, activeLevel: Level): void {
        const newSlabs: Slab[] = []; 
        const lines = input.split('\n');

        lines.forEach(line => {
            const [x,y,dx,dy,height,permanentLoad,accidentalLoad] = line.split(' ').map(parseFloat);
            if ([x,y,dx,dy,height].some(isNaN)) return;

            let slabDirection = this.generateSlabDirection(dx, dy);
            const newSlab = new Slab(x, y, dx, dy, activeLevel, height, slabDirection, permanentLoad, accidentalLoad);

            newSlabs.push(newSlab)
        });
        this.elements = newSlabs;
    }

    getInput(activeLevel: Level): string {
        return this.elements.map(el => (el.getLevel() !== activeLevel)
            ? ''
            : `${el.getX()} ${el.getY()} ${el.getDX()} ${el.getDY()} ${el.getHeight()} ${el.getPermanentLoad()} ${el.getAccidentalLoad()}`
        ).join('\n');
    }

    generateSlabs(floorList: FloorList): void {
        const newSlabs: Slab[] = [];
        this.elements = [];
        floorList.elements.forEach(floor => {
            newSlabs.push(new Slab(
                floor.getX(),
                floor.getY(),
                floor.getDX(),
                floor.getDY(),
                floor.getLevel(),
                floor.getHeight(),
                this.generateSlabDirection(floor.getDX(), floor.getDY()),
                0,
                0
            ));
        });
        this.elements = newSlabs;
    }

    getElements(): Slab[] { return this.elements; }    
}
