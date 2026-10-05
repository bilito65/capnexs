import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const GoldEmblem3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Card geometry (Standard credit card ratio: 85.6mm x 53.98mm ~ 1.58 ratio)
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Rounded rectangular box for card body
    const cardGeom = new THREE.BoxGeometry(3.2, 2.0, 0.05);
    const cardMat = new THREE.MeshPhysicalMaterial({
      color: 0x16110D,
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const cardMesh = new THREE.Mesh(cardGeom, cardMat);
    cardGroup.add(cardMesh);

    // Golden metallic border bevel
    const borderGeom = new THREE.BoxGeometry(3.26, 2.06, 0.04);
    const borderMat = new THREE.MeshStandardMaterial({
      color: 0xC9A84C,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x473711,
      emissiveIntensity: 0.3
    });
    const borderMesh = new THREE.Mesh(borderGeom, borderMat);
    borderMesh.position.z = -0.01;
    cardGroup.add(borderMesh);

    // Microchip / Smart Nexus emblem on the card
    const chipGeom = new THREE.BoxGeometry(0.5, 0.4, 0.06);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0xE2C775,
      metalness: 0.9,
      roughness: 0.2
    });
    const chipMesh = new THREE.Mesh(chipGeom, chipMat);
    chipMesh.position.set(-1.0, 0.35, 0.02);
    cardGroup.add(chipMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x2A1A13, 2.5);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0xF5E2A8, 15, 10);
    light1.position.set(2, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xC9A84C, 10, 10);
    light2.position.set(-2, -3, 2);
    scene.add(light2);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.5;
      targetRotX = -y * 0.4;
    };

    mount.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth lerping
      mouseX += (targetRotY - mouseX) * 0.08;
      mouseY += (targetRotX - mouseY) * 0.08;

      cardGroup.rotation.y = mouseX + Math.sin(t * 0.8) * 0.08;
      cardGroup.rotation.x = mouseY + Math.cos(t * 0.6) * 0.05;

      // Dynamic light movement
      light1.position.x = Math.sin(t) * 3;
      light1.position.y = Math.cos(t) * 3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cardGeom.dispose();
      cardMat.dispose();
      borderGeom.dispose();
      borderMat.dispose();
      chipGeom.dispose();
      chipMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
