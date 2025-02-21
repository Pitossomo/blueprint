import IElementList from "@/app/interfaces/iElementList";
import Level from "./level";
import Wall from "./wall";
import BoundingBox from "./boundingBox";
import { LEVEL_LIST } from "@/app/consts/levelMap";

export default class WallList implements IElementList<Wall> {
    private elements: Wall[] = [];
    
    draw = (ctx: CanvasRenderingContext2D, activeLevel: Level, isLayerActive: boolean) => {
        this.elements.forEach(el => {el.draw(ctx, activeLevel, isLayerActive)})
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
        const elements: string[] = []
        this.elements.forEach(el => {
            if (el.getLevel() !== activeLevel) return; 
            elements.push(el.getInput())
        })
        return elements.join('\n');
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

    copyToOtherLevels(activeLevel: Level): void {
        const elements: Wall[] = []
        this.elements.forEach(element => {
            if (element.getLevel() !== activeLevel) return
            
            LEVEL_LIST.forEach(level => { elements.push(
                new Wall(element.getX1(),element.getY1(),element.getX2(),element.getY2(),level)
            )})
        })
        this.elements = elements
    }

}
