import * as UTILS from '../../globals';
import SocketModule from '../../../modules/whs-module-socket/src';

const controlsModule = new WHS.controls.OrbitModule();
const cameraModule = new WHS.app.CameraModule({
  position: {
    x: 50,
    z: 250,
    y: 300
  },

  far: 30000,
  near: 1
});

const mouse = new WHS.app.VirtualMouseModule();

// TODO make the example host run the socket server
const socketModule = new SocketModule({port: 3000});

const world = new WHS.App([
  ...UTILS.appModules({
    position: new THREE.Vector3(0, 10, 200)
  }),
  controlsModule,
  cameraModule,
  mouse
]);

// this is stupid, but just to show the  module adds and track a remote box
socketModule.onNewMesh(mesh => {
  const boxx = mesh;
  boxx.addTo(world);
});

controlsModule.controls.autoRotate = true;

const box = new WHS.Box({
  geometry: {
    height: 100,
    width: 100,
    depth: 100
  },

  position: [Math.random() * 200, Math.random() * 250, Math.random() * 250],

  shadow: {
    cast: false
  },

  material: new THREE.MeshBasicMaterial({
    color: 0xffffff
  }),

  modules: [
    socketModule
  ]

});
mouse.track(box);
box.sockit(); // this will make send off the box to server
box.addTo(world);

box.on('mousemove', () => {
  box.emitPosition({ // this emits more, but just showing simple position change for now
    x: box.position.x + mouse.project().sub(box.position).x,
    y: box.position.y + mouse.project().sub(box.position).y,
    z: box.position.z + mouse.project().sub(box.position).z
  });
});

new WHS.PointLight({
  light: {
    color: 0xffffff,
    intensity: 1,
    distance: 1000
  },

  position: [10, 40, 10]
}).addTo(world);

new WHS.Box({
  geometry: {
    width: 2000,
    height: 0.1,
    depth: 2000
  },

  shadow: {
    cast: false
  },

  material: new THREE.MeshPhongMaterial({
    color: 0xffffff
  }),

  position: [0, -60, 0],
  rotation: [0, 0, 0]
}).addTo(world);

world.start();
