import { LEVEL_LIST } from "@/app/consts/levelMap";

export default class Level {
    private height: number;
    private name: string; 

    constructor(name:string, height: number) {
        this.name = name;
        this.height = height;
    }

    setHeight(height: number) {
        this.height = height;
    }

    getHeight() { return this.height; }
    getName() { return this.name; }
    getIndex() {
        for (let i = 0; i < LEVEL_LIST.length; i++) {
            if (LEVEL_LIST[i] === this) return i;
        }
        return -1;
    }
}