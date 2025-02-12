export class BoundingBox {
    private minX: number;
    private minY: number;
    private maxX: number;
    private maxY: number;

    constructor(minX: number, minY: number, maxX: number, maxY: number) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    contains(x: number, y: number): boolean {
        return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
    }

    intersects(other: BoundingBox): boolean {
        return this.minX < other.maxX && this.maxX > other.minX &&
               this.minY < other.maxY && this.maxY > other.minY;
    }

    expand(amount: number): void {
        this.minX -= amount;
        this.minY -= amount;
        this.maxX += amount;
        this.maxY += amount;
    }

    toString(): string {
        return `BoundingBox(${this.minX}, ${this.minY}, ${this.maxX}, ${this.maxY})`;
    }

    getX(): number { return this.minX }
    getY(): number { return this.minY }
    getWidth(): number { return this.maxX - this.minX }
    getHeight(): number { return this.maxY - this.minY }
}

export default BoundingBox;