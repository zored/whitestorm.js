export default class PlexusParticles extends WHS.MeshComponent {
  build(params = {}) {
    const points = new THREE.Points(params.particles, new THREE.MultiMaterial([
      new THREE.PointsMaterial({
        map: this.circleTexture('#6e6e6e', 16),
        blending: THREE.SubtractiveBlending,
        transparent: true,
        depthWrite: false,
        size: 2.5,
        sizeAttenuation: false
      }),
      new THREE.PointsMaterial({
        map: this.circleTexture('#9e3cb4', 16),
        blending: THREE.SubtractiveBlending,
        transparent: true,
        depthWrite: false,
        size: 5,
        sizeAttenuation: false
      })
    ]));
    return points;
  }

  circleTexture(color, size) {
    const matCanvas = document.createElement('canvas');
    matCanvas.width = matCanvas.height = size;
    const matContext = matCanvas.getContext('2d');
    // create exture object from canvas.
    const texture = new THREE.Texture(matCanvas);
    // Draw a circle
    const center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = color;
    matContext.fill();
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    return texture;
  }
}
