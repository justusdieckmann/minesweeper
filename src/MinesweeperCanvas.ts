import {MinesweeperCellState, MinesweeperField} from "./MinesweeperField";
import {ImmArray2D} from "./ImmArray2D";

const PADDING = 0;
export class MinesweeperCanvas {

    private minesweeperfield: MinesweeperField

    constructor(private readonly ctx: CanvasRenderingContext2D, private mineslocations: ImmArray2D<boolean>) {
        this.minesweeperfield = new MinesweeperField(this.mineslocations);
        this.initListeners();
        this.draw();
    }

    private initListeners() {
        this.ctx.canvas.onmousedown = (e) => {
            const cellx = Math.floor(e.offsetX / (this.ctx.canvas.width / this.minesweeperfield.getWidth()))
            const celly = Math.floor(e.offsetY / (this.ctx.canvas.height / this.minesweeperfield.getHeight()))
            if (e.button == 0) {
                this.minesweeperfield.click(cellx, celly);
            } else {
                this.minesweeperfield.changemark(cellx, celly);
            }
            this.draw();
            return true;
        }
        this.ctx.canvas.oncontextmenu = (e) => {
            e.preventDefault();
        }
    }

    public draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        const cellsize = this.ctx.canvas.width / this.minesweeperfield.getWidth();

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (let x = 0; x < this.minesweeperfield.getWidth(); x++) {
            for (let y = 0; y < this.minesweeperfield.getHeight(); y++) {
                const cellstate = this.minesweeperfield.get(x, y);
                if (cellstate === MinesweeperCellState.REVEALED) {
                    this.ctx.fillStyle = '#ccc';
                    this.ctx.fillRect(x * cellsize + PADDING, y * cellsize + PADDING, cellsize - 2 * PADDING, cellsize - 2 * PADDING);
                    this.ctx.fillStyle = '#000';
                    if (!this.mineslocations.get(x, y)) {
                        this.ctx.textAlign = "center"
                        this.ctx.textBaseline = "middle"
                        this.ctx.font = "20px monospace";
                        this.ctx.fillText(this.minesweeperfield.neighbors(x, y).toString(),
                            x * cellsize + cellsize / 2,
                            y * cellsize + cellsize / 2
                        )
                    } else {
                        this.ctx.beginPath();
                        this.ctx.arc(x * cellsize  + cellsize / 2,
                            y * cellsize + cellsize / 2, 10, 0, Math.PI * 2);
                        this.ctx.closePath();
                        this.ctx.fill();
                    }
                } else {
                    this.ctx.fillStyle = '#aaa';
                    this.ctx.fillRect(x * cellsize + PADDING, y * cellsize + PADDING, cellsize - 2 * PADDING, cellsize - 2 * PADDING);
                    this.ctx.lineWidth = 4;
                    if (cellstate === MinesweeperCellState.HIDDEN) {
                        this.ctx.fillStyle = '#000';
                        if (!this.minesweeperfield.isActive() && this.mineslocations.get(x, y)) {
                            this.ctx.beginPath();
                            this.ctx.arc(x * cellsize + cellsize / 2,
                                y * cellsize + cellsize / 2, 10, 0, Math.PI * 2);
                            this.ctx.closePath();
                            this.ctx.fill();
                        }
                        this.ctx.strokeStyle = '#777';
                    } else {
                        if (!this.minesweeperfield.isActive() && this.mineslocations.get(x, y)) {
                            this.ctx.strokeStyle = '#3db70a';
                            this.ctx.fillStyle = '#000';
                            this.ctx.beginPath();
                            this.ctx.arc(x * cellsize + cellsize / 2,
                                y * cellsize + cellsize / 2, 10, 0, Math.PI * 2);
                            this.ctx.closePath();
                            this.ctx.fill();
                        } else {
                            this.ctx.strokeStyle = '#e33';
                        }
                    }
                    this.ctx.strokeRect(x * cellsize + PADDING + this.ctx.lineWidth / 2,
                        y * cellsize + PADDING + this.ctx.lineWidth / 2,
                        cellsize - 2 * PADDING - this.ctx.lineWidth,
                        cellsize - 2 * PADDING - this.ctx.lineWidth);
                }
            }
        }
    }

}
