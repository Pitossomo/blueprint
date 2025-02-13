const MARGIN_OFFSET = 0.05;

export default class BoundingBox {
    private minX: number;
    private minY: number;
    private maxX: number;
    private maxY: number;

    constructor(minX: number, minY: number, maxX: number, maxY: number) {
        const dx = maxX - minX;
        const dy = maxY - minY;

        this.minX = minX - MARGIN_OFFSET*dx;
        this.minY = minY - MARGIN_OFFSET*dy;
        this.maxX = maxX + MARGIN_OFFSET*dx;
        this.maxY = maxY + MARGIN_OFFSET*dy;
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