"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface ScrollSceneHandle {
  setProgress: (progress: number) => void;
}

export default function ScrollScene({
  progress = 0,
}: {
  progress?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Root Group with Mouse Parallax
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 2. Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ef, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff2df, 2.8);
    keyLight.position.set(6, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdce7f2, 1.4);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const burgundyBounce = new THREE.PointLight(0x722f37, 2.2, 9);
    burgundyBounce.position.set(0, -2, 2);
    scene.add(burgundyBounce);

    const goldSpot = new THREE.PointLight(0xc5a059, 2.0, 10);
    goldSpot.position.set(2, 3, 1);
    scene.add(goldSpot);

    // Studio Spotlight for Scene 4 (Photography & Videography)
    const studioSpot = new THREE.SpotLight(0xfffaea, 0, 12, Math.PI / 4, 0.3, 1);
    studioSpot.position.set(0, 5, 4);
    scene.add(studioSpot);

    // 3. Dynamic Screen Textures
    // A. Laptop Screen
    const laptopCanvas = document.createElement("canvas");
    laptopCanvas.width = 1024;
    laptopCanvas.height = 640;
    const lCtx = laptopCanvas.getContext("2d");
    if (lCtx) {
      lCtx.fillStyle = "#E8DCC6";
      lCtx.fillRect(0, 0, 1024, 640);

      // Top bar
      lCtx.fillStyle = "#342A29";
      lCtx.font = "bold 26px sans-serif";
      lCtx.fillText("ANRIKA DIGITAL", 48, 54);

      lCtx.fillStyle = "#722F37";
      lCtx.font = "500 16px sans-serif";
      lCtx.fillText("Case Studies", 660, 52);
      lCtx.fillText("Disciplines", 810, 52);

      lCtx.fillStyle = "#722F37";
      lCtx.beginPath();
      lCtx.roundRect(915, 30, 75, 32, 16);
      lCtx.fill();
      lCtx.fillStyle = "#E8DCC6";
      lCtx.font = "bold 13px sans-serif";
      lCtx.fillText("STUDIO", 926, 51);

      lCtx.strokeStyle = "rgba(114, 47, 55, 0.2)";
      lCtx.lineWidth = 1.5;
      lCtx.beginPath();
      lCtx.moveTo(48, 80);
      lCtx.lineTo(976, 80);
      lCtx.stroke();

      lCtx.fillStyle = "#722F37";
      lCtx.font = "italic bold 64px serif";
      lCtx.fillText("Digital Artistry.", 48, 185);

      lCtx.fillStyle = "#342A29";
      lCtx.font = "400 20px sans-serif";
      lCtx.fillText("Bespoke Web Flagships & High-Conversion Meta Campaigns.", 48, 235);

      // Card 1
      lCtx.fillStyle = "#F5EBDD";
      lCtx.beginPath();
      lCtx.roundRect(48, 280, 420, 290, 16);
      lCtx.fill();
      lCtx.strokeStyle = "rgba(114, 47, 55, 0.15)";
      lCtx.stroke();

      lCtx.fillStyle = "#722F37";
      lCtx.font = "bold 13px sans-serif";
      lCtx.fillText("CASE STUDY // 01", 72, 320);
      lCtx.fillStyle = "#342A29";
      lCtx.font = "bold 30px serif";
      lCtx.fillText("Aura Haute Atelier", 72, 365);
      lCtx.fillStyle = "#9A515A";
      lCtx.font = "400 16px sans-serif";
      lCtx.fillText("Interactive 3D Luxury Web Experience", 72, 400);

      lCtx.fillStyle = "#722F37";
      lCtx.beginPath();
      lCtx.roundRect(72, 480, 160, 44, 8);
      lCtx.fill();
      lCtx.fillStyle = "#E8DCC6";
      lCtx.font = "bold 15px sans-serif";
      lCtx.fillText("View Project →", 95, 507);

      // Card 2
      lCtx.fillStyle = "#722F37";
      lCtx.beginPath();
      lCtx.roundRect(500, 280, 476, 290, 16);
      lCtx.fill();

      lCtx.fillStyle = "#E8DCC6";
      lCtx.font = "italic 32px serif";
      lCtx.fillText("Meta Performance Suite", 530, 345);
      lCtx.fillStyle = "#F5EBDD";
      lCtx.font = "400 18px sans-serif";
      lCtx.fillText("Algorithmic Social Architecture", 530, 385);

      lCtx.fillStyle = "rgba(232, 220, 198, 0.18)";
      lCtx.beginPath();
      lCtx.roundRect(530, 435, 200, 80, 12);
      lCtx.fill();
      lCtx.fillStyle = "#E8DCC6";
      lCtx.font = "bold 36px sans-serif";
      lCtx.fillText("4.8x ROAS", 548, 480);
      lCtx.font = "400 13px sans-serif";
      lCtx.fillText("Benchmark Performance", 548, 503);
    }
    const laptopTexture = new THREE.CanvasTexture(laptopCanvas);
    laptopTexture.generateMipmaps = true;

    // B. Phone Screen
    const phoneCanvas = document.createElement("canvas");
    phoneCanvas.width = 540;
    phoneCanvas.height = 1080;
    const pCtx = phoneCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createLinearGradient(0, 0, 540, 1080);
      grad.addColorStop(0, "#342A29");
      grad.addColorStop(1, "#722F37");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 540, 1080);

      pCtx.fillStyle = "#E8DCC6";
      pCtx.beginPath();
      pCtx.arc(60, 90, 30, 0, Math.PI * 2);
      pCtx.fill();

      pCtx.fillStyle = "#722F37";
      pCtx.font = "bold 16px sans-serif";
      pCtx.fillText("ADI", 46, 96);

      pCtx.fillStyle = "#E8DCC6";
      pCtx.font = "bold 22px sans-serif";
      pCtx.fillText("anrikadigital", 110, 86);
      pCtx.fillStyle = "#B7A89A";
      pCtx.font = "400 16px sans-serif";
      pCtx.fillText("Sponsored • Creative Studio", 110, 110);

      pCtx.fillStyle = "#F5EBDD";
      pCtx.beginPath();
      pCtx.roundRect(40, 160, 460, 540, 20);
      pCtx.fill();

      pCtx.fillStyle = "#722F37";
      pCtx.font = "italic bold 48px serif";
      pCtx.fillText("CREATIVE", 70, 270);
      pCtx.fillText("VELOCITY.", 70, 325);

      pCtx.fillStyle = "#342A29";
      pCtx.font = "400 20px sans-serif";
      pCtx.fillText("High-Impact Social Campaigns", 70, 375);
      pCtx.fillText("Crafted for conversion & prestige.", 70, 405);

      pCtx.fillStyle = "#722F37";
      pCtx.beginPath();
      pCtx.roundRect(70, 570, 340, 54, 27);
      pCtx.fill();
      pCtx.fillStyle = "#E8DCC6";
      pCtx.font = "bold 18px sans-serif";
      pCtx.fillText("Explore Campaigns  ↗", 130, 604);

      pCtx.fillStyle = "#E8DCC6";
      pCtx.font = "24px sans-serif";
      pCtx.fillText("♥  💬  ↗", 50, 750);
      pCtx.font = "bold 18px sans-serif";
      pCtx.fillText("12,480 likes", 50, 800);
      pCtx.font = "400 17px sans-serif";
      pCtx.fillText("anrikadigital  Redefining digital experiences for 2026.", 50, 840);
      pCtx.fillStyle = "#B7A89A";
      pCtx.fillText("#DigitalMarketing #WebDesign #MetaAds", 50, 875);
    }
    const phoneTexture = new THREE.CanvasTexture(phoneCanvas);
    phoneTexture.generateMipmaps = true;

    // 4. Shared Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.9,
      roughness: 0.2,
    });
    const burgMat = new THREE.MeshStandardMaterial({
      color: 0x722f37,
      metalness: 0.8,
      roughness: 0.2,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x342a29,
      roughness: 0.4,
      metalness: 0.6,
    });

    // 5. Build 3D Models
    // A. Cinematic Camera
    const cameraGroup = new THREE.Group();

    const camBodyGeo = new THREE.BoxGeometry(1.3, 0.9, 0.7);
    const camBody = new THREE.Mesh(camBodyGeo, darkMat);
    camBody.castShadow = true;
    cameraGroup.add(camBody);

    const gripGeo = new THREE.BoxGeometry(0.26, 0.75, 0.5);
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x221b1a, roughness: 0.9 });
    const grip = new THREE.Mesh(gripGeo, gripMat);
    grip.position.set(-0.55, -0.05, 0.12);
    cameraGroup.add(grip);

    const goldRingGeo = new THREE.TorusGeometry(0.34, 0.03, 16, 32);
    const goldRing = new THREE.Mesh(goldRingGeo, goldMat);
    goldRing.position.set(0.1, 0, 0.38);
    goldRing.rotation.x = Math.PI / 2;
    cameraGroup.add(goldRing);

    const lensGeo = new THREE.CylinderGeometry(0.35, 0.32, 0.7, 32);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x221b1a,
      metalness: 0.8,
      roughness: 0.3,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.set(0.1, 0, 0.72);
    lens.rotation.x = Math.PI / 2;
    lens.castShadow = true;
    cameraGroup.add(lens);

    const focusGeo = new THREE.CylinderGeometry(0.365, 0.365, 0.22, 32);
    const focusMat = new THREE.MeshStandardMaterial({
      color: 0x722f37,
      metalness: 0.5,
      roughness: 0.4,
    });
    const focus = new THREE.Mesh(focusGeo, focusMat);
    focus.position.set(0.1, 0, 0.78);
    focus.rotation.x = Math.PI / 2;
    cameraGroup.add(focus);

    const opticGeo = new THREE.SphereGeometry(0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3);
    const opticMat = new THREE.MeshPhysicalMaterial({
      color: 0x385472,
      transmission: 0.85,
      transparent: true,
      roughness: 0.05,
      ior: 1.6,
      clearcoat: 1,
    });
    const optic = new THREE.Mesh(opticGeo, opticMat);
    optic.position.set(0.1, 0, 1.08);
    cameraGroup.add(optic);

    rootGroup.add(cameraGroup);

    // B. Laptop
    const laptopGroup = new THREE.Group();

    const baseGeo = new THREE.BoxGeometry(2.5, 0.08, 1.7);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xb7a89a,
      metalness: 0.75,
      roughness: 0.25,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, -0.04, 0.4);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    laptopGroup.add(baseMesh);

    const keybGeo = new THREE.BoxGeometry(2.2, 0.01, 1.0);
    const keybMat = new THREE.MeshStandardMaterial({ color: 0x342a29, roughness: 0.8 });
    const keybMesh = new THREE.Mesh(keybGeo, keybMat);
    keybMesh.position.set(0, 0.005, 0.3);
    laptopGroup.add(keybMesh);

    const trackGeo = new THREE.BoxGeometry(0.7, 0.005, 0.45);
    const trackMat = new THREE.MeshStandardMaterial({
      color: 0xa59688,
      roughness: 0.4,
      metalness: 0.5,
    });
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.position.set(0, 0.005, 0.95);
    laptopGroup.add(trackMesh);

    const screenAssembly = new THREE.Group();
    screenAssembly.position.set(0, 0, -0.45);
    screenAssembly.rotation.x = -0.32;

    const lidGeo = new THREE.BoxGeometry(2.5, 1.7, 0.06);
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x342a29,
      metalness: 0.85,
      roughness: 0.2,
    });
    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
    lidMesh.position.set(0, 0.85, 0);
    lidMesh.castShadow = true;
    screenAssembly.add(lidMesh);

    const screenPlaneGeo = new THREE.PlaneGeometry(2.36, 1.56);
    const screenPlaneMat = new THREE.MeshBasicMaterial({ map: laptopTexture });
    const screenMesh = new THREE.Mesh(screenPlaneGeo, screenPlaneMat);
    screenMesh.position.set(0, 0.85, 0.035);
    screenAssembly.add(screenMesh);

    const glassCoverMat = new THREE.MeshPhysicalMaterial({
      transparent: true,
      opacity: 0.12,
      roughness: 0.05,
      clearcoat: 1,
      color: 0xffffff,
    });
    const glassCoverMesh = new THREE.Mesh(screenPlaneGeo, glassCoverMat);
    glassCoverMesh.position.set(0, 0.85, 0.038);
    screenAssembly.add(glassCoverMesh);

    laptopGroup.add(screenAssembly);
    rootGroup.add(laptopGroup);

    // C. Smartphone
    const phoneGroup = new THREE.Group();

    const phoneBodyGeo = new THREE.BoxGeometry(1.1, 2.2, 0.08);
    const phoneBody = new THREE.Mesh(phoneBodyGeo, burgMat);
    phoneBody.castShadow = true;
    phoneGroup.add(phoneBody);

    const phoneScreenGeo = new THREE.PlaneGeometry(1.02, 2.1);
    const phoneScreenMat = new THREE.MeshBasicMaterial({ map: phoneTexture });
    const phoneScreen = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreen.position.set(0, 0, 0.043);
    phoneGroup.add(phoneScreen);

    const islandGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.03, 24);
    const island = new THREE.Mesh(islandGeo, darkMat);
    island.position.set(0.3, 0.75, -0.05);
    phoneGroup.add(island);

    rootGroup.add(phoneGroup);

    // D. Megaphone
    const megaGroup = new THREE.Group();

    const coneGeo = new THREE.CylinderGeometry(0.55, 0.2, 1.2, 32, 1, true);
    const coneMat = new THREE.MeshStandardMaterial({
      color: 0x722f37,
      metalness: 0.65,
      roughness: 0.3,
      side: THREE.DoubleSide,
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.rotation.z = Math.PI / 2;
    cone.castShadow = true;
    megaGroup.add(cone);

    const bellRingGeo = new THREE.TorusGeometry(0.55, 0.035, 16, 32);
    const bellRing = new THREE.Mesh(bellRingGeo, goldMat);
    bellRing.position.set(0.6, 0, 0);
    bellRing.rotation.y = Math.PI / 2;
    megaGroup.add(bellRing);

    const bulletGeo = new THREE.ConeGeometry(0.18, 0.45, 24);
    const bullet = new THREE.Mesh(bulletGeo, goldMat);
    bullet.position.set(0.3, 0, 0);
    bullet.rotation.z = -Math.PI / 2;
    megaGroup.add(bullet);

    const mouthGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 24);
    const mouth = new THREE.Mesh(mouthGeo, darkMat);
    mouth.position.set(-0.75, 0, 0);
    mouth.rotation.z = Math.PI / 2;
    megaGroup.add(mouth);

    const handleGroup = new THREE.Group();
    handleGroup.position.set(-0.4, -0.45, 0);
    handleGroup.rotation.z = -0.25;
    const handleGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.65, 16);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x342a29, roughness: 0.6 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.castShadow = true;
    handleGroup.add(handle);
    megaGroup.add(handleGroup);

    rootGroup.add(megaGroup);

    // E. Floating Spheres & Orbital Rings
    const orbGroup = new THREE.Group();

    const glassSphereGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const glassSphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xe8dcc6,
      roughness: 0.22,
      transmission: 0.75,
      thickness: 1.0,
      ior: 1.45,
      clearcoat: 1,
    });
    const glassSphere = new THREE.Mesh(glassSphereGeo, glassSphereMat);
    glassSphere.position.set(-1.1, 1.9, 0.4);
    glassSphere.castShadow = true;
    orbGroup.add(glassSphere);

    const burgSphereGeo = new THREE.SphereGeometry(0.34, 32, 32);
    const burgSphereMat = new THREE.MeshStandardMaterial({
      color: 0x722f37,
      metalness: 0.92,
      roughness: 0.15,
    });
    const burgSphere = new THREE.Mesh(burgSphereGeo, burgSphereMat);
    burgSphere.position.set(0.8, -1.0, 1.1);
    burgSphere.castShadow = true;
    orbGroup.add(burgSphere);

    const latteSphereGeo = new THREE.SphereGeometry(0.26, 32, 32);
    const latteSphereMat = new THREE.MeshStandardMaterial({
      color: 0xb7a89a,
      metalness: 0.6,
      roughness: 0.3,
    });
    const latteSphere = new THREE.Mesh(latteSphereGeo, latteSphereMat);
    latteSphere.position.set(-2.4, -0.6, 0.8);
    latteSphere.castShadow = true;
    orbGroup.add(latteSphere);

    const goldSphereGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const goldSphere = new THREE.Mesh(goldSphereGeo, goldMat);
    goldSphere.position.set(1.2, 2.1, -0.3);
    orbGroup.add(goldSphere);

    const orbit1Geo = new THREE.TorusGeometry(1.6, 0.012, 16, 64);
    const orbit1 = new THREE.Mesh(orbit1Geo, goldMat);
    orbit1.position.set(0.2, 0.6, 0);
    orbGroup.add(orbit1);

    const orbit2Geo = new THREE.TorusGeometry(2.1, 0.008, 16, 64);
    const burgMatRing = new THREE.MeshStandardMaterial({
      color: 0x722f37,
      metalness: 0.7,
      roughness: 0.4,
    });
    const orbit2 = new THREE.Mesh(orbit2Geo, burgMatRing);
    orbit2.position.set(-0.4, 0.2, 0.2);
    orbGroup.add(orbit2);

    rootGroup.add(orbGroup);

    // F. Golden Particle Dust Field
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a059,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // G. Soft Contact Shadow Disc
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 120);
      grad.addColorStop(0, "rgba(52, 42, 41, 0.5)");
      grad.addColorStop(0.5, "rgba(52, 42, 41, 0.18)");
      grad.addColorStop(1, "rgba(52, 42, 41, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -1.9, 0);
    shadowMesh.rotation.x = -Math.PI / 2;
    rootGroup.add(shadowMesh);

    // 6. Smooth Lerp State Helpers
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.14;
      targetRotX = -y * 0.1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Helper: Clamped linear interpolation
    const lerp = (start: number, end: number, t: number) => start + (end - start) * Math.max(0, Math.min(1, t));

    // 7. Render Loop driven by GSAP scroll progress
    let clock = new THREE.Clock();
    let currentP = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth scrub progress interpolation
      currentP += (progressRef.current - currentP) * 0.08;
      const p = currentP;

      // Mouse Parallax Lerp
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;

      // Particle gentle drift
      particles.rotation.y = t * 0.04 + p * 1.5;
      particles.rotation.x = t * 0.02;

      // Orbital rings rotation
      orbit1.rotation.x = t * 0.3 + p * 2;
      orbit1.rotation.y = t * 0.4 + p * 2;
      orbit2.rotation.y = -t * 0.25 - p * 2;
      orbit2.rotation.z = t * 0.35 + p * 1.5;

      // ==========================================
      // SCROLL-DRIVEN MOVIE TIMELINE TRANSFORMS
      // p ranges from 0.00 to 1.00 (6 Scenes)
      // Scene 1: 0.00 - 0.16 | Scene 2: 0.16 - 0.33
      // Scene 3: 0.33 - 0.50 | Scene 4: 0.50 - 0.67
      // Scene 5: 0.67 - 0.83 | Scene 6: 0.83 - 1.00
      // ==========================================

      // --- SCENE 1: CREATIVE BEGINNING (p: 0.00 -> 0.16) ---
      // Cinematic Camera starts hero stage; other objects off-stage
      if (p <= 0.16) {
        const seg = p / 0.16; // 0 -> 1
        // Camera model is framed center-right and rotates as visitor scrolls
        cameraGroup.position.set(
          lerp(1.4, 0.85, seg),
          lerp(0.18, 0.1, seg) + Math.sin(t * 1.2) * 0.05,
          lerp(2.2, 2.8, seg)
        );
        cameraGroup.rotation.set(
          lerp(0.12, 0.1, seg),
          lerp(0.65, 0.55, seg) + Math.sin(t * 0.5) * 0.03,
          lerp(-0.05, 0, seg)
        );
        cameraGroup.scale.setScalar(lerp(0.85, 0.95, seg));

        // Laptop remains below/invisible
        laptopGroup.position.set(0, -6, 0);
        laptopGroup.scale.setScalar(0.001);

        // Phone remains off right
        phoneGroup.position.set(6, 0, 0);
        phoneGroup.scale.setScalar(0.001);

        // Megaphone off top
        megaGroup.position.set(4, 5, 0);
        megaGroup.scale.setScalar(0.001);

        // Camera viewpoint
        camera.position.set(0, 0.2, lerp(7.8, 7.2, seg));
        studioSpot.intensity = 0;
      }

      // --- SCENE 2: WEBSITE DEVELOPMENT (p: 0.16 -> 0.33) ---
      // Laptop rotates into center, camera moves to background left
      else if (p <= 0.33) {
        const seg = (p - 0.16) / 0.17; // 0 -> 1

        // Cinematic camera retreats to left background
        cameraGroup.position.set(
          lerp(0.85, -2.6, seg),
          lerp(0.1, 0.4, seg) + Math.sin(t * 1.2) * 0.04,
          lerp(2.8, -0.5, seg)
        );
        cameraGroup.rotation.set(0.1, lerp(0.55, 0.9, seg), 0);
        cameraGroup.scale.setScalar(lerp(0.95, 0.65, seg));

        // Laptop flies in and unfolds onto center stage
        laptopGroup.position.set(
          lerp(2.5, 0.7, seg),
          lerp(-3.0, -0.25, seg) + Math.sin(t * 1.0) * 0.05,
          lerp(0.5, 2.2, seg)
        );
        laptopGroup.rotation.set(
          lerp(0.3, 0.08, seg),
          lerp(-0.8, -0.32, seg) + Math.sin(t * 0.4) * 0.03,
          lerp(0.1, 0, seg)
        );
        laptopGroup.scale.setScalar(lerp(0.4, 0.95, seg));

        // Phone & megaphone out of frame
        phoneGroup.position.set(6, 0, 0);
        phoneGroup.scale.setScalar(0.001);
        megaGroup.position.set(4, 5, 0);
        megaGroup.scale.setScalar(0.001);

        camera.position.set(0, 0.2, lerp(7.2, 7.0, seg));
        studioSpot.intensity = 0;
      }

      // --- SCENE 3: META ADVERTISING (p: 0.33 -> 0.50) ---
      // Smartphone sweeps in from right, rotates 360, laptop drifts to left
      else if (p <= 0.50) {
        const seg = (p - 0.33) / 0.17; // 0 -> 1

        // Laptop moves to left background
        laptopGroup.position.set(
          lerp(0.7, -2.4, seg),
          lerp(-0.25, 0.2, seg),
          lerp(2.2, -0.2, seg)
        );
        laptopGroup.rotation.set(0.08, lerp(-0.32, 0.4, seg), 0);
        laptopGroup.scale.setScalar(lerp(0.95, 0.6, seg));

        // Camera stays background left
        cameraGroup.position.set(-3.2, 0.5, -1.0);
        cameraGroup.scale.setScalar(0.5);

        // Smartphone sweeps into center-right with 360 turn
        phoneGroup.position.set(
          lerp(4.5, 0.9, seg),
          lerp(-0.5, 0.15, seg) + Math.sin(t * 1.3) * 0.06,
          lerp(0.5, 3.2, seg)
        );
        phoneGroup.rotation.set(
          lerp(0.3, 0.1, seg),
          lerp(Math.PI * 2, 0.35, seg) + Math.sin(t * 0.6) * 0.04,
          lerp(-0.2, 0, seg)
        );
        phoneGroup.scale.setScalar(lerp(0.3, 0.88, seg));

        megaGroup.position.set(4, 5, 0);
        megaGroup.scale.setScalar(0.001);

        camera.position.set(0, 0.2, 7.0);
        studioSpot.intensity = 0;
      }

      // --- SCENE 4: PHOTOGRAPHY & VIDEOGRAPHY (p: 0.50 -> 0.67) ---
      // Camera zooms to extreme macro focus center-stage, studio spot flares on
      else if (p <= 0.67) {
        const seg = (p - 0.50) / 0.17; // 0 -> 1

        // Phone moves to right-back
        phoneGroup.position.set(
          lerp(0.9, 2.8, seg),
          lerp(0.15, 0.8, seg),
          lerp(3.2, 0.2, seg)
        );
        phoneGroup.scale.setScalar(lerp(0.88, 0.55, seg));

        // Laptop stays background
        laptopGroup.position.set(-2.8, 0.3, -0.5);
        laptopGroup.scale.setScalar(0.5);

        // Camera zooms in from background into center-right macro focus
        cameraGroup.position.set(
          lerp(-3.2, 0.75, seg),
          lerp(0.5, 0.1, seg) + Math.sin(t * 1.1) * 0.05,
          lerp(-1.0, 3.8, seg)
        );
        cameraGroup.rotation.set(
          lerp(0.1, 0.08, seg),
          lerp(0.9, 0.68, seg) + Math.sin(t * 0.4) * 0.03,
          lerp(0, -0.05, seg)
        );
        cameraGroup.scale.setScalar(lerp(0.5, 1.05, seg));

        megaGroup.position.set(4, 5, 0);
        megaGroup.scale.setScalar(0.001);

        // Studio lighting flares on during macro focus!
        studioSpot.intensity = lerp(0, 3.8, seg);
        studioSpot.target = cameraGroup;
        camera.position.set(0, 0.2, lerp(7.0, 6.7, seg));
      }

      // --- SCENE 5: CREATIVE ADVERTISING (p: 0.67 -> 0.83) ---
      // Burgundy Megaphone swoops in from above, camera moves to left flank
      else if (p <= 0.83) {
        const seg = (p - 0.67) / 0.16; // 0 -> 1

        studioSpot.intensity = lerp(3.8, 0, seg);

        // Camera retreats to left flank
        cameraGroup.position.set(
          lerp(0.75, -2.1, seg),
          lerp(0.1, 0.35, seg),
          lerp(3.8, 0.5, seg)
        );
        cameraGroup.rotation.set(0.08, lerp(0.68, 0.8, seg), 0);
        cameraGroup.scale.setScalar(lerp(1.05, 0.75, seg));

        // Phone stays right flank
        phoneGroup.position.set(2.6, 0.4, 0.2);
        phoneGroup.scale.setScalar(0.55);

        // Laptop in background
        laptopGroup.position.set(-0.2, -1.8, -0.8);
        laptopGroup.scale.setScalar(0.55);

        // 3D Burgundy Megaphone enters from top right and hovers center stage
        megaGroup.position.set(
          lerp(4.0, 0.8, seg),
          lerp(4.5, 0.3, seg) + Math.sin(t * 1.2) * 0.06,
          lerp(-1.0, 2.6, seg)
        );
        megaGroup.rotation.set(
          lerp(0.5, -0.15, seg),
          lerp(-1.2, -0.35, seg) + Math.sin(t * 0.5) * 0.04,
          lerp(-0.5, 0.25, seg)
        );
        megaGroup.scale.setScalar(lerp(0.2, 0.85, seg));

        camera.position.set(0, 0.2, lerp(6.7, 7.2, seg));
      }

      // --- SCENE 6: DIGITAL GROWTH & MASTER CONSTELLATION (p: 0.83 -> 1.00) ---
      // All objects assemble into an integrated agency constellation, camera pulls back to wide shot
      else {
        const seg = (p - 0.83) / 0.17; // 0 -> 1

        studioSpot.intensity = 0;

        // Wide majestic camera pullback
        camera.position.set(0, lerp(0.2, 0.35, seg), lerp(7.2, 8.4, seg));

        // Center: Laptop
        laptopGroup.position.set(
          lerp(-0.2, 0.0, seg),
          lerp(-1.8, -0.45, seg) + Math.sin(t * 0.9) * 0.04,
          lerp(-0.8, 0.2, seg)
        );
        laptopGroup.rotation.set(0.08, lerp(0.4, -0.28, seg), 0);
        laptopGroup.scale.setScalar(lerp(0.55, 0.95, seg));

        // Left: Cinema Camera
        cameraGroup.position.set(
          lerp(-2.1, -1.95, seg),
          lerp(0.35, 0.3, seg) + Math.sin(t * 0.85 + 2.8) * 0.05,
          lerp(0.5, 0.4, seg)
        );
        cameraGroup.rotation.set(0.12, lerp(0.8, 0.65, seg), -0.05);
        cameraGroup.scale.setScalar(lerp(0.75, 0.72, seg));

        // Right: Smartphone
        phoneGroup.position.set(
          lerp(2.6, 1.95, seg),
          lerp(0.4, 0.35, seg) + Math.sin(t * 1.1 + 1.5) * 0.05,
          lerp(0.2, 0.8, seg)
        );
        phoneGroup.rotation.set(0.12, lerp(0.35, 0.32, seg), 0);
        phoneGroup.scale.setScalar(lerp(0.55, 0.72, seg));

        // Upper Right: Megaphone
        megaGroup.position.set(
          lerp(0.8, 1.85, seg),
          lerp(0.3, 1.45, seg) + Math.sin(t * 1.05 + 0.8) * 0.05,
          lerp(2.6, -0.4, seg)
        );
        megaGroup.rotation.set(-0.15, -0.3, 0.25);
        megaGroup.scale.setScalar(lerp(0.85, 0.68, seg));
      }

      // Spheres float organically across all scenes
      glassSphere.position.y = 1.9 + Math.sin(t * 1.3) * 0.06;
      burgSphere.position.y = -1.1 + Math.sin(t * 1.1 + 2.0) * 0.05;
      latteSphere.position.y = -0.7 + Math.sin(t * 0.95 + 1.0) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      laptopTexture.dispose();
      phoneTexture.dispose();
      shadowTex.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative select-none pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
