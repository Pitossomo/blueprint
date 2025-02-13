import IElement from "@/app/interfaces/iElement";
import IElementList from "@/app/interfaces/iElementList";

export default class Layer<T extends IElementList<IElement>> {
    private label: string;
    private helperText: string;
    private list: T;

    constructor(label: string, helperText: string, list: T) {
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