import {AmbientLight as AmbientLightNative} from 'three';
import {LightComponent, LightComponentParameters} from '../../core/LightComponent';

interface AmbientLightParameters extends LightComponentParameters{
    light?: {
        color: number,
        intensity: number
    }
}

/**
 * Ambient light,
 */
export class AmbientLight extends LightComponent {
    static defaults: AmbientLightParameters;
    constructor(params: AmbientLightParameters = {})
}
