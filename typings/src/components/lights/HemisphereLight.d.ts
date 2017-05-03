import {LightComponent, LightComponentParameters} from "../../core/LightComponent";

interface HemisphereLightParameters extends LightComponentParameters {
    light?: {
        skyColor: number,
        groundColor: number,
        intensity: number
    }
}

/**
 * Half-sphere light.
 */
export class HemisphereLight extends LightComponent {
    static defaults: HemisphereLightParameters;
    constructor(params: HemisphereLightParameters = {})
}