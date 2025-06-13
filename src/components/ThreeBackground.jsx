import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const scrollOffsetRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    const scene = new THREE.Scene();

    // Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const starPositions = [];
    for (let i = 0; i < starCount; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 3000,
        (Math.random() - 0.5) * 3000,
        (Math.random() - 0.5) * 3000
      );
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 8000);
    camera.position.set(0, 600, 1600);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // HDRI reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    new RGBELoader().load(
      'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/venice_sunset_1k.hdr',
      (hdrMap) => {
        const envMap = pmremGenerator.fromEquirectangular(hdrMap).texture;
        scene.environment = envMap;
        hdrMap.dispose();
      }
    );

    // SUN
    const sunGeometry = new THREE.SphereGeometry(70, 128, 128);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc33 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    const sunLight = new THREE.PointLight(0xffffff, 3, 2500);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const lensFlare = new Lensflare();
    const flareTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/lensflare/lensflare0.png');
    lensFlare.addElement(new LensflareElement(flareTexture, 700, 0));
    sunLight.add(lensFlare);

    // Planet Configs with colors
    const planets = [
      { name: 'Mercury', size: 44, orbit: 320, speed: 0.04, color: 0xb1b1b1 },
      { name: 'Venus', size: 54, orbit: 420, speed: 0.035, color: 0xeccc9a },
      { name: 'Earth', size: 58, orbit: 500, speed: 0.03, color: 0x2a5fdf, moon: true },
      { name: 'Mars', size: 50, orbit: 600, speed: 0.025, color: 0xc1440e },
      { name: 'Jupiter', size: 124, orbit: 790, speed: 0.02, color: 0xd9b38c, moons: 4 },
      { name: 'Saturn', size: 106, orbit: 890, speed: 0.018, color: 0xf5deb3, ring: true },
      { name: 'Uranus', size: 74, orbit: 1090, speed: 0.012, color: 0xadd8e6 },
      { name: 'Neptune', size: 70, orbit: 1240, speed: 0.01, color: 0x4169e1 },
    ];

    const planetMeshes = [];

    planets.forEach(planet => {
      const geometry = new THREE.SphereGeometry(planet.size, 84, 84);
      const material = new THREE.MeshStandardMaterial({ color: planet.color });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      planetMeshes.push({ ...planet, mesh, angle: Math.random() * Math.PI * 2 });

      // Saturn Ring
      if (planet.ring) {
        const ringGeometry = new THREE.RingGeometry(planet.size + 10, planet.size + 40, 128);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }

      // Orbit Ring
      const orbitGeometry = new THREE.RingGeometry(planet.orbit - 1, planet.orbit + 1, 128);
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide
      });
      const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbitMesh.rotation.x = Math.PI / 2;
      scene.add(orbitMesh);
    });

    // Earth Moon
    const moonGeometry = new THREE.SphereGeometry(10, 32, 32);
    const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moonMesh);

    // Asteroid Belt
    const asteroidGeometry = new THREE.SphereGeometry(2, 8, 8);
    const asteroidMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    for (let i = 0; i < 1000; i++) {
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      const radius = THREE.MathUtils.randFloat(700, 750);
      const angle = Math.random() * Math.PI * 2;
      asteroid.position.set(Math.cos(angle) * radius, THREE.MathUtils.randFloat(-10, 10), Math.sin(angle) * radius);
      scene.add(asteroid);
    }

    scene.rotation.x = THREE.MathUtils.degToRad(30);

    let autoRotation = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      sun.rotation.y += 0.002;
      stars.rotation.y += 0.0002;
      autoRotation += 0.0005;
      scene.rotation.y = autoRotation;

      planetMeshes.forEach(planet => {
        planet.angle += planet.speed;
        planet.mesh.position.set(
          Math.cos(planet.angle) * planet.orbit,
          0,
          Math.sin(planet.angle) * planet.orbit
        );
        planet.mesh.rotation.y += 0.005 + scrollOffsetRef.current * 0.0005;

        // Earth Moon Orbit
        if (planet.name === 'Earth') {
          const moonAngle = planet.angle * 4;
          moonMesh.position.set(
            planet.mesh.position.x + Math.cos(moonAngle) * 80,
            0,
            planet.mesh.position.z + Math.sin(moonAngle) * 80
          );
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleScroll = () => {
      scrollOffsetRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
    }} />
  );
};

export default ThreeBackground;
