import {ImmArray2D} from "./ImmArray2D";

export class Array2D<T> {

    private readonly array: Array<T>;

    constructor(private readonly width: number, private readonly height: number, fill: T) {
        this.array = Array<T>(width * height).fill(fill);
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }

    public get(x: number, y: number): T {
        return this.array[y * this.width + x];
    }

    public set(x: number, y: number, val: T) {
        this.array[y * this.width + x] = val;
    }

    public inBounds(x: number, y: number): boolean {
        return 0 <= x && x < this.width && 0 <= y && y < this.height;
    }

    public toImmutable(): ImmArray2D<T> {
        return new ImmArray2D(this.width, this.height, this.array);
    }
}
