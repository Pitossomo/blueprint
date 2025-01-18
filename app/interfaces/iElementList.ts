import { Level } from "@/classes/level";
import { IElement } from "./iElement";

export interface IElementList<T extends IElement> {
    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void;
    parseInput(input: string, activeLevel: Level): void;
    getInput(activeLevel: Level): string;
    getElements(): T[];
}