import { IElement } from "./iElement";

export interface IElementList {
    elements: IElement[]
    draw(ctx: CanvasRenderingContext2D): void;
    add(element: IElement): void;
}