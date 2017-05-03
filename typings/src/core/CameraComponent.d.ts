import {Component, ComponentParameters, ComponentInstructions, ObjectAttributesCopy} from './Component';

import {AxisValues} from "./BaseTypes";
import {Euler, Object3D, Quaternion, Vector3} from "three";

/**
 * Defaults parameters for camera component.
 */
export interface CameraComponentParameters extends ComponentParameters {
}


/**
 * Instructions for camera component.
 */
export interface CameraComponentInstructions extends ComponentInstructions {
}


/**
 * Abstract camera component.
 */
export abstract class CameraComponent extends Component, ObjectAttributesCopy {
    static defaults: CameraComponentParameters;
    static instructions: CameraComponentInstructions;

    constructor(params, defaults: CameraComponentParameters = CameraComponent.defaults, instructions: CameraComponentInstructions = CameraComponent.instructions)

    /**
     * ???
     */
    wrap(): Promise
}