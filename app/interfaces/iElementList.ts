import { IElement } from "./iElement";

export interface IElementList<T extends IElement> {
    elements: T[]
    draw(ctx: CanvasRenderingContext2D): void;
    parseInput(input: string): void;
}