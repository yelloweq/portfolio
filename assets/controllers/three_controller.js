import { Controller } from '@hotwired/stimulus';
import * as THREE from "three";

export default class extends Controller {


  connect() {
    let container, gui;
    let camera, scene, renderer, clock;
    let uniforms;
    let sphereMesh;
    function init() {
      //GUI
      // gui = new dat.GUI({ autoPlace: false });
      //
      // document.body.appendChild(gui.domElement);
      // gui.domElement.id = "gui";
      // const world = {
      //   sphere: {
      //     radius: 8,
      //     widthSegments: 100,
      //     heightSegments: 100,
      //   }
      // }
      // gui.add(world.sphere, 'radius', 1, 20).onChange(generateSphere);
      // gui.add(world.sphere, 'widthSegments', 1, 100).onChange(generateSphere);
      // gui.add(world.sphere, 'heightSegments', 1, 100).onChange(generateSphere);
      //
      // function generateSphere() {
      //   sphereMesh.geometry.dispose();
      //   sphereMesh.geometry = new THREE.SphereGeometry(world.sphere.radius, world.sphere.widthSegments, world.sphere.heightSegments);
      // }

      //MAIN
      container = document.querySelector("#background");

      camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );

      scene = new THREE.Scene();
      clock = new THREE.Clock();

      const geometry = new THREE.SphereGeometry(8, 100, 100);

      uniforms = {
        uTime: { type: "f", value: 0.0 },
        uResolution: { type: "v2", value: new THREE.Vector2() },
        uMouse: { type: "v2", value: new THREE.Vector2() },
      };

      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
      });

      sphereMesh = new THREE.Mesh(geometry, material);

      scene.add(sphereMesh);
      sphereMesh.position.set(-6,0,0);
      camera.lookAt(0,0,0);
      camera.position.z = 15;

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      onWindowResize();
      window.addEventListener('resize', onWindowResize, false);

      document.onmousemove = function(event) {
        uniforms.uMouse.value.x = event.pageX;
        uniforms.uMouse.value.y = event.pageY;
      };
    }

    function onWindowResize(event) {
      renderer.setSize( window.innerWidth, window.innerHeight );
      uniforms.uResolution.value.x = renderer.domElement.width;
      uniforms.uResolution.value.y = renderer.domElement.height;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      sphereMesh.scale.setScalar(1);
      if (window.innerWidth > 1000) {
        // scale of 1 = 1920px default
        // roughly scales the sphere at 75-80 % screen width above 1000px width
        sphereMesh.scale.setScalar(window.innerWidth * 0.1 / 192);
      }

    }

    function render() {
      uniforms.uTime.value += clock.getDelta();
      renderer.render(scene, camera);
      sphereMesh.rotation.x += 0.0001
      sphereMesh.rotation.y += 0.0001
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    init();
    animate();
  }
}
