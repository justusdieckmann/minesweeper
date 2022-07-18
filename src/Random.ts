export class Random {

    public static inRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min))
    }

}
