import { IElementList } from "@/app/interfaces/iElementList";
import { Level } from "./level";
import { Wall } from "./wall";

export class WallList implements IElementList<Wall> {
    private elements: Wall[] = [];
    
    draw = (ctx: CanvasRenderingContext2D) => {
        this.elements.forEach(el => {el.draw(ctx)})
    }

    parseInput(input: string, activeLevel: Level): void {
        const newElements: Wall[] = []; 
        const lines = input.split('\n');
        
        lines.forEach(line => {
            const [x1, y1, x2, y2] = line.split(' ').map(parseFloat);
            if ([x1, y1, x2, y2].some(isNaN)) return;
            newElements.push(new Wall(x1, y1, x2, y2, activeLevel));
        });
        this.elements = newElements
    }

    getInput(activeLevel: Level): string {
        return this.elements.map(el => (el.getLevel() === activeLevel)
            ? `${el.getX1()} ${el.getY1()} ${el.getX2()} ${el.getY2()}`
            : ''
        ).join('\n');
    }

    getElements(): Wall[] { return this.elements; }
}
