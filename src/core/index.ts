import * as THREE from 'three';

// interface Light {
//   position: THREE.Vector3;
//   intensity: number;
//   castShadow: boolean;
//   shadow: {
//     camera: {
//       left: number;
//       right: number;
//       top: number;
//       bottom: number;
//       near: number;
//       far: number;
//     };
//     bias: number;
//     mapSize: THREE.Vector2;
//   };
//   target: THREE.Object3D;
// }

export default class Core {
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
//   sun: Light;

  constructor() {
    this.camera = new THREE.PerspectiveCamera();
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.scene = new THREE.Scene();
    // this.sun = {
    //   position: new THREE.Vector3(),
    //   intensity: 0,
    //   castShadow: false,
    //   shadow: {
    //     camera: {
    //       left: 0,
    //       right: 0,
    //       top: 0,
    //       bottom: 0,
    //       near: 0,
    //       far: 0,
    //     },
    //     bias: 0,
    //     mapSize: new THREE.Vector2(),
    //   },
    //   target: new THREE.Object3D(),
    // };

    // this.sunInit();
    this.setCamera();
    this.setRenderer();
    this.setScene();
  }

  setCamera() : void {
    this.camera.fov = 75;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.position.set(-32, 200, -32);
    this.camera.layers.enable(1);
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  setScene() : void {
    const light1: THREE.DirectionalLight = new THREE.DirectionalLight();
    light1.position.set(1, 1, 1);
    this.scene.add(light1);

    const ambient: THREE.AmbientLight = new THREE.AmbientLight();
    ambient.intensity = 0.1;
    this.scene.add(ambient);
  }

//   sunInit() : void{
//     this.sun.intensity = 1.5;
//     this.sun.position.set(50, 50, 50);
//     this.sun.castShadow = true;

//     // Set the size of the sun's shadow box
//     this.sun.shadow.camera.left = -40;
//     this.sun.shadow.camera.right = 40;
//     this.sun.shadow.camera.top = 40;
//     this.sun.shadow.camera.bottom = -40;
//     this.sun.shadow.camera.near = 0.1;
//     this.sun.shadow.camera.far = 200;
//     this.sun.shadow.bias = -0.0001;
//     this.sun.shadow.mapSize = new THREE.Vector2(2048, 2048);
//     this.scene.add(this.sun);
//     this.scene.add(this.sun.target);
//   }

  setRenderer() : void {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x80a0e0);
    document.body.appendChild(this.renderer.domElement);

    window.addEventListener<'resize'>('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}