import {LightComponent, LightComponentParameters} from "../../core/LightComponent";

interface PointLightParameters extends LightComponentParameters {
    light?: {
        color: number,
        intensity: number,
        distance: number,
        decay: number
    }
}

export class PointLight extends LightComponent {
    static defaults: PointLightParameters;

    constructor(params: PointLightParameters = {})
}