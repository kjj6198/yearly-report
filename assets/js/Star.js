import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

const starSize = 40;

export default class Star {

  constructor(target) {
    this.target = target;
    this.loader = new THREE.OBJLoader();
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.camera = new THREE.PerspectiveCamera(10, starSize / starSize, 0.1, 100);
    this.camera.position.set(0, 0, starSize);

    return this;
  }

  get size() {
    return starSize;
  }

  rotate() {
    const star = this.scene.getObjectByName('tree.star');
    star.rotation.y += Math.PI / 110;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.rotate.bind(this));
  }

  init() {
    const hemisphereLight = new THREE.HemisphereLight(
      0xaaaaaa,
      0x000000,
      .9
    );

    const ambientLight = new THREE.AmbientLight(0xdc8874, .5);


    light.position.set(20, 10, 10);
    this.scene.add(hemisphereLight);
    this.scene.add(ambientLight);

    this.renderer.setSize(starSize, starSize);
    this.renderer.domElement.classList.add('star');
    this.renderer.domElement.setAttribute('data-speed', Math.random() * 2 + 0.7);
    this.target.appendChild(this.renderer.domElement);
    this.load();
  }

  load() {
    this.loader.load('./assets/images/star.obj', obj => {
      obj.children[2].position.set(0, 0, 0);
      obj.children[2].material = new THREE.MeshPhongMaterial({ color: 0xf3bb02 });

      this.scene.add(obj.children[2]);
      this.renderer.render(this.scene, this.camera);

      this.rotate();
    });
  }
}
