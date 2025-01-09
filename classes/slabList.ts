import { SlabDirection } from "@/app/enums/SlabDirection";
import { FloorList } from "./floorList";
import { Slab } from "./slab";

export class SlabList {
    elements: Slab[] = [];
    
    draw (ctx: CanvasRenderingContext2D) {
        this.elements.forEach(el => {el.draw(ctx)})
    }

    add(newSlab: Slab) {
        this.elements.push(newSlab);
        this.elements.sort((a, b) => a.x - b.x || a.y - a.y)
    }

    private generateSlabDirection(dx: number, dy: number): SlabDirection  {
        return dx < dy ? SlabDirection.X : SlabDirection.Y;
    }
    
    parseInput(input: string): void {
        const [x,y,dx,dy,height,direction] = input.split(',');
        
        let slabDirection: SlabDirection;
        switch (direction.toUpperCase()) {
            case "X":
                slabDirection = SlabDirection.X;
                break;
            case "Y":
                slabDirection = SlabDirection.Y;
                break;
            default:
                slabDirection = this.generateSlabDirection(parseInt(dx), parseInt(dy));                
        }

        try {
            this.add(new Slab(
                parseInt(x),
                parseInt(y),
                parseInt(dx),
                parseInt(dy),
                parseInt(height),
                slabDirection
            ));
        } catch (e) {}
    }

    generateSlabs(floorList: FloorList): void {
        this.elements = [];
        floorList.elements.forEach(floor => {
            this.add(new Slab(
                floor.x,
                floor.y,
                floor.dx,
                floor.dy,
                floor.height,
                this.generateSlabDirection(floor.dx, floor.dy)
            ));
        });
    }
}
