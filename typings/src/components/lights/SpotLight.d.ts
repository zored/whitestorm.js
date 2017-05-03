import {LightComponent, LightComponentParameters} from "../../core/LightComponent";

interface SpotLightParameters extends LightComponentParameters {

    light?: {
        color: number,
        intensity: number,
        distance: number,
        angle: number,
        exponent: number,
        decay: number
    }
}

/**
 * Spot light.
 */
export class SpotLight extends LightComponent {
    static defaults: SpotLightParameters;

    constructor(params: SpotLightParameters = {})
}