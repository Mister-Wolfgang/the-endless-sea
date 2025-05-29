import * as THREE from 'three';

describe('ThreeJS', () => {
  it('peut créer une scène', () => {
    const scene = new THREE.Scene();
    expect(scene).toBeInstanceOf(THREE.Scene);
  });

  it('peut créer une caméra', () => {
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    expect(camera).toBeInstanceOf(THREE.PerspectiveCamera);
  });

  it('peut créer un mesh', () => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    expect(mesh).toBeInstanceOf(THREE.Mesh);
  });
});
