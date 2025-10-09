import React, { useState, useEffect, useRef } from 'react';
import { Rocket, ArrowDown, Sparkles, Zap, Circle, Star, Satellite } from 'lucide-react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const factsContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const heroFacts = [
    { icon: Star, text: "Observable universe contains 2 trillion galaxies", color: "from-purple-400 to-pink-400" },
    { icon: Zap, text: "Speed of light: 299,792 km/s", color: "from-yellow-400 to-orange-400" },
    { icon: Circle, text: "Saturn could float in water due to its low density", color: "from-cyan-400 to-blue-400" },
    { icon: Sparkles, text: "Stars twinkle because of Earth's atmosphere", color: "from-pink-400 to-purple-400" }
  ];

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      duration: 1.2,
      ease: 'power4.out'
    });

    gsap.from(subtitleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from(factsContainerRef.current?.children || [], {
      scrollTrigger: {
        trigger: factsContainerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    updateSize();
    camera.position.z = 25;
    camera.position.y = 5;

    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    const starSizes = [];
    for (let i = 0; i < 8000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 1000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
      starSizes.push(Math.random() * 2 + 0.5);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));
    
    const starMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const twinkleStars = [];
    for (let i = 0; i < 100; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8);
      const material = new THREE.MeshBasicMaterial({ 
        color: Math.random() > 0.5 ? 0xffffff : 0xadd8e6,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.5
      });
      const star = new THREE.Mesh(geometry, material);
      star.position.set(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 200
      );
      twinkleStars.push({ mesh: star, baseOpacity: material.opacity, speed: Math.random() * 0.02 + 0.01 });
      scene.add(star);
    }

    const sunGeometry = new THREE.SphereGeometry(2.5, 64, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffd700,
      emissive: 0xffa500
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(-15, 8, -30);
    scene.add(sun);

    const sunGlowGeometry = new THREE.SphereGeometry(3, 64, 64);
    const sunGlowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffaa00,
      transparent: true,
      opacity: 0.3
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    sunGlow.position.copy(sun.position);
    scene.add(sunGlow);

    const planets = [];
    const planetData = [
      { size: 0.4, color: 0x8b7355, distance: 6, speed: 0.015 },
      { size: 0.6, color: 0xffa500, distance: 8, speed: 0.012 },
      { size: 0.65, color: 0x4169e1, distance: 10, speed: 0.01 },
      { size: 0.5, color: 0xff4500, distance: 12, speed: 0.008 },
      { size: 1.2, color: 0xdaa520, distance: 16, speed: 0.006 },
      { size: 1, color: 0xf4a460, distance: 20, speed: 0.005 }
    ];

    planetData.forEach((data, index) => {
      const planetGeometry = new THREE.SphereGeometry(data.size, 32, 32);
      const planetMaterial = new THREE.MeshBasicMaterial({ 
        color: data.color,
        transparent: true,
        opacity: 0.9
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      
      planets.push({ 
        mesh: planet, 
        distance: data.distance, 
        speed: data.speed,
        angle: (Math.PI * 2 * index) / planetData.length,
        centerX: sun.position.x,
        centerZ: sun.position.z,
        centerY: sun.position.y
      });
      scene.add(planet);
    });

    const rocketGeometry = new THREE.ConeGeometry(0.3, 1.5, 8);
    const rocketMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);
    rocket.position.set(20, 0, -10);
    rocket.rotation.z = Math.PI / 2;
    scene.add(rocket);

    const satelliteGroup = new THREE.Group();
    const bodyGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.3);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const satelliteBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    const panelGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.8);
    const panelMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1 });
    const panel1 = new THREE.Mesh(panelGeometry, panelMaterial);
    panel1.position.x = -0.5;
    const panel2 = new THREE.Mesh(panelGeometry, panelMaterial);
    panel2.position.x = 0.5;
    
    satelliteGroup.add(satelliteBody);
    satelliteGroup.add(panel1);
    satelliteGroup.add(panel2);
    satelliteGroup.position.set(-20, 5, -15);
    scene.add(satelliteGroup);

    const shootingStars = [];
    const createShootingStar = () => {
      const geometry = new THREE.SphereGeometry(0.1, 8, 8);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      
      star.position.set(
        (Math.random() - 0.5) * 100,
        Math.random() * 50 + 20,
        -100
      );
      
      const trailGeometry = new THREE.CylinderGeometry(0.02, 0.1, 2, 8);
      const trailMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.6
      });
      const trail = new THREE.Mesh(trailGeometry, trailMaterial);
      trail.rotation.z = Math.PI / 2;
      star.add(trail);
      
      shootingStars.push({
        mesh: star,
        velocity: { x: Math.random() * 2 + 1, y: -(Math.random() * 1 + 0.5), z: Math.random() * 2 + 1 },
        life: 100
      });
      scene.add(star);
    };

    setInterval(createShootingStar, 3000);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      stars.rotation.y += 0.0001;
      
      twinkleStars.forEach(star => {
        star.mesh.material.opacity = star.baseOpacity + Math.sin(time * star.speed) * 0.3;
      });

      sun.rotation.y += 0.005;
      sunGlow.rotation.y += 0.003;
      sunGlow.scale.set(
        1 + Math.sin(time * 2) * 0.08,
        1 + Math.sin(time * 2) * 0.08,
        1 + Math.sin(time * 2) * 0.08
      );

      planets.forEach(planet => {
        planet.angle += planet.speed;
        planet.mesh.position.x = planet.centerX + Math.cos(planet.angle) * planet.distance;
        planet.mesh.position.z = planet.centerZ + Math.sin(planet.angle) * planet.distance;
        planet.mesh.position.y = planet.centerY + Math.sin(planet.angle * 2) * 0.5;
        planet.mesh.rotation.y += 0.01;
      });

      rocket.position.x = 20 + Math.sin(time * 0.3) * 5;
      rocket.position.y = Math.cos(time * 0.5) * 3;
      rocket.rotation.z = Math.PI / 2 + Math.sin(time * 0.3) * 0.2;

      satelliteGroup.rotation.y += 0.01;
      satelliteGroup.position.y = 5 + Math.sin(time * 0.4) * 2;

      shootingStars.forEach((star, index) => {
        star.mesh.position.x += star.velocity.x;
        star.mesh.position.y += star.velocity.y;
        star.mesh.position.z += star.velocity.z;
        star.life--;

        if (star.life <= 0 || star.mesh.position.y < -50) {
          scene.remove(star.mesh);
          shootingStars.splice(index, 1);
        }
      });
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      updateSize();
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      camera.position.y = 5 - scrollY * 0.01;
      camera.rotation.x = scrollY * 0.0001;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/30 to-slate-950/90"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <div ref={titleRef} className="mb-6">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-extralight tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 leading-none">
              COSMOS
            </h1>
          </div>
          
          <div ref={subtitleRef} className="space-y-4">
            <p className="text-3xl md:text-5xl font-light text-slate-200">
              Journey Beyond the Stars
            </p>
            <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
            <p className="text-slate-400 text-lg font-light max-w-3xl mx-auto leading-relaxed mt-6">
              Discover the mysteries of our solar system and the infinite wonders that await in the vast expanse of space
            </p>
          </div>
        </div>

        <div ref={factsContainerRef} className="max-w-5xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heroFacts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <div 
                  key={index}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                  ></div>
                  
                  <div className="relative bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 group-hover:border-cyan-400/50 transition-all duration-500 h-full">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${fact.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-slate-300 text-base leading-relaxed flex-1 pt-2">{fact.text}</p>
                    </div>
                    
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div ref={scrollIndicatorRef} className="flex justify-center">
          <button
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex flex-col items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-all duration-300"
          >
            <span className="text-sm font-light tracking-widest uppercase">Explore Further</span>
            <div className="relative">
              <ArrowDown className="w-6 h-6" />
              <div className="absolute inset-0 blur-lg bg-cyan-400/50 group-hover:bg-cyan-400/80 transition-all duration-300"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;