import {LightComponent, LightComponentParameters} from "../../core/LightComponent";

interface DirectionalLightParameters extends LightComponentParameters {
    light?: {
        color: number,
        intensity: number
    }
}

/**
 * Light with direction.
 */
export class DirectionalLight extends LightComponent {
    static defaults: DirectionalLightParameters;

    constructor(params: DirectionalLightParameters = {})
}