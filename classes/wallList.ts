import { Point2D } from "./point2D";
import { Wall } from "./wall";

export class WallList {
    elements: Wall[] = [];
    
    draw = (ctx: CanvasRenderingContext2D) => {
        this.elements.forEach(el => {el.draw(ctx)})
    }

    add(newSlab: Wall) {
        this.elements.push(newSlab);
        this.elements.sort((a, b) => a.start.x - b.start.x || a.end.y - b.end.y)
    }

    parseInput(input: string): void {
        const [x1, y1, x2, y2] = input.split(',').map(parseFloat);

        try {
          this.add(new Wall(new Point2D(x1, y1), new Point2D(x2, y2)));
        } catch (e) {
        }
    }
}
