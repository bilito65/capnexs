import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ECOSYSTEM_NODES } from '../../data/financialData';

interface EcosystemOrbit3DProps {
  activeNodeId?: string;
  onSelectNode?: (id: string) => void;
}

export const EcosystemOrbit3D: React.FC<EcosystemOrbit3DProps> = ({
  activeNodeId = 'capnexs',
  onSelectNode
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.5, 9.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group for nodes
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // Central Node: CAPNEXS (Sun/Core of Capital)
    const centerGeom = new THREE.SphereGeometry(1.0, 32, 32);
    const centerMat = new THREE.MeshStandardMaterial({
      color: 0xC9A84C,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x6e5218,
      emissiveIntensity: 0.6
    });
    const centerMesh = new THREE.Mesh(centerGeom, centerMat);
    systemGroup.add(centerMesh);

    // Orbit Ring
    const orbitRadius = 4.2;
    const orbitGeom = new THREE.BufferGeometry();
    const orbitPoints: THREE.Vector3[] = [];
    const orbitSegs = 100;
    for (let i = 0; i <= orbitSegs; i++) {
      const angle = (i / orbitSegs) * Math.PI * 2;
      orbitPoints.push(new THREE.Vector3(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius));
    }
    orbitGeom.setFromPoints(orbitPoints);
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0xC9A84C,
      transparent: true,
      opacity: 0.25
    });
    const orbitLine = new THREE.Line(orbitGeom, orbitMat);
    systemGroup.add(orbitLine);

    // Satellite Nodes (Ecosystem members)
    const otherNodes = ECOSYSTEM_NODES.filter(n => n.id !== 'capnexs');
    const nodeMeshes: { mesh: THREE.Mesh; id: string; baseAngle: number }[] = [];

    otherNodes.forEach((node, idx) => {
      const angle = (idx / otherNodes.length) * Math.PI * 2;
      const nodeGeom = new THREE.SphereGeometry(0.48, 24, 24);
      const isSelected = activeNodeId === node.id;
      const nodeMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0xF7F4EF : 0x8394A6,
        metalness: 0.7,
        roughness: 0.25,
        emissive: isSelected ? 0xC9A84C : 0x2A1A13,
        emissiveIntensity: isSelected ? 0.7 : 0.2
      });

      const mesh = new THREE.Mesh(nodeGeom, nodeMat);
      mesh.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(idx) * 0.4,
        Math.sin(angle) * orbitRadius
      );

      systemGroup.add(mesh);
      nodeMeshes.push({ mesh, id: node.id, baseAngle: angle });

      // Connective Capital Stream (Line from center to node)
      const streamGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        mesh.position
      ]);
      const streamMat = new THREE.LineDashedMaterial({
        color: 0xC9A84C,
        dashSize: 0.2,
        gapSize: 0.1,
        transparent: true,
        opacity: 0.35
      });
      const streamLine = new THREE.Line(streamGeom, streamMat);
      streamLine.computeLineDistances();
      systemGroup.add(streamLine);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0x2A1A13, 2.0);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xC9A84C, 25, 18);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const dirLight = new THREE.DirectionalLight(0xF7F4EF, 1.2);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Mouse Parallax & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.x = x;
      mouse.y = y;
      targetRotY = x * 0.6;
      targetRotX = y * 0.3;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.mesh).concat(centerMesh));
      if (intersects.length > 0) {
        mount.style.cursor = 'pointer';
        const hit = nodeMeshes.find(n => n.mesh === intersects[0].object);
        if (hit) {
          setHoveredNode(hit.id);
        } else if (intersects[0].object === centerMesh) {
          setHoveredNode('capnexs');
        }
      } else {
        mount.style.cursor = 'default';
        setHoveredNode(null);
      }
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.mesh).concat(centerMesh));
      if (intersects.length > 0 && onSelectNode) {
        const hit = nodeMeshes.find(n => n.mesh === intersects[0].object);
        if (hit) onSelectNode(hit.id);
        else if (intersects[0].object === centerMesh) onSelectNode('capnexs');
      }
    };

    mount.addEventListener('mousemove', onPointerMove);
    mount.addEventListener('click', onClick);

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

      // Slow orbital rotation
      systemGroup.rotation.y = t * 0.1 + targetRotY;
      systemGroup.rotation.x = 0.2 + targetRotX;

      // Pulse central core
      const centerPulse = 1 + Math.sin(t * 2) * 0.05;
      centerMesh.scale.set(centerPulse, centerPulse, centerPulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousemove', onPointerMove);
      mount.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      centerGeom.dispose();
      centerMat.dispose();
      orbitGeom.dispose();
      orbitMat.dispose();
    };
  }, [activeNodeId, onSelectNode]);

  return (
    <div className="relative w-full h-[460px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
      {hoveredNode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-payote-black/90 border border-payote-gold/40 rounded-full text-xs font-mono text-payote-gold tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(201,168,76,0.3)] animate-pulse">
          ✦ {hoveredNode.toUpperCase()} · CLICK TO EXPLORE
        </div>
      )}
    </div>
  );
};
