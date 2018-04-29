import {Logger} from "./logger";

export class BasicLogger implements Logger {

    public error(msg: string): void {
        console.log(msg);
    }

    public log(msg: string): void {
        console.log(msg);
    }

}