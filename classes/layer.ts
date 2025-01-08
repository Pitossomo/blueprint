import { IElement } from "@/app/interfaces/iElement";
import { IElementList } from "@/app/interfaces/iElementList";

export class Layer {
    label: string;
    helperText: string;
    list: IElementList<IElement>;

    constructor(label: string, helperText: string, list: IElementList<IElement>) {
        this.label = label;
        this.helperText = helperText;
        this.list = list;
    }
}