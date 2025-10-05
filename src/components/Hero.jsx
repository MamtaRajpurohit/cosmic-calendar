import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Calendar, Sparkles, ChevronRight, Stars, Moon, Telescope, Menu, X, ArrowDown } from 'lucide-react';
import * as THREE from 'three';
import { gsap } from 'gsap';


const Hero = () => {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const factsRef = useRef(null);

  const heroFacts = [
    { icon: "🌌", text: "Observable universe contains 2 trillion galaxies" },
    { icon: "⚡", text: "Speed of light: 299,792 km/s" },
    { icon: "🪐", text: "Saturn could float in water due to its low density" },
    { icon: "🌟", text: "Stars twinkle because of Earth's atmosphere" }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, 400);
    camera.position.z = 5;

    
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 3000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    
    const torusGeometry = new THREE.TorusGeometry(2, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff, 
      wireframe: true 
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4169e1, 
      wireframe: true 
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 4;
    scene.add(sphere);


    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      stars.rotation.y += 0.0003;
      stars.rotation.x += 0.0001;
      
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.position.y = Math.sin(time) * 0.5;
      
      sphere.rotation.y += 0.01;
      sphere.position.y = Math.cos(time) * 0.3;
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 400);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    // GSAP Animations
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power3.out'
    });

    gsap.from(factsRef.current?.children || [], {
      opacity: 0,
      x: -50,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.5
    });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-20 pb-12">
      
      <div className="relative w-full h-[400px] mb-8 overflow-hidden rounded-3xl mx-6">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div ref={titleRef} className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
              EXPLORE
            </h2>
            <p className="text-2xl md:text-3xl text-cyan-400 font-light">The Infinite Universe</p>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-6">
        <div ref={factsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {heroFacts.map((fact, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="text-4xl mb-3">{fact.icon}</div>
              <p className="text-gray-200 text-sm leading-relaxed">{fact.text}</p>
            </div>
          ))}
        </div>

        
        <div className="flex justify-center mt-12">
          <button
            onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors animate-bounce"
          >
            <span className="text-sm font-medium">Discover More</span>
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;