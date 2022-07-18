import {MinesweeperCanvas} from "./MinesweeperCanvas";
import {MinesweeperField} from "./MinesweeperField";

const canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const minesweeperCanvas = new MinesweeperCanvas(ctx, MinesweeperField.randomField(9, 9, 9));
