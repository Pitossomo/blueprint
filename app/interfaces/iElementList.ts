import Level from "@/classes/level";
import IElement from "./iElement";
import BoundingBox from "@/classes/boundingBox";

export default interface IElementList<T extends IElement> {
    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void;
    parseInput(input: string, activeLevel: Level): void;
    getInput(activeLevel: Level): string;
    getElements(): T[];
    getBoundingBox(): BoundingBox | null;
}