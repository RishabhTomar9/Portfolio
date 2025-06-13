import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import gsap from 'gsap';

const HeroEarthScene = () => {
  const mountRef = useRef(null);
  const scrollProgress = useRef(0);
  const opacityRef = useRef(1);

  useEffect(() => {
    const container = mountRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 2000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    new RGBELoader().load(
      'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/venice_sunset_1k.hdr',
      (hdrMap) => {
        const envMap = pmremGenerator.fromEquirectangular(hdrMap).texture;
        scene.environment = envMap;
        hdrMap.dispose();
      }
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 2, 3);
    scene.add(directionalLight);

    const loader = new THREE.TextureLoader();
    const earthMap = loader.load('/Textures/earthmap.jpg');
    const bumpMap = loader.load('/Textures/earthbump.jpg');
    const specularMap = loader.load('/Textures/earthspec.jpg');
    const cloudsMap = loader.load('/Textures/earthclouds.png');
    const moonTexture = loader.load('/Textures/moonmap.jpg');  // MOON texture

    const earthRadius = 2.5;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 128, 128);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthMap,
      bumpMap: bumpMap,
      bumpScale: 0.1,
      specularMap: specularMap,
      specular: new THREE.Color('grey'),
      shininess: 15,
      transparent: true,
      opacity: 1
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    const cloudGeometry = new THREE.SphereGeometry(earthRadius * 1.01, 128, 128);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudsMap,
      transparent: true,
      opacity: 0.4
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Moon with texture
    const moonGeometry = new THREE.SphereGeometry(0.3, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    let earthRotation = 0;
    let moonAngle = 0;
    let sceneRotation = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      gsap.to(camera.position, { z: 10 + scrollProgress.current * 0.02, duration: 0.8, ease: "power3.out" });

      sceneRotation += 0.0005;
      scene.rotation.y = sceneRotation;

      earthRotation += 0.001;
      earth.rotation.y = earthRotation;
      clouds.rotation.y = earthRotation * 1.05;

      moonAngle += 0.01;
      const moonDistance = 5.5;
      moon.position.set(
        Math.cos(moonAngle) * moonDistance,
        0,
        Math.sin(moonAngle) * moonDistance
      );

      renderer.domElement.style.opacity = opacityRef.current;
      renderer.render(scene, camera);
    };
    animate();

    const handleScroll = () => {
      scrollProgress.current = window.scrollY;
      if (scrollProgress.current > 500) {
        gsap.to(opacityRef, { current: 0, duration: 1, ease: "power2.out" });
      } else {
        gsap.to(opacityRef, { current: 1, duration: 1, ease: "power2.out" });
      }
    };
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
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
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.5s ease'
      }}
    />
  );
};

export default HeroEarthScene;
