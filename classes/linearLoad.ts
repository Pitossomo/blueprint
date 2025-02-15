export default class LinearLoad {
    private value: number;

    constructor(value: number) {
        this.value = value || 0;
    }

    getValue(): number { return this.value }
}