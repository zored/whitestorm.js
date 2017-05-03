import {
  Mesh,
  IcosahedronBufferGeometry,
  IcosahedronGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Icosahedron extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      radius: 1,
      detail: 0
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['radius', 'detail']
  };

  constructor(params = {}) {
    super(params, Icosahedron.defaults, Icosahedron.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? IcosahedronBufferGeometry : IcosahedronGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.detail
    );
  }
}

export {
  Icosahedron
};
