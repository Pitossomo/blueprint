import IElementList from "@/app/interfaces/iElementList";
import Level from "./level";
import Wall from "./wall";
import BoundingBox from "./boundingBox";

export default class WallList implements IElementList<Wall> {
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

    getBoundingBox(): BoundingBox | null {
        if (this.elements.length === 0) return null;

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        this.elements.forEach(beam => {
            minX = Math.min(minX, beam.getX1());
            minY = Math.min(minY, beam.getY1());
            maxX = Math.max(maxX, beam.getX2());
            maxY = Math.max(maxY, beam.getY2());
        });

        return new BoundingBox(minX, minY, maxX, maxY);
    }

}
