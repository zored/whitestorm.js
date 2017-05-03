import {
  Vector2,
  Raycaster,
  Plane,
  Vector3
} from 'three';

import Events from 'minivents';
import {EventsPatchModule} from './EventsPatchModule';

export class VirtualMouseModule extends Events {
  mouse = new Vector2();
  raycaster = new Raycaster();
  world = null;
  canvas = null;
  projectionPlane = new Plane(new Vector3(0, 0, 1), 0);

  constructor(globalMovement = false, patchEvents = true) {
    super();
    this.globalMovement = globalMovement;
    this.patchEvents = patchEvents;
  }

  update(e, customX, customY) {
    const rect = this.canvas.getBoundingClientRect();

    const x = customX || e.clientX;
    const y = customY || e.clientY;

    this.mouse.x = ((x - rect.left) / (rect.right - rect.left)) * 2 - 1;
    this.mouse.y = -((y - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    this.projectionPlane.normal.copy(this.camera.getWorldDirection());

    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.emit('move');
  }

  manager(manager) {
    this.canvas = manager.get('renderer').domElement;
    this.camera = manager.get('camera').native;
  }

  integrate(self) {
    if (self.patchEvents) this.applyModuleOnce(EventsPatchModule, () => new EventsPatchModule());

    [
      'click',
      'mousedown',
      'mouseup',
      'mousemove'
    ].forEach(ev => this.on(ev, e => self.emit(ev, e)));

    self.globalX = 0;
    self.globalY = 0;

    this.on('mousemove', e => {
      if (document.pointerLockElement !== null) {
        self.globalX += e.movementX;
        self.globalY += e.movementY;

        self.update(e, self.globalX, self.globalY);
      } else self.update(e);
    });
  }

  track(component) {
    let isHovered = false;

    this.on('move', () => {
      if (this.hovers(component)) {
        if (isHovered) component.emit('mousemove');
        else {
          component.emit('mouseover');
          isHovered = true;
        }
      } else if (isHovered) {
        component.emit('mouseout');
        isHovered = false;
      }
    });

    this.on('click', () => {
      if (isHovered) component.emit('click');
      else component.emit('offClick');
    });

    this.on('mousedown', () => {
      if (isHovered) component.emit('mousedown');
    });

    this.on('mouseup', () => {
      if (isHovered) component.emit('mouseup');
    });
  }

  intersection(component) {
    return this.raycaster.intersectObject(component.native);
  }

  project(plane = this.projectionPlane) {
    return this.raycaster.ray.intersectPlane(plane);
  }

  hovers(component) {
    const intersection = this.intersection(component)[0];
    return intersection ? intersection.object === component.native : false;
  }

  get ray() {
    return this.raycaster.ray;
  }

  get x() {
    return this.mouse.x;
  }

  get y() {
    return this.mouse.y;
  }
}
