export default class PlexusLines extends WHS.MeshComponent {
  build(params = {}) {
    this.init_component(params);
    return new THREE.LineSegments(PlexusLines.geometry, PlexusLines.material);
  }

  init_component(p) {
    const segments = p.particleCount * p.particleCount;

    this.positions = new Float32Array(segments * 3);
    this.colors = new Float32Array(segments * 3);

    PlexusLines.geometry = new THREE.BufferGeometry();
    PlexusLines.geometry.addAttribute('position', new THREE.BufferAttribute(this.positions, 3).setDynamic(true));
    PlexusLines.geometry.addAttribute('color', new THREE.BufferAttribute(this.colors, 3).setDynamic(true));
    PlexusLines.geometry.computeBoundingSphere();
    PlexusLines.geometry.setDrawRange(0, 0);
    PlexusLines.material = new THREE.LineBasicMaterial({
      color: 0x535353,
      vertexColors: THREE.VertexColors,
      blending: THREE.SubtractiveBlending,
      transparent: true
    });
  }
}
