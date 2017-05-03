import {
  WebGLRenderer,
  Vector2
} from 'three';

import {Loop} from '../../core/Loop';

export class RenderingModule {
  static additional = {
    shadow(renderer) {
      renderer.shadowMap.enabled = true;
    }
  }

  constructor(params = {}, {shadow: isShadow} = {shadow: false}) {
    this.params = Object.assign({
      width: window.innerWidth,
      height: window.innerHeight,

      resolution: new Vector2(1, 1),
      pixelRatio: window.devicePixelRatio,

      bgColor: 0x000000,
      bgOpacity: 1,

      renderer: {}
    }, params);

    const {
      bgColor,
      bgOpacity,
      renderer,
      pixelRatio,
      width,
      height,
      resolution
    } = this.params;

    this.renderer = new WebGLRenderer(renderer);
    this.applyAdditional('shadow', isShadow);

    this.renderer.setClearColor(
      bgColor,
      bgOpacity
    );

    if (pixelRatio) this.renderer.setPixelRatio(pixelRatio);

    this.setSize(
      Number(width * resolution.x).toFixed(),
      Number(height * resolution.y).toFixed()
    );
  }

  applyAdditional(name, isApplied = false) {
    if (!isApplied) return;
    RenderingModule.additional[name].apply(this, [this.renderer]);
  }

  integrateRenderer(element, scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.renderLoop = new Loop(() => this.renderer.render(this.scene, this.camera));
    this.attachToCanvas(element);

    return this.renderLoop;
  }

  setSize(width, height) {
    if (this.renderer) this.renderer.setSize(width, height);
  }

  attachToCanvas(element) {
    const canvas = this.renderer.domElement;

    // attach to new parent world dom
    element.appendChild(canvas);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }

  stop() {
    this.renderLoop.stop();
  }

  play() {
    this.renderLoop.start();
  }

  manager(manager) {
    this.renderLoop = this.integrateRenderer(
      manager.get('element'),
      manager.get('scene'),
      manager.get('camera').native
    );

    manager.update({
      element: element => {
        this.attachToCanvas(element);
      },
      scene: scene => {
        this.scene = scene;
      },
      camera: camera => {
        this.camera = camera.native;
      }
    });

    manager.add('renderer', this.renderer, {alias: '$rendering'});
  }

  integrate(self) {
    self.renderLoop.start(this);
  }

  dispose(self) {
    self.renderLoop.stop(this);
    self.renderer.forceContextLoss();
  }
}
