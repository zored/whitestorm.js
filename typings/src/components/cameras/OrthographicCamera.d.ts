import {CameraComponent, CameraComponentParameters} from "../../core/CameraComponent";

/**
 * Parameters for orthographic camera.
 */
interface OrthographicCameraParameters extends CameraComponentParameters {
  camera?: {
    near: number,
    far: number,
    left: number,
    right: number,
    top: number,
    bottom: number,
  }
}

/**
 * Orthographic camera.
 */
export class OrthographicCamera extends CameraComponent {
  static defaults: OrthographicCameraParameters;

  constructor(params:OrthographicCameraParameters = {})
}