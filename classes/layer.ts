import IElement from "@/app/interfaces/iElement";
import IElementList from "@/app/interfaces/iElementList";
import Level from "./level";

export default class Layer<T extends IElementList<IElement>> {
    private label: string;
    private helperText: string;
    private list: T;
    private visibility: boolean;

    constructor(label: string, helperText: string, list: T) {
        this.label = label;
        this.helperText = helperText;
        this.list = list;
        this.visibility = false;
    }

    setLabel(label: string) { this.label = label; }
    getLabel() { return this.label; }
    setHelperText(helperText: string) { this.helperText = helperText; }
    getHelperText() { return this.helperText; }
    getList() { return this.list; }
    setVisibility(newVisibility: boolean) { this.visibility = newVisibility }
    isVisible() { return this.visibility }
    draw(ctx: CanvasRenderingContext2D, activeLevel: Level, activeLayer: Layer<IElementList<IElement>>) {
        const isLayerActive = (this === activeLayer) 
        this.list.draw(ctx, activeLevel, isLayerActive)
    }
    parseInput(input: string, activeLevel: Level) { this.list.parseInput(input, activeLevel) };
    getInput(activeLevel: Level) { return this.list.getInput(activeLevel) };
    getElements() { return this.list.getElements() };
    getBoundingBox() { return this.list.getBoundingBox() };
    copyToOtherLevels(activeLevel: Level) {this.list.copyToOtherLevels(activeLevel) }    
}