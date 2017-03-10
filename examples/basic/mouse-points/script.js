import Plexus from './plexus';

const mouse = new WHS.app.VirtualMouseModule();
const camera = new WHS.app.CameraModule({
  position: new THREE.Vector3(0, 0, 300),
  fov: 70,
  near: 1,
  far: 2500
});
const scene = new WHS.app.SceneModule();

const world = new WHS.App([
  new WHS.app.ElementModule({
  }),
  scene,
  camera,
  new WHS.app.RenderingModule({
    bgColor: 0xdedede,
    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      },
      gammaInput: true,
      gammaOutput: true
    }
  }, {shadow: true}),
  new WHS.app.ResizeModule(),
  new WHS.controls.OrbitModule({
    target: new THREE.Vector3(0, 0, 0),
    follow: false
  }),
  mouse
]);

new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.5
  }
}).addTo(world);

new WHS.PointLight({
  light: {
    intensity: 0.5,
    distance: 100
  },
  position: [0, 10, 300]
}).addTo(world);

const plexus = new Plexus();
plexus.mesh.addTo(world);
mouse.track(plexus.particles);

plexus.particles.on('mouseover', () => {
  plexus.particles.material.materials[1].size += 10;
});
plexus.particles.on('mouseout', () => {
  plexus.particles.material.materials[1].size -= 10;
});

const loop = new WHS.Loop(() => {
  plexus.component.animate();
});
loop.start(world);

world.start();
