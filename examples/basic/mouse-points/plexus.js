import PlexusParticles from './plexus-particles';
import PlexusLines from './plexus-lines';

export default class Plexus {
  constructor() {
    // desktop
    this.particleCount = 1300;
    this.velocity = 0.3;
    this.maxConnections = 50;
    this.minDistance = 60;
    this.r = (window.innerHeight > window.innerWidth) ? window.innerHeight : window.innerWidth;
    this.rHalf = this.r / 2;
    this.velocity = 1;
    this.init_particles();

    this.plexusParticles = new PlexusParticles(Plexus);
    this.plexusLines = new PlexusLines(this);

    return {particles: this.plexusParticles, mesh: new WHS.Group(this.plexusParticles, this.plexusLines), component: this};
  }
  init_particles() {
    Plexus.particlesData = [];
    Plexus.particles = new THREE.BufferGeometry();

    Plexus.particlePositions = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      const x = (Math.random() * this.r) - (this.r / 2);
      const y = (Math.random() * (this.r / 2)) - (this.r / 4);
      const z = 0;
      Plexus.particlePositions[i * 3] = x;
      Plexus.particlePositions[(i * 3) + 1] = y;
      Plexus.particlePositions[(i * 3) + 2] = z;

      Plexus.particlesData.push({
        velocity: new THREE.Vector3(-this.velocity + (Math.random() * this.velocity), -this.velocity + Math.random() * this.velocity, 0),
        numConnections: 0
      });
    }

    Plexus.particles.setDrawRange(0, this.particleCount);
    Plexus.particles.addGroup(0, this.particleCount * 0.1, 1);
    Plexus.particles.addGroup((this.particleCount * 0.1) + 1, this.particleCount, 0);
    Plexus.particles.addAttribute('position', new THREE.BufferAttribute(Plexus.particlePositions, 3).setDynamic(true));
  }

  animate() {
    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;
    for (let i = 0; i < this.particleCount; i++)
      Plexus.particlesData[i].numConnections = 0;
    for (let i = 0; i < this.particleCount; i++) {
      // get the particle
      const particleData = Plexus.particlesData[i];
      Plexus.particlePositions[i * 3] += particleData.velocity.x;
      Plexus.particlePositions[(i * 3) + 1] += particleData.velocity.y;
      Plexus.particlePositions[(i * 3) + 2] += particleData.velocity.z;
      if (Plexus.particlePositions[(i * 3) + 1] < -this.rHalf || Plexus.particlePositions[(i * 3) + 1] > this.rHalf)
        particleData.velocity.y = -particleData.velocity.y;
      if (Plexus.particlePositions[i * 3] < -this.rHalf || Plexus.particlePositions[i * 3] > this.rHalf)
        particleData.velocity.x = -particleData.velocity.x;
      if (Plexus.particlePositions[(i * 3) + 2] < -this.rHalf || Plexus.particlePositions[(i * 3) + 2] > this.rHalf)
        Plexus.particleData.velocity.z = -particleData.velocity.z;
      if (particleData.numConnections >= this.maxConnections)
        continue;

      // Check collision
      for (let j = i + 1; j < this.particleCount; j++) {
        const particleDataB = Plexus.particlesData[j];

        if (particleDataB.numConnections >= this.maxConnections)
          continue;

        const dx = Plexus.particlePositions[i * 3] - Plexus.particlePositions[j * 3];
        const dy = Plexus.particlePositions[i * 3 + 1] - Plexus.particlePositions[j * 3 + 1];
        const dz = Plexus.particlePositions[i * 3 + 2] - Plexus.particlePositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < this.minDistance) {
          particleData.numConnections++;
          particleDataB.numConnections++;
          const alpha = 1 - (dist / this.minDistance);
          this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[i * 3];
          this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[i * 3 + 1];
          this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[i * 3 + 2];
          this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[j * 3];
          this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[j * 3 + 1];
          this.plexusLines.positions[vertexpos++] = Plexus.particlePositions[j * 3 + 2];

          this.plexusLines.colors[colorpos++] = alpha;
          this.plexusLines.colors[colorpos++] = alpha;
          this.plexusLines.colors[colorpos++] = alpha;
          this.plexusLines.colors[colorpos++] = alpha;
          this.plexusLines.colors[colorpos++] = alpha;
          this.plexusLines.colors[colorpos++] = alpha;
          numConnected++;
        }
      }
    }
    this.plexusLines.geometry.setDrawRange(0, numConnected * 2);
    this.plexusLines.geometry.attributes.position.needsUpdate = true;
    this.plexusLines.geometry.attributes.color.needsUpdate = true;
    this.plexusParticles.geometry.attributes.position.needsUpdate = true;
  }
}
