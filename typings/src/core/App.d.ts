import {Module, ModuleSystem} from './ModuleSystem';
import {Loop} from "./Loop";

/**
 * Application.
 */
export class App extends ModuleSystem {
    simulate: boolean;
    updateEnabled: boolean;
    loops: Loop[];

    constructor(modules: Module[] = [])

    start()

    stop()

    addLoop(loop: Loop): Promise;

    removeLoop(loop: Loop): Promise
}