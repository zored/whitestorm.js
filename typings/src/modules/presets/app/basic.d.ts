import {Preset} from '../Preset';

import {ElementModule} from '../../app/ElementModule';
import {SceneModule} from '../../app/SceneModule';
import {CameraModule} from '../../app/CameraModule';
import {RenderingModule} from '../../app/RenderingModule';
import {ResizeModule} from '../../app/ResizeModule';

export class BasicAppPreset extends Preset {
  constructor({camera, rendering, element} = {}) {
    super([
      new ElementModule(element),
      new SceneModule(),
      new CameraModule(camera),
      new RenderingModule(rendering, {
        shadow: true
      })
    ]);
  }

  autoresize() {
    this.modules.push(new ResizeModule());
    return this;
  }
}
