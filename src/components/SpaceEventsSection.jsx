import { useState } from "react";
import { Calendar, Sparkles, Search } from "lucide-react";

const spaceEvents = {
  "01-01": {
    year: "1801",
    title: "Discovery of Ceres",
    description: "Italian astronomer Giuseppe Piazzi discovered Ceres, the first and largest object in the asteroid belt between Mars and Jupiter. Initially classified as a planet, it was later reclassified as an asteroid and then as a dwarf planet in 2006."
  },
  "01-02": {
    year: "1959",
    title: "Luna 1 Launch",
    description: "The Soviet Union launched Luna 1, the first spacecraft to reach the vicinity of the Moon and the first to be placed in heliocentric orbit. It was a major milestone in space exploration, passing within 6,000 km of the Moon's surface."
  },
  "01-28": {
    year: "1986",
    title: "Challenger Disaster",
    description: "Space Shuttle Challenger broke apart 73 seconds into its flight, leading to the deaths of all seven crew members. This tragedy led to a 32-month hiatus in the Space Shuttle program and major changes in NASA's safety protocols."
  },
  "02-14": {
    year: "1990",
    title: "Pale Blue Dot Photo",
    description: "Voyager 1 spacecraft took the famous 'Pale Blue Dot' photograph of Earth from a record distance of about 6 billion kilometers. This iconic image, suggested by Carl Sagan, shows Earth as a tiny speck in the vastness of space."
  },
  "02-18": {
    year: "1930",
    title: "Discovery of Pluto",
    description: "American astronomer Clyde Tombaugh discovered Pluto at the Lowell Observatory in Arizona. It was considered the ninth planet until 2006 when it was reclassified as a dwarf planet, sparking debates about planetary classification."
  },
  "03-18": {
    year: "1965",
    title: "First Spacewalk",
    description: "Soviet cosmonaut Alexei Leonov performed the first spacewalk (extravehicular activity) in history, spending 12 minutes outside the Voskhod 2 spacecraft. This dangerous feat nearly ended in disaster when his spacesuit inflated in the vacuum of space."
  },
  "04-12": {
    year: "1961",
    title: "First Human in Space",
    description: "Soviet cosmonaut Yuri Gagarin became the first human to journey into outer space, completing one orbit of Earth aboard Vostok 1. His historic 108-minute flight opened a new era in space exploration and made him an international hero."
  },
  "04-24": {
    year: "1990",
    title: "Hubble Space Telescope Launch",
    description: "NASA launched the Hubble Space Telescope aboard Space Shuttle Discovery. Despite initial optical problems, Hubble has become one of the most important instruments in astronomical history, providing breathtaking images and revolutionary discoveries."
  },
  "05-05": {
    year: "1961",
    title: "First American in Space",
    description: "Alan Shepard became the first American in space aboard Freedom 7, completing a 15-minute suborbital flight. Though shorter than Gagarin's orbit, it was a crucial milestone in America's race to catch up with Soviet space achievements."
  },
  "06-16": {
    year: "1963",
    title: "First Woman in Space",
    description: "Soviet cosmonaut Valentina Tereshkova became the first woman in space, orbiting Earth 48 times aboard Vostok 6. She remains the only woman to have flown a solo space mission and spent nearly three days in space."
  },
  "07-04": {
    year: "1997",
    title: "Mars Pathfinder Landing",
    description: "NASA's Mars Pathfinder successfully landed on Mars, deploying the Sojourner rover, the first wheeled vehicle to explore another planet. It sent back thousands of images and conducted numerous scientific experiments on Martian soil and rocks."
  },
  "07-20": {
    year: "1969",
    title: "Moon Landing",
    description: "Apollo 11 astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon while Michael Collins orbited above. Armstrong's famous words 'That's one small step for man, one giant leap for mankind' marked humanity's greatest space achievement."
  },
  "08-20": {
    year: "1977",
    title: "Voyager 2 Launch",
    description: "NASA launched Voyager 2, which would become the only spacecraft to visit all four gas giant planets: Jupiter, Saturn, Uranus, and Neptune. It continues to send data from interstellar space, providing insights into the outer reaches of our solar system."
  },
  "09-12": {
    year: "1959",
    title: "Luna 2 Moon Impact",
    description: "The Soviet Luna 2 became the first human-made object to reach the Moon when it crash-landed on the lunar surface. This achievement proved that spacecraft could reach celestial bodies and paved the way for future Moon missions."
  },
  "10-04": {
    year: "1957",
    title: "Sputnik 1 Launch",
    description: "The Soviet Union launched Sputnik 1, the first artificial satellite to orbit Earth. This beach-ball-sized satellite triggered the Space Race between the USSR and USA, fundamentally changing science, technology, and geopolitics for decades to come."
  },
  "11-03": {
    year: "1957",
    title: "Laika in Space",
    description: "Soviet space dog Laika became the first animal to orbit Earth aboard Sputnik 2. Though the mission was one-way and Laika did not survive, it provided crucial data about the effects of spaceflight on living organisms."
  },
  "12-21": {
    year: "1968",
    title: "Apollo 8 Moon Orbit",
    description: "Apollo 8 became the first crewed spacecraft to orbit the Moon, with astronauts Frank Borman, James Lovell, and William Anders. They took the famous 'Earthrise' photograph and conducted the first live TV broadcast from lunar orbit on Christmas Eve."
  },
  "12-24": {
    year: "1968",
    title: "Earthrise Photo",
    description: "Apollo 8 astronaut William Anders captured the iconic 'Earthrise' photograph showing Earth rising above the Moon's horizon. This image became one of the most influential environmental photographs ever taken, highlighting Earth's fragility and beauty."
  }
};

export const SpaceEventsSection = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [event, setEvent] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setShowResult(false);
    setEvent(null);
  };

  const searchEvent = () => {
    if (!selectedDate) return;

    const [year, month, day] = selectedDate.split("-");
    const dateKey = `${month}-${day}`;
    
    const foundEvent = spaceEvents[dateKey];
    
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      setEvent(null);
    }
    
    setShowResult(true);
  };

  return (
    <section id="space-events" className="py-24 px-4 relative bg-black">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          Space <span className="text-blue-400">History</span>
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Discover historic space events that happened on any day
        </p>

        <div className="bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30 backdrop-blur-sm border border-blue-400/30 rounded-xl p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <Calendar size={32} />
              <h3 className="text-2xl font-semibold">Pick a Date</h3>
            </div>

            <div className="w-full max-w-md space-y-4">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-blue-400/30 text-white focus:outline-none focus:border-blue-400 transition-colors"
              />

              <button
                onClick={searchEvent}
                disabled={!selectedDate}
                className="w-full px-6 py-3 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-400/50 hover:border-blue-400/70 transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search size={20} />
                <span>Search Space Event</span>
              </button>
            </div>

            {showResult && (
              <div className="w-full mt-8 animate-fade-in">
                {event ? (
                  <div className="bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-blue-900/40 border border-purple-400/30 rounded-lg p-6 space-y-4">
                    <div className="flex items-center gap-2 text-purple-400">
                      <Sparkles size={24} />
                      <span className="text-sm font-semibold">HISTORIC EVENT FOUND</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <h4 className="text-2xl font-bold text-purple-300">{event.title}</h4>
                        <span className="text-sm text-gray-400">({event.year})</span>
                      </div>
                      
                      <p className="text-gray-200 leading-relaxed text-lg">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 border border-gray-600/30 rounded-lg p-6 text-center">
                    <p className="text-gray-400 text-lg">
                      No major space event recorded for this date. Try another date to discover historic space moments!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};