import {LightComponent, LightComponentParameters} from "../../core/LightComponent";

interface AreaLightParameters extends LightComponentParameters {
    light?: {
        color: number,
        intensity: number,
        width: number,
        height: number,
    }
}

export class AreaLight extends LightComponent {
    static defaults: AreaLightParameters;
    constructor(params: AreaLightParameters = {});
}