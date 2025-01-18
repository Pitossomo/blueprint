import { Level } from "@/classes/level";

export interface IElement {
    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void;
}