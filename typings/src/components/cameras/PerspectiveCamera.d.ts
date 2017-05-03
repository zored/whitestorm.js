import {CameraComponent, CameraComponentParameters} from "../../core/CameraComponent";

interface PerspectiveCameraParameters extends CameraComponentParameters {
  camera?: {
    near: number,
    far: number,
    fov: number,
    aspect: number,
  }
}

export class PerspectiveCamera extends CameraComponent {
  static defaults: PerspectiveCameraParameters;

  constructor(params: PerspectiveCameraParameters = {})
}