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
}