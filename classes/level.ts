import { LEVEL_LIST } from "@/app/consts/levelMap";

export default class Level {
    private height: number;
    private name: string; 
    private levelmapIndex: number

    constructor(name:string, height: number, levelmapIndex: number) {
        this.name = name;
        this.height = height;
        this.levelmapIndex = levelmapIndex;
    }

    setHeight(height: number) {
        this.height = height;
    }

    getHeight() { return this.height; }
    getName() { return this.name; }
    getIndex() { return this.levelmapIndex; }
}