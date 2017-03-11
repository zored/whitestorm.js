import * as io from 'socket.io-client';

export default class SocketModule {
  constructor(params = {}) {
    this.params = Object.assign({
      hostname: window.location.hostname,
      port: window.location.port,
      scheme: window.location.protocol
    }, params);

    this.meshes = new Map();
    this.socketServer = this.params.scheme + '//' + this.params.hostname + ':' + this.params.port;
    this.init();
  }

  init() {
    const socketServer = this.socketServer;
    this.socket = io.connect(socketServer);
    this.socket.on('connect', () => {
      console.info('Socket connected to ' + socketServer);
    });

    this.socket.on('event', () => {}); // this takes data
    this.socket.on('disconnect', () => {
      console.info('Socket disconnected from ' + socketServer);
    });
  }

  manager(manager) {
    manager.add('socket', this.socket);
  }

  onNewMesh(cb) {
    const meshes = this.meshes;
    this.socket.on('new-mesh', msg => {
      const boxx = new WHS.Box({
        geometry: {
          height: 100,
          width: 100,
          depth: 100
        },

        position: msg.position,
        material: new THREE.MeshBasicMaterial()
      });

      boxx.uuid = msg.uuid;
      meshes.set(msg.uuid, boxx);

      cb(boxx);
    });
  }

  replace(box) {
    this.meshes.set(box.uuid, box);
  }

  integrate(self) {
    self.socket.on('position-changed', msg => {
      // TODO, it's overkill, but we will add polling later. so that we only emmit
      // a set of changes every delta time (loop?)
      const meshThatMoved = self.meshes.get(msg.uuid);
      if (meshThatMoved) {
        meshThatMoved.position.x = msg.position.x;
        meshThatMoved.position.y = msg.position.y;
        meshThatMoved.position.z = msg.position.z;
      }
    });

    this.sockit = () => {
      this.uuid = self.generateUid();
      const mesh = {
        geometry: this.geometry,
        position: this.position,
        material: this.material
      };

      this.position = mesh.position;
      self.meshes.set(this.uuid, this);

      self.socket.emit('create-mesh', {
        uuid: this.uuid,
        mesh
      });

      return this;
    };

    this.emitPosition = function (params) {
      const mesh = self.meshes.get(this.uuid);
      mesh.position = params;
      const uuid = this.uuid;
      self.socket.emit('position-change', {
        uuid,
        mesh: mesh.geometry, // we pass the mesh geometry as well, not using it yet
        position: mesh.position
      });
    };
  }

  generateUid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}
