import { SlabDirection } from "@/app/enums/SlabDirection";
import { FloorList } from "./floorList";
import { Slab } from "./slab";

export class SlabList {
    elements: Slab[] = [];
    
    draw (ctx: CanvasRenderingContext2D) {
        this.elements.forEach(el => {el.draw(ctx)})
    }

    private generateSlabDirection(dx: number, dy: number): SlabDirection  {
        return dx < dy ? SlabDirection.X : SlabDirection.Y;
    }
    
    parseInput(input: string): void {
        const newSlabs: Slab[] = []; 
        const lines = input.split('\n');

        lines.forEach(line => {
            const [x,y,dx,dy,height] = line.split(' ').map(parseFloat);
            if ([x,y,dx,dy,height].some(isNaN)) return;

            let slabDirection = this.generateSlabDirection(dx, dy);                
            newSlabs.push(new Slab(x, y, dx, dy, height, slabDirection));
        });
        this.elements = newSlabs;
    }

    generateSlabs(floorList: FloorList): void {
        const newSlabs: Slab[] = [];
        this.elements = [];
        floorList.elements.forEach(floor => {
            newSlabs.push(new Slab(
                floor.x,
                floor.y,
                floor.dx,
                floor.dy,
                floor.height,
                this.generateSlabDirection(floor.dx, floor.dy)
            ));
        });
        this.elements = newSlabs;
    }
}
