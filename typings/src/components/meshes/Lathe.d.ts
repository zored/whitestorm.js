import {
  Mesh,
  LatheBufferGeometry,
  LatheGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Lathe extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      points: []
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['points']
  };

  constructor(params = {}) {
    super(params, Lathe.defaults, Lathe.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? LatheBufferGeometry : LatheGeometry;

    return new GConstruct(
      params.geometry.points
    );
  }
}

export {
  Lathe
};
