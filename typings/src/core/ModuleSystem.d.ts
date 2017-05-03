import {Events} from "../../lib/minivents";
import {ModuleManager} from "./ModuleManager";

/**
 * TODO:
 */
export type Bridge = { string: Function };

/**
 * TODO:
 */
export interface Module {
    bridge: Bridge;
    dispose(system: ModuleSystem);
}

/**
 * Module system.
 */
export class ModuleSystem extends Events {
    /**
     * Submodules.
     */
    public modules: Module[];

    /**
     * Module manager.
     */
    public manager: ModuleManager | undefined;

    /**
     * Integrates one module into another.
     * Optional.
     */
    public integrate: (self: ModuleSystem) => {} | undefined;

    /**
     * Integrate other module into current (set modules, apply bridge, etc.)
     */
    integrateModules(source: ModuleSystem)

    /**
     * Apply bridge.
     * TODO:
     */
    applyBridge(bridgeMap: object = {}): object

    /**
     * Apply module.
     * - Activate in manager.
     * - Push to submodules array.
     */
    applyModule(module: Module, push: boolean = true): Module

    /**
     * Apply module if not applied.
     */
    applyModuleOnce(ModuleConstructor: any, getModule: Function, push: boolean = true): Module

    /**
     * Dispose submodules.
     */
    disposeModules()

    /**
     * Dispose module with current system.
     * @see Module.dispose
     */
    disposeModule(module: Module)

    /**
     * Apply module and return self.
     *
     * @param module
     */
    module(module: Module): ModuleSystem
}
