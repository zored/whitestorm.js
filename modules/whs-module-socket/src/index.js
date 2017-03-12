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
    this.socket = io.connect(this.socketServer);

    this.socket.on('connect', () => {
      console.info('Socket connected to ' + this.socketServer);
    });

    this.socket.on('event', () => {}); // this takes data

    this.socket.on('disconnect', () => {
      console.info('Socket disconnected from ' + this.socketServer);
    });
  }

  manager(manager) {
    manager.add('socket', this.socket);
  }

  onNewMesh(cb) {
    const meshes = this.meshes;

    this.socket.on('new-mesh', msg => {
      let material = null;
      switch (msg.mesh.material.type) {
        case 'MeshBasicMaterial':
          material = new THREE.MeshBasicMaterial();
          break;
        case 'MeshPhongMaterial':
          material = new THREE.MeshPhongMaterial();
          break;
        case 'MeshLambertMaterial':
          material = new THREE.MeshLambertMaterial();
          break;
        default:
          material = null;
          break;
      }

      const boxx = new WHS.Box({
        geometry: {
          height: msg.mesh.geometry.height,
          width: msg.mesh.geometry.width,
          depth: msg.mesh.geometry.depth
        },

        shadow: msg.mesh.shadow,
        position: msg.mesh.position,
        material
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
        material: this.material,
        shadow: this.shadow
      };

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
        geometry: mesh.geometry,
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
