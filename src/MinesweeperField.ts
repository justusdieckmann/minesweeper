import {ImmArray2D} from "./ImmArray2D";
import {Array2D} from "./Array2D";
import {Random} from "./Random";

export enum MinesweeperCellState {
    HIDDEN,
    REVEALED,
    MARKED
}

const NEIGHBORS = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

export class MinesweeperField {

    private readonly thetry: Array2D<MinesweeperCellState>
    private readonly adjacenymap: Array2D<number>

    private active = true;
    private won = false;

    constructor(private readonly minelocations: ImmArray2D<boolean>) {
        this.thetry = new Array2D<MinesweeperCellState>(minelocations.getWidth(), minelocations.getHeight(), MinesweeperCellState.HIDDEN);
        this.adjacenymap = new Array2D<number>(minelocations.getWidth(), minelocations.getHeight(), 0);
        for (let x = 0; x < minelocations.getWidth(); x++) {
            for (let y = 0;  y < minelocations.getHeight(); y++) {
                if (minelocations.get(x, y)) {
                    for (let [dx, dy] of NEIGHBORS) {
                        const nx = x + dx;
                        const ny = y + dy;
                        if (0 <= nx && nx < minelocations.getWidth() && 0 <= ny && ny < minelocations.getHeight()) {
                            this.adjacenymap.set(nx, ny, this.adjacenymap.get(nx, ny) + 1);
                        }
                    }
                }
            }
        }
    }

    public getWidth(): number {
        return this.minelocations.getWidth();
    }

    public getHeight(): number {
        return this.minelocations.getHeight();
    }

    public get(x: number, y: number): MinesweeperCellState {
        return this.thetry.get(x, y);
    }

    public neighbors(x: number, y: number): number {
        return this.thetry.get(x, y) === MinesweeperCellState.REVEALED ? this.adjacenymap.get(x, y) : null;
    }

    public click(x: number, y: number) {
        if (!this.active || this.thetry.get(x, y) !== MinesweeperCellState.HIDDEN || !this.thetry.inBounds(x, y))
            return;

        this.thetry.set(x, y, MinesweeperCellState.REVEALED);

        if (this.minelocations.get(x, y)) {
            this.active = false;
            // TODO lose!
        }

        console.log("reveal", x, y);

        if (this.neighbors(x, y) === 0) {
            for (let [dx, dy] of NEIGHBORS) {
                this.click(x + dx, y + dy);
            }
        }

        this.checkWin();
    }

    public checkWin() {
        if (this.isWon()) {
            this.active = false;
            this.won = true;
        }
    }

    private isWon(): boolean {
        for (let x = 0; x < this.thetry.getWidth(); x++) {
            for (let y = 0; y < this.thetry.getHeight(); y++) {
                if (!this.minelocations.get(x, y) && this.thetry.get(x, y) != MinesweeperCellState.REVEALED)
                    return false;
            }
        }
        return true;
    }

    public changemark(x: number, y: number) {
        const cellstate = this.thetry.get(x, y);
        if (!this.active || cellstate === MinesweeperCellState.REVEALED) {
            return;
        }
        this.thetry.set(x, y, cellstate === MinesweeperCellState.MARKED ? MinesweeperCellState.HIDDEN : MinesweeperCellState.MARKED);
    }

    public isActive() {
        return this.active;
    }

    public static randomField(width: number, height: number, mines: number): ImmArray2D<boolean> {
        const arr = new Array2D<boolean>(width, height, false);
        for (let i = 0; i < mines; i++) {
            let x = 0, y = 0;
            do {
                x = Random.inRange(0, width - 1);
                y = Random.inRange(0, height - 1);
            } while(arr.get(x, y));
            arr.set(x, y, true);
        }
        return arr.toImmutable();
    }

}
