import { IElement } from "@/app/interfaces/iElement";
import { IElementList } from "@/app/interfaces/iElementList";

export class Layer {
    private label: string;
    private helperText: string;
    private list: IElementList<IElement>;

    constructor(label: string, helperText: string, list: IElementList<IElement>) {
        this.label = label;
        this.helperText = helperText;
        this.list = list;
    }

    setLabel(label: string) { this.label = label; }
    getLabel() { return this.label; }
    setHelperText(helperText: string) { this.helperText = helperText; }
    getHelperText() { return this.helperText; }
    getList() { return this.list; }
}