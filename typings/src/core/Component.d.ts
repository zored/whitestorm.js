import {Module, ModuleSystem} from './ModuleSystem';
import {ModuleManager} from './ModuleManager';
import {Euler, Object3D, Quaternion, Vector3} from "three";
import {AxisValues} from "./BaseTypes";

/**
 * Parameters component accepts.
 */
export interface ComponentParameters {
    /**
     * Component objects.
     */
    modules?: Module[],

    /**
     * Should be manager?
     */
    manager?: boolean

    /**
     * Should run build?
     * @see CameraComponent.build
     * @see LightComponent.build
     */
    build?: boolean,

    /**
     * Position of camera.
     */
    position?: AxisValues,

    /**
     * Rotation of camera.
     */
    rotation?: AxisValues
}

/**
 * Just x, y or z string.
 */
type AxisString = 'x' | 'y' | 'z';

/**
 * Instructions component accepts.
 */
export interface ComponentInstructions {

    /**
     * Position.
     */
    position?: AxisString[],

    /**
     * Roatation.
     */
    rotation?: AxisString[],

    /**
     * Scale.
     */
    scale?: AxisString[]
}

/**
 * Copy attributes from THREE Object3D.
 */
export interface ObjectAttributesCopy {
    /**
     * Object's local position.
     */
    position: Vector3;

    /**
     * Object's local rotation (Euler angles), in radians.
     */
    rotation: Euler;

    /**
     * Global rotation.
     */
    quaternion: Quaternion;

    /**
     * Target object.
     */
    target: Object3D;
}

type ComponentParams = object;

/**
 * Component.
 */
export class Component extends ModuleSystem {
    /**
     * Default parameters.
     */
    static defaults: ComponentParameters;

    /**
     * Default instructions.
     */
    static instructions: ComponentInstructions;

    /**
     * Build component with current configuration.
     */
    public build: (params:ComponentParameters) => void | undefined;


    /**
     * Build component with current configuration.
     */
    public wrap: (() => Promise)| undefined;

    /**
     * Collection of promises.
     */
    _wait: Promise[];

    /**
     * Collection of modules.
     */
    modules: Module[];

    /**
     * Children components.
     */
    children: Component[];

    constructor(params: ComponentParams = {}, defaults: ComponentParameters = Component.defaults, instructions: ComponentInstructions = Component.instructions)

    /**
     * Wait for all promises.
     */
    wait(promise: Promise)

    /**
     * Defer callback execution.
     */
    defer(func: Function): Promise

    /**
     * Update parameters.
     * @param params
     */
    updateParams(params: ComponentParams = {})

    /**
     * Clone current component.
     */
    clone(): Component

    /**
     * Copy component with customizations.
     */
    copy(source: Component, customize: Function): Component

    /**
     * Add object.
     */
    add(object: Object3D): Promise

    /**
     * Remove object.
     */
    remove(object: Object3D)

    /**
     * Add component to object.
     */
    addTo(object: Object3D)

    /**
     * Is deferred?
     */
    get isDeffered(): boolean

    /**
     * Get module manager.
     */
    get manager(): ModuleManager

    /**
     * Set module manager.
     */
    set manager(manager: ModuleManager)

    /**
     * Get native (THREE object)
     */
    get native(): Object3D

    /**
     * Set native (THREE object).
     */
    set native(mesh: Object3D)
}