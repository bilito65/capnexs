import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroFinancialNexus: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080605, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for entire interactive nexus
    const nexusGroup = new THREE.Group();
    scene.add(nexusGroup);

    // 1. Golden Armillary Rings (Financial Nexus)
    const ringMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0xC9A84C,
        metalness: 0.9,
        roughness: 0.15,
        wireframe: false,
        emissive: 0x473711,
        emissiveIntensity: 0.2
      }),
      new THREE.MeshStandardMaterial({
        color: 0xE2C775,
        metalness: 0.95,
        roughness: 0.2,
        wireframe: false,
        emissive: 0x5a4413,
        emissiveIntensity: 0.25
      }),
      new THREE.MeshStandardMaterial({
        color: 0x8394A6,
        metalness: 0.8,
        roughness: 0.3,
        wireframe: false,
        emissive: 0x1d242b,
        emissiveIntensity: 0.15
      })
    ];

    const rings: THREE.Mesh[] = [];
    const ringConfigs = [
      { radius: 2.2, tube: 0.022, rotX: Math.PI / 4, rotY: 0, mat: ringMaterials[0] },
      { radius: 2.7, tube: 0.018, rotX: -Math.PI / 3, rotY: Math.PI / 6, mat: ringMaterials[1] },
      { radius: 3.1, tube: 0.015, rotX: Math.PI / 6, rotY: -Math.PI / 4, mat: ringMaterials[2] },
      { radius: 3.5, tube: 0.012, rotX: Math.PI / 2.2, rotY: Math.PI / 3, mat: ringMaterials[0] },
    ];

    ringConfigs.forEach(cfg => {
      const geom = new THREE.TorusGeometry(cfg.radius, cfg.tube, 24, 120);
      const mesh = new THREE.Mesh(geom, cfg.mat);
      mesh.rotation.x = cfg.rotX;
      mesh.rotation.y = cfg.rotY;
      rings.push(mesh);
      nexusGroup.add(mesh);
    });

    // 2. Center Glowing Capital Core (Icosahedron wireframe + inner glowing sphere)
    const coreGeom = new THREE.IcosahedronGeometry(0.85, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xC9A84C,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
      emissive: 0xC9A84C,
      emissiveIntensity: 0.5
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    nexusGroup.add(coreMesh);

    const innerSphereGeom = new THREE.SphereGeometry(0.55, 32, 32);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0xF7E2A4,
      transparent: true,
      opacity: 0.4
    });
    const innerCore = new THREE.Mesh(innerSphereGeom, innerSphereMat);
    nexusGroup.add(innerCore);

    // 3. Floating Capital Data Particles (1,200 golden & slate nodes)
    const particleCount = 1200;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const goldColor = new THREE.Color(0xC9A84C);
    const slateColor = new THREE.Color(0x8394A6);
    const creamColor = new THREE.Color(0xF7F4EF);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const dice = Math.random();
      const color = dice > 0.4 ? goldColor : dice > 0.15 ? slateColor : creamColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    nexusGroup.add(particles);

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x1F1813, 1.8);
    scene.add(ambientLight);

    const goldLight1 = new THREE.PointLight(0xC9A84C, 25, 20);
    goldLight1.position.set(4, 5, 4);
    scene.add(goldLight1);

    const goldLight2 = new THREE.PointLight(0xE2C775, 18, 20);
    goldLight2.position.set(-4, -4, 3);
    scene.add(goldLight2);

    const slateLight = new THREE.DirectionalLight(0x8394A6, 1.2);
    slateLight.position.set(0, 8, -5);
    scene.add(slateLight);

    // Mouse Interaction with elastic lerping
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      nexusGroup.rotation.y = elapsedTime * 0.12 + mouseX;
      nexusGroup.rotation.x = mouseY * 0.8;

      // Independent rotations for rings
      if (rings[0]) rings[0].rotation.z = elapsedTime * 0.15;
      if (rings[1]) rings[1].rotation.x = elapsedTime * -0.18;
      if (rings[2]) rings[2].rotation.y = elapsedTime * 0.22;
      if (rings[3]) rings[3].rotation.z = elapsedTime * -0.1;

      // Core rotation and pulsing
      coreMesh.rotation.x = elapsedTime * 0.3;
      coreMesh.rotation.y = elapsedTime * 0.4;
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.04;
      innerCore.scale.set(scale, scale, scale);

      // Particle slow drift
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      innerSphereGeom.dispose();
      innerSphereMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0"
      style={{ overflow: 'hidden' }}
    />
  );
};
