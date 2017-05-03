import {Component, ComponentInstructions, ComponentParameters, ObjectAttributesCopy} from "./Component";

/**
 * Parameters for light component.
 */
interface LightComponentParameters extends ComponentParameters {
    /**
     * Shadow settings.
     */
    shadow?: {
        /**
         * Shadow enabled?
         */
        cast: boolean,

        bias: number,
        radius: number,
        mapSize: {
            width: number,
            height: number
        },
        camera: {
            near: boolean,
            far: number,
            fov: number,
            top: number,
            bottom: number,
            left: number,
            right: number,
        }
    },
}

/**
 * Light.
 */
export class LightComponent extends Component, ObjectAttributesCopy {
    static defaults: LightComponentParameters;

    constructor(
        params: LightComponentParameters,
        defaults: LightComponentParameters,
        instructions: ComponentInstructions = LightComponent.instructions
    )

    /**
     * Wrap shadow parameters.
     */
    wrapShadow()
}