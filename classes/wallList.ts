import { Point2D } from "./point2D";
import { Wall } from "./wall";

export class WallList {
    elements: Wall[] = [];
    
    draw = (ctx: CanvasRenderingContext2D) => {
        this.elements.forEach(el => {el.draw(ctx)})
    }

    parseInput(input: string): void {
        const newElements: Wall[] = []; 
        const lines = input.split('\n');
        
        lines.forEach(line => {
            const [x1, y1, x2, y2] = line.split(' ').map(parseFloat);

            try { 
                newElements.push(new Wall(new Point2D(x1, y1), new Point2D(x2, y2)));
            } catch (e) {}
        });

        this.elements = newElements
    }
}
