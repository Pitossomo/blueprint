import IElementList from "@/app/interfaces/iElementList";
import Beam from "./beam";
import Level from "../level";
import WallList from "../wallList";
import FloorList from "../floorList";
import Node from "../node";
import BoundingBox from "../boundingBox";

export default class BeamList implements IElementList<Beam> {
    private elements: Beam[] = [];
    private intersections: Node[] = [];
    
    draw (ctx: CanvasRenderingContext2D, activeLevel: Level): void {
        this.elements.forEach(el => {el.draw(ctx, activeLevel)})
        this.intersections.forEach(el => el.drawIntersection(ctx, activeLevel))
    }

    parseInput(input: string, activeLevel: Level): void {
        const newElements: Beam[] = []; 
        const lines = input.split('\n');
        
        lines.forEach(line => {
            const [x1, y1, x2, y2, heightFromLevel] = line.split(' ').map(parseFloat);
            if ([x1, y1, x2, y2].some(isNaN)) return;
            newElements.push(new Beam(x1, y1, x2, y2, heightFromLevel, activeLevel));
        });
        this.elements = newElements
        this.generateIntersections()
    }

    getInput(activeLevel: Level): string {
        return this.elements.map(el => (el.getLevel() === activeLevel)
            ? `${el.getX1()} ${el.getY1()} ${el.getX2()} ${el.getY2()} ${el.getHeightFromLevel()}`
            : ''
        ).join('\n');
    }

    getElements(): Beam[] { return this.elements; }

    generateBeams(floorList: FloorList, wallList: WallList): void {
        const newBeams: Beam[] = [];
        
        this.elements = [];
        floorList.elements.forEach(floor => {
            const x1 = floor.getX();
            const x2 = floor.getX() + floor.getDX();
            const y1 = floor.getY();
            const y2 = floor.getY() + floor.getDY();
            const level = floor.getLevel();
            const height = floor.getHeight();
            
            let newFloorBeams = [
                new Beam(x1, y1, x1, y2, height, level),
                new Beam(x1, y2, x2, y2, height, level),
                new Beam(x2, y2, x2, y1, height, level),
                new Beam(x2, y1, x1, y1, height, level)
            ];
            newFloorBeams.forEach(newBeam => {
                if (!newBeams.some(b => b.equals(newBeam))) newBeams.push(newBeam);
            })
        });

        wallList.getElements().forEach(wall => {
            const x1 = wall.getX1();
            const x2 = wall.getX2();
            const y1 = wall.getY1();
            const y2 = wall.getY2();
            const level = wall.getLevel();
            
            let newWallBeams = [
                new Beam(x1, y1, x1, y2, 0, level),
                new Beam(x1, y2, x2, y2, 0, level),
                new Beam(x2, y2, x2, y1, 0, level),
                new Beam(x2, y1, x1, y1, 0, level)
            ];
            newWallBeams.forEach(newBeam => {
                if (!newBeams.some(b => b.equals(newBeam))) newBeams.push(newBeam);
            })
        });

        this.elements = newBeams;
        this.generateIntersections();
    }

    generateIntersections() {
        const intersections: Node[] = []
        this.elements.forEach((beam, i) => {
            this.elements.slice(i+1)?.forEach(otherBeam => {
                const intersection = beam.getIntersection(otherBeam)
                if (intersection) intersections.push(intersection)
            })
        })
        intersections.sort((a, b) => (
            a.getY() - b.getY()
            || a.getX() - b.getX()
            || a.getLevel().getHeight() - b.getLevel().getHeight()
        ))
        this.intersections = intersections;
    }

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

    getIntersections(): Node[] {
        return this.intersections;
    }
}