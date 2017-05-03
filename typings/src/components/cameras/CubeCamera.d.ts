import {CameraComponent, CameraComponentParameters} from "../../core/CameraComponent";

interface CubeCameraParameters extends CameraComponentParameters {
    /**
     * Camera settings used by:
     * @see CubeCamera.build.
     */
    camera: {
        near: number,
        far: number,
        cubeResolution: number
    };
}

/**
 * Cube camera.
 */
export class CubeCamera extends CameraComponent {
    static defaults: CubeCameraParameters;

    // TODO: defaults?
    constructor(params: CubeCameraParameters)
}