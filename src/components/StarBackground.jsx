import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    generateStars();
    generateMeteors();
    generatePlanets();

    const handleResize = () => {
      generateStars();
      generatePlanets();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 6000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      const starType = Math.random();
      newStars.push({
        id: i,
        size: Math.random() * 2.5 + 0.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.7 + 0.3,
        animationDuration: Math.random() * 3 + 2,
        color: starType > 0.7 ? 'bg-blue-300' : starType > 0.4 ? 'bg-white' : 'bg-purple-200',
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 20;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      const meteorColor = Math.random();
      newMeteors.push({
        id: i,
        size: Math.random() * 1.8 + 0.8,
        x: Math.random() * 100,
        y: -10 - Math.random() * 40,
        delay: Math.random() * 20,
        animationDuration: Math.random() * 2.5 + 1.5,
        gradient: meteorColor > 0.6 
          ? 'from-cyan-300 via-blue-400 to-transparent' 
          : meteorColor > 0.3 
          ? 'from-white via-purple-300 to-transparent' 
          : 'from-pink-300 via-blue-300 to-transparent',
      });
    }

    setMeteors(newMeteors);
  };

  const generatePlanets = () => {
    const numberOfPlanets = 3;
    const newPlanets = [];

    for (let i = 0; i < numberOfPlanets; i++) {
      newPlanets.push({
        id: i,
        size: Math.random() * 60 + 40,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.15 + 0.05,
        gradient: i === 0 
          ? 'from-purple-500 to-pink-500' 
          : i === 1 
          ? 'from-blue-500 to-cyan-500' 
          : 'from-orange-500 to-red-500',
        animationDuration: Math.random() * 20 + 30,
      });
    }

    setPlanets(newPlanets);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-black z-0">
      {planets.map((planet) => (
        <div
          key={`planet-${planet.id}`}
          className={`absolute rounded-full bg-gradient-to-br ${planet.gradient} blur-3xl animate-float`}
          style={{
            width: planet.size + "px",
            height: planet.size + "px",
            left: planet.x + "%",
            top: planet.y + "%",
            opacity: planet.opacity,
            animationDuration: planet.animationDuration + "s",
          }}
        />
      ))}

      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className={`absolute rounded-full ${star.color} animate-pulse-subtle shadow-lg`}
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={`meteor-${meteor.id}`}
          className={`absolute bg-gradient-to-r ${meteor.gradient} rounded-full animate-meteor opacity-0 blur-sm`}
          style={{
            width: meteor.size * 70 + "px",
            height: meteor.size * 2.5 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
            transform: "rotate(-45deg)",
            boxShadow: `0 0 ${meteor.size * 8}px rgba(147, 197, 253, 0.6)`,
          }}
        />
      ))}
    </div>
  );
};