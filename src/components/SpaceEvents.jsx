import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Calendar, Sparkles, ChevronRight, Stars, Moon, Telescope, Menu, X, ArrowDown } from 'lucide-react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const SpaceEvents = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [eventInfo, setEventInfo] = useState(null);
  const sectionRef = useRef(null);

  const spaceEvents = {
    '1969-07-20': {
      title: 'Apollo 11 Moon Landing',
      description: 'Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, marking one of humanity\'s greatest achievements.',
      icon: '🌕',
      significance: 'Giant leap for mankind',
      year: '1969'
    },
    '1990-04-24': {
      title: 'Hubble Space Telescope Launch',
      description: 'NASA launched the Hubble Space Telescope, revolutionizing our understanding of the universe with breathtaking images.',
      icon: '🔭',
      significance: 'Window to the cosmos',
      year: '1990'
    },
    '1961-04-12': {
      title: 'First Human in Space',
      description: 'Yuri Gagarin became the first human to journey into outer space, orbiting Earth in Vostok 1.',
      icon: '🚀',
      significance: 'Space age begins',
      year: '1961'
    },
    '2012-08-06': {
      title: 'Curiosity Rover Landing',
      description: 'NASA\'s Curiosity rover successfully landed on Mars to explore the red planet and search for signs of past life.',
      icon: '🔴',
      significance: 'Mars exploration milestone',
      year: '2012'
    },
    '1997-07-04': {
      title: 'Mars Pathfinder Landing',
      description: 'The Pathfinder mission landed on Mars with the Sojourner rover, the first wheeled vehicle on another planet.',
      icon: '🛸',
      significance: 'First rover on Mars',
      year: '1997'
    },
    '1977-09-05': {
      title: 'Voyager 1 Launch',
      description: 'Voyager 1 launched on its grand tour of the outer solar system, now the most distant human-made object.',
      icon: '🛰️',
      significance: 'Interstellar messenger',
      year: '1977'
    }
  };

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }
  }, []);

  const handleDateSubmit = () => {
    if (selectedDate && spaceEvents[selectedDate]) {
      setEventInfo(spaceEvents[selectedDate]);
    } else {
      setEventInfo({
        title: 'No Major Event Found',
        description: 'While this date may not have a famous space event in our database, every day contributes to humanity\'s journey through the cosmos!',
        icon: '🌌',
        significance: 'The journey continues',
        year: new Date(selectedDate).getFullYear().toString()
      });
    }
  };

  return (
    <section id="events" ref={sectionRef} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-10 h-10 text-cyan-400" />
            <h2 className="text-5xl font-bold text-white">Historic Space Events</h2>
          </div>
          <p className="text-gray-400 text-lg">Journey through the timeline of space exploration</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 px-6 py-4 bg-black/50 border border-cyan-500/50 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 text-lg"
            />
            <button
              onClick={handleDateSubmit}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {eventInfo && (
            <div className="bg-black/40 rounded-2xl p-8 border border-cyan-500/20 mb-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-7xl">{eventInfo.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
                      {eventInfo.year}
                    </span>
                    <Stars className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">{eventInfo.significance}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-cyan-300 mb-3">{eventInfo.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{eventInfo.description}</p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-cyan-500/20">
            <p className="text-sm text-gray-400 mb-4">Quick access to historic dates:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.keys(spaceEvents).map(date => (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setEventInfo(spaceEvents[date]);
                  }}
                  className="px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 rounded-lg text-sm transition-all duration-200 hover:scale-105"
                >
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceEvents;