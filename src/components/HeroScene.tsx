"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let width = container.clientWidth || 600;
    let height = container.clientHeight || 600;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.6);

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
    renderer.toneMappingExposure = 1.1;

    // Root Group for Mouse Parallax & Composition Scaling
    const rootGroup = new THREE.Group();
    rootGroup.scale.set(0.85, 0.85, 0.85);
    scene.add(rootGroup);

    // 2. Studio Lighting (Tuned to Mocha Cream, Deep Burgundy, and Gold)
    const ambientLight = new THREE.AmbientLight(0xfff8ef, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff2df, 2.4);
    keyLight.position.set(6, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdce7f2, 1.2);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const burgundyBounce = new THREE.PointLight(0x722f37, 2.0, 8);
    burgundyBounce.position.set(0, -2, 2);
    scene.add(burgundyBounce);

    const goldGlow = new THREE.PointLight(0xc5a059, 1.8, 10);
    goldGlow.position.set(2, 3, 1);
    scene.add(goldGlow);

    // 3. Dynamic Procedural Texture for Laptop Screen (Luxury Agency Website)
    const laptopCanvas = document.createElement("canvas");
    laptopCanvas.width = 1024;
    laptopCanvas.height = 640;
    const lCtx = laptopCanvas.getContext("2d");
    if (lCtx) {
      lCtx.fillStyle = "#E8DCC6";
      lCtx.fillRect(0, 0, 1024, 640);

      // Header
      lCtx.fillStyle = "#342A29";
      lCtx.font = "bold 26px sans-serif";
      lCtx.fillText("ANRIKA DIGITAL", 48, 54);

      lCtx.fillStyle = "#722F37";
      lCtx.font = "500 16px sans-serif";
      lCtx.fillText("Selected Works", 660, 52);
      lCtx.fillText("Disciplines", 810, 52);

      // Pill button
      lCtx.fillStyle = "#722F37";
      lCtx.beginPath();
      lCtx.roundRect(915, 30, 75, 32, 16);
      lCtx.fill();
      lCtx.fillStyle = "#E8DCC6";
      lCtx.font = "bold 13px sans-serif";
      lCtx.fillText("INQUIRE", 926, 51);

      // Line
      lCtx.strokeStyle = "rgba(114, 47, 55, 0.2)";
      lCtx.lineWidth = 1.5;
      lCtx.beginPath();
      lCtx.moveTo(48, 80);
      lCtx.lineTo(976, 80);
      lCtx.stroke();

      // Main Editorial Headline
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

    // 4. Dynamic Procedural Texture for Smartphone Screen (Instagram Ad Campaign)
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

      // Header
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

      // Center visual card
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

      // Bottom likes & caption
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

    // 5. Construct 3D Laptop
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0.1, -0.45, 0.2);
    laptopGroup.scale.set(1.0, 1.0, 1.0);

    // Laptop Base
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

    // Keyboard well
    const keybGeo = new THREE.BoxGeometry(2.2, 0.01, 1.0);
    const keybMat = new THREE.MeshStandardMaterial({ color: 0x342a29, roughness: 0.8 });
    const keybMesh = new THREE.Mesh(keybGeo, keybMat);
    keybMesh.position.set(0, 0.005, 0.3);
    laptopGroup.add(keybMesh);

    // Trackpad
    const trackGeo = new THREE.BoxGeometry(0.7, 0.005, 0.45);
    const trackMat = new THREE.MeshStandardMaterial({
      color: 0xa59688,
      roughness: 0.4,
      metalness: 0.5,
    });
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.position.set(0, 0.005, 0.95);
    laptopGroup.add(trackMesh);

    // Screen Assembly
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

    // 6. Construct 3D Smartphone
    const phoneGroup = new THREE.Group();
    phoneGroup.position.set(1.95, 0.35, 0.8);
    phoneGroup.scale.set(0.72, 0.72, 0.72);

    const phoneBodyGeo = new THREE.BoxGeometry(1.1, 2.2, 0.08);
    const phoneBodyMat = new THREE.MeshStandardMaterial({
      color: 0x722f37,
      metalness: 0.8,
      roughness: 0.2,
    });
    const phoneBody = new THREE.Mesh(phoneBodyGeo, phoneBodyMat);
    phoneBody.castShadow = true;
    phoneGroup.add(phoneBody);

    const phoneScreenGeo = new THREE.PlaneGeometry(1.02, 2.1);
    const phoneScreenMat = new THREE.MeshBasicMaterial({ map: phoneTexture });
    const phoneScreen = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreen.position.set(0, 0, 0.043);
    phoneGroup.add(phoneScreen);

    // Camera island on back
    const islandGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.03, 24);
    const islandMat = new THREE.MeshStandardMaterial({ color: 0x342a29, metalness: 0.9 });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.set(0.3, 0.75, -0.05);
    phoneGroup.add(island);

    rootGroup.add(phoneGroup);

    // 7. Construct 3D Cinematic Camera (facing forward-right)
    const cameraGroup = new THREE.Group();
    cameraGroup.position.set(-1.75, 0.2, 0.5);
    cameraGroup.rotation.set(0.12, 0.65, -0.05);
    cameraGroup.scale.set(0.72, 0.72, 0.72);

    const camBodyGeo = new THREE.BoxGeometry(1.3, 0.9, 0.7);
    const camBodyMat = new THREE.MeshStandardMaterial({
      color: 0x342a29,
      roughness: 0.4,
      metalness: 0.6,
    });
    const camBody = new THREE.Mesh(camBodyGeo, camBodyMat);
    camBody.castShadow = true;
    cameraGroup.add(camBody);

    const gripGeo = new THREE.BoxGeometry(0.26, 0.75, 0.5);
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x221b1a, roughness: 0.9 });
    const grip = new THREE.Mesh(gripGeo, gripMat);
    grip.position.set(-0.55, -0.05, 0.12);
    cameraGroup.add(grip);

    // Gold lens mount
    const goldRingGeo = new THREE.TorusGeometry(0.34, 0.03, 16, 32);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.9,
      roughness: 0.2,
    });
    const goldRing = new THREE.Mesh(goldRingGeo, goldMat);
    goldRing.position.set(0.1, 0, 0.38);
    goldRing.rotation.x = Math.PI / 2;
    cameraGroup.add(goldRing);

    // Lens Barrel
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

    // Focus ring
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

    // Front curved optic element
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

    // 8. Construct 3D Advertising Megaphone
    const megaGroup = new THREE.Group();
    megaGroup.position.set(1.85, 1.4, -0.4);
    megaGroup.scale.set(0.66, 0.66, 0.66);

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
    const mouthMat = new THREE.MeshStandardMaterial({ color: 0x342a29, metalness: 0.7 });
    const mouth = new THREE.Mesh(mouthGeo, mouthMat);
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

    // 9. Floating Glass & Metallic Spheres & Orbital Rings
    const orbGroup = new THREE.Group();

    // Translucent Studio Glass Orb (Mocha Cream tint)
    const glassSphereGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const glassSphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xe8dcc6,
      roughness: 0.22,
      transmission: 0.75,
      thickness: 1.0,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const glassSphere = new THREE.Mesh(glassSphereGeo, glassSphereMat);
    glassSphere.position.set(-1.1, 1.9, 0.4);
    glassSphere.castShadow = true;
    orbGroup.add(glassSphere);

    // Deep Burgundy Gloss Orb
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

    // Cosmic Latte Orb
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

    // Small Gold Orb
    const goldSphereGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const goldSphere = new THREE.Mesh(goldSphereGeo, goldMat);
    goldSphere.position.set(1.2, 2.1, -0.3);
    orbGroup.add(goldSphere);

    // Orbital Gold Rings
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

    // 10. Soft Shadow Ground Disc
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 120);
      grad.addColorStop(0, "rgba(52, 42, 41, 0.45)");
      grad.addColorStop(0.5, "rgba(52, 42, 41, 0.15)");
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
    shadowMesh.position.set(0, -1.8, 0);
    shadowMesh.rotation.x = -Math.PI / 2;
    rootGroup.add(shadowMesh);

    // 11. Interactive Mouse Parallax
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.18;
      targetRotX = -y * 0.12;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = x * 0.15;
        targetRotX = -y * 0.1;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // 12. Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 13. Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse tilt lerp
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;

      // Laptop subtle floating
      laptopGroup.position.y = -0.45 + Math.sin(t * 0.9) * 0.05;
      laptopGroup.rotation.y = -0.28 + Math.sin(t * 0.4) * 0.04;

      // Phone subtle floating
      phoneGroup.position.y = 0.35 + Math.sin(t * 1.1 + 1.5) * 0.06;
      phoneGroup.rotation.x = 0.12 + Math.sin(t * 0.5) * 0.04;
      phoneGroup.rotation.y = 0.32 + Math.cos(t * 0.45) * 0.04;

      // Camera subtle floating (facing user forward-right)
      cameraGroup.position.y = 0.2 + Math.sin(t * 0.85 + 2.8) * 0.06;
      cameraGroup.rotation.y = 0.65 + Math.sin(t * 0.35) * 0.04;
      cameraGroup.rotation.z = -0.05 + Math.cos(t * 0.5) * 0.03;

      // Megaphone subtle floating
      megaGroup.position.y = 1.4 + Math.sin(t * 1.05 + 0.8) * 0.06;
      megaGroup.rotation.x = -0.15 + Math.sin(t * 0.4) * 0.04;
      megaGroup.rotation.z = 0.25 + Math.cos(t * 0.5) * 0.04;
      megaGroup.rotation.y = -0.3 + Math.sin(t * 0.3) * 0.04;

      // Orbital rings rotation
      orbit1.rotation.x = t * 0.3;
      orbit1.rotation.y = t * 0.4;
      orbit2.rotation.y = -t * 0.25;
      orbit2.rotation.z = t * 0.35;

      // Spheres float
      glassSphere.position.y = 1.9 + Math.sin(t * 1.3) * 0.06;
      burgSphere.position.y = -1.1 + Math.sin(t * 1.1 + 2.0) * 0.05;
      latteSphere.position.y = -0.7 + Math.sin(t * 0.95 + 1.0) * 0.05;

      renderer.render(scene, camera);
    };

    animate();
    setIsReady(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);

      // Dispose geometries and materials
      renderer.dispose();
      laptopTexture.dispose();
      phoneTexture.dispose();
      shadowTex.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Editorial 3D Scene Annotation Pill */}
      <div className="absolute bottom-3 left-4 md:bottom-6 md:left-6 px-3.5 py-1.5 rounded-full bg-[#F5EBDD]/90 backdrop-blur-md border border-[#722F37]/20 flex items-center gap-2 pointer-events-none shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#722F37] animate-ping" />
        <span className="text-[11px] font-editorial-sans tracking-wider uppercase text-[#722F37] font-semibold">
          Interactive 3D Stage • Move Cursor To Tilt
        </span>
      </div>
    </div>
  );
}
