export class ImmArray2D<T> {

    private readonly array: T[];

    constructor(private readonly width: number, private readonly height: number, arr: T[]) {
        this.array = Array<T>(...arr);
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
}
