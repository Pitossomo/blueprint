import IElementList from "@/app/interfaces/iElementList";
import Beam from "./beam";
import Level from "../level";
import Node from "../node";
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

    parseInput(input: string, activeLevel: Level): void {
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
        return this.elements.map((el: Column) => (el.getLevelStatus(activeLevel) === ColumnStatusInLevel.NOT_PRESENT)
            ? ''
            : `${el.getX()} ${el.getY()} ${el.getTopLevel().getIndex()} ${el.getBaseLevel().getIndex()}}`
        ).join('\n');
    }

    getElements(): Column[] { return this.elements; }

    generateColumns(beams: BeamList): void {
        // TODO
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
}