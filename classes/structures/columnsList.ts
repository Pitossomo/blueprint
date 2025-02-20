import IElementList from "@/app/interfaces/iElementList";
import Level from "../level";
import BoundingBox from "../boundingBox";
import Column from "./column";
import { LEVEL_LIST } from "@/app/consts/levelMap";
import { ColumnStatusInLevel } from "@/app/enums/ColumnStatusInLevel";
import BeamList from "./beamList";

export default class ColumnList implements IElementList<Column> {
    private elements: Column[] = [];
    
    draw (ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        this.elements.forEach(el => {el.draw(ctx, activeLevel)})
    }

    parseInput(input: string): void {
        const newElements: Column[] = []; 
        const lines = input.split('\n');
        
        lines.forEach(line => {
            const [x, y, baseLevelIndex, topLevelIndex] = line.split(' ').map(parseFloat);
            if ([x, y, baseLevelIndex, topLevelIndex].some(isNaN)) return;
            newElements.push(new Column(x, y, LEVEL_LIST[baseLevelIndex], LEVEL_LIST[topLevelIndex]));
        });
        this.elements = newElements
    }

    getInput(activeLevel: Level): string {
        const elements: string[] = []
        this.elements.forEach(el => {
            if (el.getLevelStatus(activeLevel) === ColumnStatusInLevel.NOT_PRESENT) return; 
            elements.push(el.getInput())
        })
        return elements.join('\n');
    }

    getElements(): Column[] { return this.elements; }

    generateColumns(beams: BeamList): void {
        const intersections = beams.getIntersections()
        const columns: Column[] = []

        let lastX = -1;
        let lastY = -1;

        intersections.forEach(node => {
            const [nodeX, nodeY, nodeLevel] = [node.getX(), node.getY(), node.getLevel()]
            if (columns.length === 0 || lastX !== nodeX || lastY !== nodeY) { 
                lastX = nodeX
                lastY = nodeY
                columns.push(new Column(nodeX, nodeY, nodeLevel, LEVEL_LIST[0]))
                return
            }
            columns[columns.length - 1].setTopLevel(nodeLevel)
        })

        this.elements = columns
    }

    getBoundingBox(): BoundingBox | null {
        if (this.elements.length === 0) return null;

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        this.elements.forEach(column => {
            minX = Math.min(minX, column.getX1());
            minY = Math.min(minY, column.getY1());
            maxX = Math.max(maxX, column.getX2());
            maxY = Math.max(maxY, column.getY2());
        });

        return new BoundingBox(minX, minY, maxX, maxY);
    }

    copyToOtherLevels(activeLevel: Level): void { return }
}