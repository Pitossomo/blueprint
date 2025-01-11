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
            const [x,y,dx,dy,height,direction] = line.split(' ');
        
            let slabDirection: SlabDirection;
            switch (direction.toUpperCase()) {
                case "X":
                    slabDirection = SlabDirection.X;
                    break;
                case "Y":
                    slabDirection = SlabDirection.Y;
                    break;
                default:
                    slabDirection = this.generateSlabDirection(parseFloat(dx), parseFloat(dy));                
            }
    
            try {
                newSlabs.push(new Slab(
                    parseFloat(x),
                    parseFloat(y),
                    parseFloat(dx),
                    parseFloat(dy),
                    parseFloat(height),
                    slabDirection
                ));
            } catch (e) {}
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
