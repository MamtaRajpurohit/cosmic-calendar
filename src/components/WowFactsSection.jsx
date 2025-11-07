import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Rocket, FlaskConical } from "lucide-react";

const wowFacts = [
  {
    id: 1,
    question: "Which planet spins backwards and has days longer than years?",
    answer: "Venus rotates in the opposite direction to most planets, meaning the Sun rises in the west. Even more bizarre, one day on Venus (243 Earth days) is actually longer than one Venus year (225 Earth days)!"
  },
  {
    id: 2,
    question: "Is there really enough alcohol in space to keep everyone drunk?",
    answer: "Scientists discovered a massive cloud of alcohol in the constellation Aquila, containing enough ethyl alcohol to fill 400 trillion trillion pints of beer. It's floating 10,000 light-years away from Earth!"
  },
  {
    id: 3,
    question: "What if a sugar cube weighed as much as humanity?",
    answer: "A sugar-cube-sized amount of neutron star material would weigh about 1 billion tons on Earth. That's roughly the same weight as the entire human population compressed into something you could hold in your hand!"
  },
  {
    id: 4,
    question: "How much does a NASA spacesuit actually cost?",
    answer: "A single NASA spacesuit costs approximately $12 million to produce. About 70% of that cost goes into the backpack and control module, while the suit itself costs around $250,000. They're basically wearable spacecraft!"
  },
  {
    id: 5,
    question: "What does outer space actually smell like?",
    answer: "Astronauts report that space smells like seared steak, hot metal, and welding fumes. This distinctive odor comes from dying stars and is caused by polycyclic aromatic hydrocarbons, the same molecules that give grilled meat its aroma!"
  },
  {
    id: 6,
    question: "A supermassive black hole is racing through space. How fast?",
    answer: "Scientists discovered a rogue supermassive black hole hurtling through space at nearly 5 million kilometers per hour. It's been ejected from its galaxy and is creating a trail of newborn stars in its wake, stretching 200,000 light-years long!"
  },
  {
    id: 7,
    question: "How does the closest planet to the Sun have frozen water?",
    answer: "Despite surface temperatures reaching 430°C, Mercury has ice in permanently shadowed craters at its poles. These craters never see sunlight and maintain temperatures of -200°C, cold enough to preserve water ice for billions of years!"
  },
  {
    id: 8,
    question: "How tall is the largest volcano in our solar system?",
    answer: "Olympus Mons on Mars is the largest volcano in our solar system, standing 22 kilometers high. That's nearly three times the height of Mount Everest! It's so massive that if you stood on its summit, you couldn't see the edges due to the planet's curvature."
  },
  {
    id: 9,
    question: "Do astronauts on the ISS age slower than Earth people?",
    answer: "Due to time dilation from traveling at 28,000 km/h, astronauts on the International Space Station age slightly slower than Earth-bound humans. After 6 months in orbit, an astronaut will have aged about 0.007 seconds less than people on Earth!"
  },
  {
    id: 10,
    question: "Is our galaxy being pulled toward something mysterious?",
    answer: "The Milky Way and thousands of nearby galaxies are being pulled toward a mysterious region called the Great Attractor at 2 million km/h. Hidden behind the galactic plane, this gravitational anomaly contains the mass of tens of thousands of galaxies!"
  }
];

const scientistFacts = [
  {
    id: 1,
    country: "United Kingdom",
    hint: "A theoretical physicist who proved black holes emit radiation",
    name: "Stephen Hawking",
    details: "Stephen Hawking was a British theoretical physicist who revolutionized our understanding of black holes and cosmology. Despite being diagnosed with ALS at 21, he lived to 76 and made groundbreaking contributions to science. He proved that black holes emit radiation, now known as Hawking radiation, and authored 'A Brief History of Time', making complex physics accessible to millions worldwide."
  },
  {
    id: 2,
    country: "United States",
    hint: "An astronomer who made 'Cosmos' and inspired millions to explore space",
    name: "Carl Sagan",
    details: "Carl Sagan was an American astronomer, cosmologist, and one of the greatest science communicators in history. He played a key role in NASA's planetary exploration programs and designed the Pioneer plaque and Voyager Golden Record. His TV series 'Cosmos: A Personal Voyage' inspired millions to look up at the stars and wonder about our place in the universe."
  },
  {
    id: 3,
    country: "Poland/France",
    hint: "First woman to win a Nobel Prize, discovered radioactivity",
    name: "Marie Curie",
    details: "Marie Curie was a Polish-French physicist and chemist, the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different sciences. She discovered polonium and radium, pioneered research on radioactivity, and her work laid the foundation for modern nuclear physics. She worked tirelessly during World War I, developing mobile X-ray units to help wounded soldiers."
  },
  {
    id: 4,
    country: "United States",
    hint: "Astrophysicist and director of the Hayden Planetarium",
    name: "Neil deGrasse Tyson",
    details: "Neil deGrasse Tyson is an American astrophysicist and science communicator who serves as director of the Hayden Planetarium in New York. He has made complex astronomical concepts accessible to the public through his books, TV appearances, and the reboot of 'Cosmos'. His charismatic personality and passion for science have inspired a new generation to explore the universe."
  },
  {
    id: 5,
    country: "United States",
    hint: "Astronomer who provided evidence for dark matter existence",
    name: "Vera Rubin",
    details: "Vera Rubin was an American astronomer who provided groundbreaking evidence for the existence of dark matter in the universe. By studying galaxy rotation curves, she showed that galaxies must contain more mass than we can see with telescopes. Her work revolutionized our understanding of the cosmos and proved that visible matter is just a small fraction of the universe's total mass."
  },
  {
    id: 6,
    country: "United States",
    hint: "Proved galaxies exist beyond the Milky Way and universe is expanding",
    name: "Edwin Hubble",
    details: "Edwin Hubble was an American astronomer who transformed our understanding of the universe. He proved that galaxies exist beyond the Milky Way and discovered that the universe is expanding, leading to the Big Bang theory. Hubble's Law, which relates a galaxy's distance to its velocity, became fundamental to cosmology. The Hubble Space Telescope is named in his honor."
  },
  {
    id: 7,
    country: "India/United States",
    hint: "Calculated the limit determining if stars become white dwarfs or supernovas",
    name: "Subrahmanyan Chandrasekhar",
    details: "Subrahmanyan Chandrasekhar was an Indian-American astrophysicist who won the Nobel Prize in Physics for his work on stellar evolution. He calculated the Chandrasekhar Limit, which determines whether a dying star becomes a white dwarf or explodes as a supernova. His mathematical theories helped us understand how stars live and die, fundamentally shaping modern astrophysics."
  },
  {
    id: 8,
    country: "United States",
    hint: "NASA mathematician whose calculations sent Apollo 11 to the Moon",
    name: "Katherine Johnson",
    details: "Katherine Johnson was an American mathematician whose calculations were critical to NASA's space missions, including the Apollo 11 moon landing. Her precise trajectory calculations ensured astronaut safety and mission success. Despite facing racial and gender discrimination, she became one of NASA's most trusted mathematicians. Her inspiring story was portrayed in the film 'Hidden Figures'."
  },
  {
    id: 9,
    country: "Italy",
    hint: "Improved the telescope and championed the heliocentric solar system model",
    name: "Galileo Galilei",
    details: "Galileo Galilei is often called the father of modern science and observational astronomy. He improved the telescope and made groundbreaking astronomical observations, including discovering Jupiter's four largest moons and observing Saturn's rings. He championed the heliocentric model of the solar system, which put him in conflict with the Catholic Church. His scientific method emphasized observation and experimentation over ancient authority."
  },
  {
    id: 10,
    country: "United Kingdom",
    hint: "Discovered the first radio pulsars as a graduate student",
    name: "Jocelyn Bell Burnell",
    details: "Jocelyn Bell Burnell is a British astrophysicist from Northern Ireland who discovered the first radio pulsars as a graduate student in 1967. These rapidly rotating neutron stars helped confirm theories about stellar evolution and extreme physics. Though her male supervisors received the Nobel Prize for the discovery, she remained humble and continued groundbreaking work in astronomy, later receiving numerous prestigious honors for her contributions."
  }
];

export const WowFactsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState("space");

  const currentFacts = activeTab === "space" ? wowFacts : scientistFacts;

  const nextFact = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === currentFacts.length - 1 ? 0 : prevIndex + 1
    );
    setIsFlipped(false);
  };

  const prevFact = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? currentFacts.length - 1 : prevIndex - 1
    );
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <section id="wow-facts" className="py-24 px-4 relative bg-black">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          Wow <span className="text-blue-400">Facts</span>
        </h2>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => switchTab("space")}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeTab === "space"
                ? "bg-blue-500/30 text-blue-400 border border-blue-400/50"
                : "bg-gray-800/30 text-gray-400 border border-gray-700/50 hover:bg-gray-800/50"
            }`}
          >
            <Rocket size={20} />
            <span>Space Facts</span>
          </button>
          <button
            onClick={() => switchTab("scientists")}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeTab === "scientists"
                ? "bg-purple-500/30 text-purple-400 border border-purple-400/50"
                : "bg-gray-800/30 text-gray-400 border border-gray-700/50 hover:bg-gray-800/50"
            }`}
          >
            <FlaskConical size={20} />
            <span>Scientists</span>
          </button>
        </div>
        
        <div className="relative h-96">
          <div 
            className="relative w-full h-full cursor-pointer"
            onClick={flipCard}
          >
            {!isFlipped ? (
              <div className={`w-full h-full bg-gradient-to-br backdrop-blur-sm border rounded-xl p-8 flex flex-col items-center justify-center space-y-6 transition-colors duration-300 ${
                activeTab === "space"
                  ? "from-purple-900/40 via-blue-900/40 to-pink-900/40 border-blue-400/30 hover:border-blue-400/50"
                  : "from-indigo-900/40 via-purple-900/40 to-violet-900/40 border-purple-400/30 hover:border-purple-400/50"
              }`}>
                <div className="text-6xl mb-4">
                  {activeTab === "space" ? "❓" : "🌍"}
                </div>
                
                {activeTab === "space" ? (
                  <p className="text-2xl text-gray-200 text-center max-w-2xl font-medium">
                    {currentFacts[currentIndex].question}
                  </p>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-lg text-gray-400">
                      Country: {currentFacts[currentIndex].country}
                    </p>
                    <p className="text-2xl text-gray-200 max-w-2xl font-medium">
                      {currentFacts[currentIndex].hint}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-gray-400 animate-pulse mt-4">
                  <RotateCcw size={20} />
                  <span className="text-sm">
                    {activeTab === "space" ? "Click to reveal the answer" : "Click to reveal identity"}
                  </span>
                </div>
              </div>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br backdrop-blur-sm border rounded-xl p-8 flex flex-col items-center justify-center space-y-6 transition-colors duration-300 ${
                activeTab === "space"
                  ? "from-pink-900/40 via-purple-900/40 to-blue-900/40 border-purple-400/30 hover:border-purple-400/50"
                  : "from-violet-900/40 via-purple-900/40 to-indigo-900/40 border-indigo-400/30 hover:border-indigo-400/50"
              }`}>
                <div className="text-6xl mb-4">
                  {activeTab === "space" ? "💡" : "🔬"}
                </div>
                
                {activeTab === "space" ? (
                  <p className="text-lg text-gray-200 text-center max-w-2xl leading-relaxed">
                    {currentFacts[currentIndex].answer}
                  </p>
                ) : (
                  <div className="text-center space-y-4">
                    <h3 className="text-3xl font-bold text-indigo-400">
                      {currentFacts[currentIndex].name}
                    </h3>
                    <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
                      {currentFacts[currentIndex].details}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-gray-400 animate-pulse mt-4">
                  <RotateCcw size={20} />
                  <span className="text-sm">Click to flip back</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between max-w-xs mx-auto pt-8">
          <button 
            onClick={prevFact}
            className={`p-3 rounded-full transition-colors duration-300 border ${
              activeTab === "space"
                ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-400/30"
                : "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-400/30"
            }`}
            aria-label="Previous fact"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="text-sm text-gray-400">
            {currentIndex + 1} / {currentFacts.length}
          </div>
          
          <button 
            onClick={nextFact}
            className={`p-3 rounded-full transition-colors duration-300 border ${
              activeTab === "space"
                ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-400/30"
                : "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-400/30"
            }`}
            aria-label="Next fact"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};