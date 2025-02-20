import Level from "@/classes/level";

export default interface IElement {
    draw(ctx: CanvasRenderingContext2D, activeLevel: Level): void;
    getInput(): string;
}